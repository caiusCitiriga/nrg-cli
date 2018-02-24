import * as fs from 'fs';
import * as path from 'path';

import { SmartCLI } from "smart-cli/dist";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { CORE_COMMANDS } from "../../consts/core-commands.const";
import { AvailableItemTypes } from "../../enums/available-item-types.enum";

import { CommandFlag } from "../../interfaces/command-flag.interface";
import { CommandRunner } from "../../interfaces/command-runner.interface";
import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
import { ItemToGenerateOptions } from "../../interfaces/item-to-generate-options.interface";

import { UI } from "../ui.core";
import { DEFAULTS } from '../../config/defaults.conf';
import { CLIConfiguration } from '../../interfaces/cli-conf.interface';

//  Since is generated getting inputs from user, the reference to "GenerateCommand" gets lost.
//  Needs to be therefore static inside
export class GenerateCommand implements CommandRunner {
    private static pathDelimiter: string;
    private static currentFlags: CommandFlag;
    private static itemToGenerate: ItemToGenerateOptions;

    public constructor() {
        GenerateCommand.pathDelimiter = '/';
        GenerateCommand.itemToGenerate = {
            type: null as any,
            filename: '',
            extension: '',
            className: '',
            relativePathFromSrc: ''
        };
    }

    public run(dispatcherOptions: DispatcherOptions[], flags: CommandFlag[]): void {
        if (!GenerateCommand.ensureIsEnergyProject()) {
            UI.error('Your are not inside an Energy project. Cannot run this command here.');
            return;
        }

        switch (flags[0].flag.split(':')[0]) {
            case CORE_COMMANDS.generate.flags.item.value:
                GenerateCommand.currentFlags = flags[0];
                GenerateCommand.generateItem();
                break;
        }
    }

    //  Input getters
    private static getItemTypeFromUser(data: string) {
        //  If is typed as string
        if (isNaN(parseInt(data)) && !!(AvailableItemTypes as any)[data]) {
            GenerateCommand.itemToGenerate.type = (AvailableItemTypes as any)[data];
        } else {
            if (!(AvailableItemTypes as any)[data]) {
                UI.throw('The given type is invalid', GenerateCommand.generateItem);
                return;
            }
            GenerateCommand.itemToGenerate.type = data as any;
        }

        GenerateCommand.askForItemFilename();
    }

    private static getItemFilenameFromUser(data: string): void {
        if (!data) {
            UI.throw(`The given filename: "${data}" is not valid`, GenerateCommand.askForItemFilename);
            return;
        }

        GenerateCommand.extractRelativePathFromItemSourceFolder(data);
        GenerateCommand.extractFilenameAndExtension(data);
    };

    private static getItemExtensionFromUser(data: string): void {
        if (!data) {
            SmartCLI.GenericOutput.printWarning('Invalid extension name');
            GenerateCommand.askForItemExtension();
        }

        GenerateCommand.itemToGenerate.extension = data;
        UI.success('Extension successfully set');
        GenerateCommand.startFileGenerationForThisItem();
    }


    //  Internals
    private static ensureIsEnergyProject(): boolean {
        const dir = fs.readdirSync('.');
        if (!dir.find(file => file === DEFAULTS.cliConfigurationFilename)) {
            return false;
        }

        return true;
    }

    private static generateItem(): void {
        GenerateCommand.printAvailableTypesList();
        UI.askUserInput('> ', GenerateCommand.getItemTypeFromUser);
    }

    private static printAvailableTypesList(): void {
        const kvp: { key: string, value: string }[] = [];
        const dirtyTypes = Object.keys(AvailableItemTypes);
        const cleanTypes: string[] = [];

        dirtyTypes.forEach(t => isNaN(parseInt(t)) ? cleanTypes.push(t) : null);

        cleanTypes.forEach((type: string, idx) => {
            kvp.push({ key: type, value: (idx + 1).toString() });
        });

        console.log();
        SmartCLI.GenericOutput.printTitle('New item generation');
        SmartCLI.GenericOutput.printKeyValue(kvp);
        UI.print('Type the name, or the corresponding number to generate the item');
    }

    private static extractRelativePathFromItemSourceFolder(data: string): boolean {
        const explodedFilenameByPathDelimiter = data.split(GenerateCommand.pathDelimiter);
        explodedFilenameByPathDelimiter.pop();
        if (!explodedFilenameByPathDelimiter.length) { return false; }

        explodedFilenameByPathDelimiter.forEach((folder, index) => {
            GenerateCommand.itemToGenerate.relativePathFromSrc += folder + GenerateCommand.pathDelimiter;
        });

        return true;
    }

    private static extractFilenameAndExtension(data: string): void {
        const explodedFilenameByPathDelimiter = data.split(GenerateCommand.pathDelimiter);
        GenerateCommand.itemToGenerate.filename = explodedFilenameByPathDelimiter[explodedFilenameByPathDelimiter.length - 1];

        const explodedFileByDash = GenerateCommand.itemToGenerate.filename.split('-');
        let className = '';
        explodedFileByDash.forEach(part => {
            //  If it contains a dot, it may be the extension, or a specific typename. Skip it
            if (part.indexOf('.') != -1 && part.split('.').length === 1) { return; }
            //  If instead, it has a "composite custom dot notation" parse it skipping the last one.
            if (part.indexOf('.') != -1 && part.split('.').length >= 3) {
                className += GenerateCommand.extractMultipleUserCustomExtensions(part);
                return;
            }
            //  If none of the statements before where true, it means that the file is like "item.ext"
            className += (part.charAt(0).toUpperCase()) + (part.slice(1).toLowerCase());
        });


        //  Try to extract the extension. Throw if can't
        const explodedFileByDot = GenerateCommand.itemToGenerate.filename.split('.')
        if (explodedFileByDot.length === 1) {
            this.askForItemExtension();
            return;
        };

        let fileExtension = explodedFileByDot[explodedFileByDot.length - 1];
        GenerateCommand.startFileGenerationForThisItem();
    }

    private static extractMultipleUserCustomExtensions(part: string): string {
        let customPart = '';
        const explodedPart = part.split('.');
        explodedPart.pop();

        if (explodedPart.length === 0) {
            throw new Error('Something went wrong in extractMultipleUsersCustomExtension. The part arrived, has only one element in it');
        }

        explodedPart.forEach(p => customPart += (p.charAt(0).toUpperCase()) + (p.slice(1).toLowerCase()));
        return customPart;
    }

    private static startFileGenerationForThisItem(): Observable<boolean> {
        const jobDone: BehaviorSubject<boolean> = new BehaviorSubject(false);
        try {
            let previousFoldersStack = GenerateCommand.getCLIConf().sourceFolder + path.sep;
            const explodedPathToCheck = GenerateCommand
                .itemToGenerate
                .relativePathFromSrc
                .split(GenerateCommand.pathDelimiter);

            //  Remove the last "" element
            explodedPathToCheck.pop();
            explodedPathToCheck
                .forEach((folder: string) => {
                    previousFoldersStack += folder + path.sep;
                    if (!fs.existsSync(previousFoldersStack)) {
                        fs.mkdirSync(previousFoldersStack);
                        if (!fs.readdirSync(previousFoldersStack)) {
                            throw new Error(`The folder ${folder} wasn't created. Aborting`);
                        }

                        UI.success(`Folder ${folder} created`);
                    }
                });
            if (GenerateCommand.itemToGenerate.type === AvailableItemTypes.custom) {

            } else {
                const filename = `${previousFoldersStack + GenerateCommand.itemToGenerate.filename}.${AvailableItemTypes[GenerateCommand.itemToGenerate.type]}.${GenerateCommand.itemToGenerate.extension}`;

                fs.writeFile(filename, null, (err: Error) => {
                    if (err) {
                        throw new Error(`Error creating the item: ${err.message}`);
                    }

                    UI.success(`File ${GenerateCommand.itemToGenerate.filename}.${GenerateCommand.itemToGenerate.extension} generated`);
                });
            }
        } catch (e) {
            const error = e as Error;
            if (error.message === 'Invalid CLI configuration') {
                UI.warn('Your CLI configuration appears to be corrupted.');
            }
        }

        return jobDone.asObservable();
    }

    private static getCLIConf(): CLIConfiguration {
        const conf: CLIConfiguration = JSON.parse(fs.readFileSync(process.cwd() + path.sep + DEFAULTS.cliConfigurationFilename).toString()) as CLIConfiguration;
        if (!conf) {
            throw new Error('Invalid CLI configuration');
        }

        return conf;
    }

    //  Askers
    private static askForItemFilename(): void {
        UI.print(`Type the filename for the new ${AvailableItemTypes[GenerateCommand.itemToGenerate.type]}`, true);
        UI.askUserInput('> ', GenerateCommand.getItemFilenameFromUser);
    }

    private static askForItemExtension(): void {
        UI.print(`Type the filename extension`, true);
        UI.askUserInput('> ', GenerateCommand.getItemExtensionFromUser);
    }
}