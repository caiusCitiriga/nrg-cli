"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Subject_1 = require("rxjs/Subject");
const dist_1 = require("smart-cli/dist");
const ui_core_1 = require("../ui.core");
const defaults_conf_1 = require("../../config/defaults.conf");
const core_commands_const_1 = require("../../consts/core-commands.const");
const available_item_types_enum_1 = require("../../enums/available-item-types.enum");
//  Since is generated getting inputs from user, the reference to "GenerateCommand" gets lost.
//  Needs to be therefore static inside
class GenerateCommand {
    constructor() {
        GenerateCommand.pathDelimiter = '/';
        GenerateCommand.itemToGenerate = {
            type: null,
            filename: '',
            className: '',
            extension: '',
            relativePathFromSrc: ''
        };
    }
    run(dispatcherOptions, flags) {
        GenerateCommand.resetItemToGenerate();
        if (!GenerateCommand.ensureIsEnergyProject()) {
            ui_core_1.UI.error('Your are not inside an Energy project. Cannot run this command here.');
            return;
        }
        //  Take the part before any -flag:options. The flag itself
        switch (flags[0] ? flags[0].flag.split(':')[0] : null) {
            case core_commands_const_1.CORE_COMMANDS.generate.flags.dto.value:
                const opts = flags[0].flag.split(':');
                opts.shift();
                const filenameAndPath = opts.join().split(',')[0];
                const extension = opts.join().split(',')[1];
                dist_1.SmartCLI.GenericOutput.printKeyValue([
                    { key: 'filename', value: filenameAndPath },
                    { key: 'extension', value: extension },
                ]);
                GenerateCommand.itemToGenerate.extension = extension;
                GenerateCommand.itemToGenerate.type = available_item_types_enum_1.AvailableItemTypes.dto;
                GenerateCommand.itemToGenerate.filename = GenerateCommand.extractFilename(filenameAndPath);
                GenerateCommand.itemToGenerate.className = GenerateCommand.extractClassname(`${GenerateCommand.itemToGenerate.filename}.${extension}`, true);
                GenerateCommand.itemToGenerate.relativePathFromSrc = GenerateCommand.extractRelativePathFromItemSourceFolder(filenameAndPath);
                dist_1.SmartCLI.GenericOutput.printMessage(JSON.stringify(GenerateCommand.itemToGenerate));
                return;
            case core_commands_const_1.CORE_COMMANDS.generate.flags.core.value:
            // throw new Error('Shorhand for CORE not yet implemented');
            case core_commands_const_1.CORE_COMMANDS.generate.flags.enum.value:
            // throw new Error('Shorhand for ENUM not yet implemented');
            case core_commands_const_1.CORE_COMMANDS.generate.flags.const.value:
            // throw new Error('Shorhand for CONST not yet implemented');
            case core_commands_const_1.CORE_COMMANDS.generate.flags.entity.value:
            // throw new Error('Shorhand for ENTITY not yet implemented');
            case core_commands_const_1.CORE_COMMANDS.generate.flags.service.value:
            // throw new Error('Shorhand for SERVICE not yet implemented');
            case core_commands_const_1.CORE_COMMANDS.generate.flags.interface.value:
            // throw new Error('Shorhand for INTERFACE not yet implemented');
            default:
                GenerateCommand.currentFlags = flags[0];
                GenerateCommand.generateItem();
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////
    //  Internals
    ////////////////////////////////////////////////////////////////////////////////////
    static resetItemToGenerate() {
        GenerateCommand.itemToGenerate.className = '';
        GenerateCommand.itemToGenerate.extension = '';
        GenerateCommand.itemToGenerate.filename = '';
        GenerateCommand.itemToGenerate.relativePathFromSrc = '';
        GenerateCommand.itemToGenerate.type = null;
    }
    static ensureIsEnergyProject() {
        const dir = fs.readdirSync('.');
        if (!dir.find(file => file === defaults_conf_1.DEFAULTS.cliConfigurationFilename)) {
            return false;
        }
        return true;
    }
    static generateItem() {
        GenerateCommand.printAvailableTypesList();
        ui_core_1.UI.askUserInput('> ', GenerateCommand.getItemTypeFromUser);
    }
    static printAvailableTypesList() {
        const kvp = [];
        const dirtyTypes = Object.keys(available_item_types_enum_1.AvailableItemTypes);
        const cleanTypes = [];
        dirtyTypes.forEach(t => isNaN(parseInt(t)) ? cleanTypes.push(t) : null);
        cleanTypes.forEach((type, idx) => {
            kvp.push({ key: type, value: (idx + 1).toString() });
        });
        console.log();
        dist_1.SmartCLI.GenericOutput.printTitle('New item generation');
        dist_1.SmartCLI.GenericOutput.printKeyValue(kvp);
        ui_core_1.UI.print('Type the name, or the corresponding number to generate the item');
    }
    static extractRelativePathFromItemSourceFolder(data) {
        const explodedFilenameByPathDelimiter = data.split(GenerateCommand.pathDelimiter);
        explodedFilenameByPathDelimiter.pop();
        if (!explodedFilenameByPathDelimiter.length) {
            return '';
        }
        let path = '';
        explodedFilenameByPathDelimiter.forEach((folder, index) => {
            path += folder + GenerateCommand.pathDelimiter;
        });
        return path;
    }
    static extractFilename(data) {
        const explodedFilenameByPathDelimiter = data.split(GenerateCommand.pathDelimiter);
        return explodedFilenameByPathDelimiter[explodedFilenameByPathDelimiter.length - 1];
    }
    static extractClassname(data, isShorhandMode = false) {
        const explodedFileByDash = GenerateCommand.itemToGenerate.filename.split('-');
        let className = '';
        explodedFileByDash.forEach(part => {
            //  If it contains a dot, it may be the extension, or a specific typename. Skip it
            if (part.indexOf('.') != -1 && part.split('.').length === 1) {
                return;
            }
            //  If instead, it has a "composite custom dot notation" parse it skipping the last one.
            if (part.indexOf('.') != -1 && part.split('.').length >= 3) {
                className += GenerateCommand.extractMultipleUserCustomExtensions(part, isShorhandMode);
                return;
            }
            //  If none of the statements before where true, it means that the file is like "item.ext"
            className += (part.charAt(0).toUpperCase()) + (part.slice(1).toLowerCase()).split('.')[0];
        });
        return className;
    }
    static extractExtension(data) {
        //  Try to extract the extension. Throw if can't
        const explodedFileByDot = GenerateCommand.itemToGenerate.filename.split('.');
        if (explodedFileByDot.length === 1) {
            return false;
        }
        ;
        return explodedFileByDot[explodedFileByDot.length - 1];
    }
    static extractMultipleUserCustomExtensions(part, isShorthand = false) {
        let customPart = '';
        const explodedPart = part.split('.');
        !isShorthand ? explodedPart.pop() : null;
        if (explodedPart.length === 0) {
            throw new Error('Something went wrong in extractMultipleUsersCustomExtension. The part arrived, has only one element in it');
        }
        explodedPart.forEach(p => customPart += (p.charAt(0).toUpperCase()) + (p.slice(1).toLowerCase()));
        return customPart;
    }
    static startFileGenerationForThisItem() {
        const jobDone = new Subject_1.Subject();
        try {
            const foldersStack = GenerateCommand.composeFoldersStack();
            if (GenerateCommand.itemToGenerate.type === available_item_types_enum_1.AvailableItemTypes.custom) {
                const err = new Error();
                err.message = 'The custom types are not handled yet.';
                err.name = 'Method not implemented exception';
                throw err;
            }
            else {
                const filename = GenerateCommand.generateFilename(foldersStack);
                fs.writeFile(filename, null, (err) => {
                    if (err) {
                        throw new Error(`Error creating the item: ${err.message}`);
                    }
                    ui_core_1.UI.success(`File ${filename} generated`);
                    jobDone.next(true);
                });
            }
        }
        catch (e) {
            const error = e;
            if (error.message === 'Invalid CLI configuration') {
                ui_core_1.UI.warn('Your CLI configuration appears to be corrupted.');
            }
            if (error.name === 'Method not implemented exception') {
                ui_core_1.UI.warn('This feature is not available yet. Sorry.');
            }
            jobDone.next(false);
        }
        return jobDone.asObservable();
    }
    static composeFoldersStack() {
        let foldersStack = GenerateCommand.getCLIConf().sourceFolder + path.sep + `${available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]}s` + path.sep;
        if (!fs.existsSync(foldersStack)) {
            fs.mkdirSync(foldersStack); // if the item-type folder doesn't exists, create it
        }
        const explodedPathToCheck = GenerateCommand
            .itemToGenerate
            .relativePathFromSrc
            .split(GenerateCommand.pathDelimiter);
        //  Remove the last "" element
        explodedPathToCheck.pop();
        explodedPathToCheck
            .forEach((folder) => {
            foldersStack += folder + path.sep;
            if (!fs.existsSync(foldersStack)) {
                fs.mkdirSync(foldersStack);
                if (!fs.readdirSync(foldersStack)) {
                    throw new Error(`The folder ${folder} wasn't created. Aborting`);
                }
                ui_core_1.UI.success(`Folder ${folder} created`);
            }
        });
        return foldersStack;
    }
    static generateFilename(previousFoldersStack) {
        let filename = '';
        // If the item-type is already included in the filename by the user, and the extension is present, add only the extension
        if (GenerateCommand.itemToGenerate.filename.indexOf(available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]) !== -1 && !!GenerateCommand.itemToGenerate.extension.length) {
            filename = `${previousFoldersStack + GenerateCommand.itemToGenerate.filename}.${GenerateCommand.itemToGenerate.extension}`;
        }
        //  If the item-type is NOT included, and the user has provided an extension
        if (GenerateCommand.itemToGenerate.filename.indexOf(available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]) === -1 && !!GenerateCommand.itemToGenerate.extension.length) {
            filename = `${previousFoldersStack + GenerateCommand.itemToGenerate.filename}.${available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]}.${GenerateCommand.itemToGenerate.extension}`;
        }
        //  If the item-type is included, and the extension is not provided, suppose that is included in the filename after the item-type dot notation
        if (GenerateCommand.itemToGenerate.filename.indexOf(available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]) !== -1 && !GenerateCommand.itemToGenerate.extension.length) {
            filename = `${previousFoldersStack + GenerateCommand.itemToGenerate.filename}`;
        }
        //  If the item-type is NOT included, and the extension is implicitly included in the filename
        if (GenerateCommand.itemToGenerate.filename.indexOf(available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]) === -1 && !GenerateCommand.itemToGenerate.extension.length) {
            const extPosition = GenerateCommand.itemToGenerate.filename.lastIndexOf('.');
            filename = [
                previousFoldersStack,
                GenerateCommand.itemToGenerate.filename.slice(0, extPosition),
                '.',
                available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type],
                GenerateCommand.itemToGenerate.filename.slice(extPosition)
            ].join('');
        }
        return filename;
    }
    static getCLIConf() {
        try {
            const conf = JSON.parse(fs.readFileSync(process.cwd() + path.sep + defaults_conf_1.DEFAULTS.cliConfigurationFilename).toString());
            return conf;
        }
        catch (e) {
            throw new Error('Invalid CLI configuration');
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////
    //  Input getters
    ////////////////////////////////////////////////////////////////////////////////////
    static getItemTypeFromUser(data) {
        //  If is typed as string
        if (isNaN(parseInt(data)) && !!available_item_types_enum_1.AvailableItemTypes[data]) {
            GenerateCommand.itemToGenerate.type = available_item_types_enum_1.AvailableItemTypes[data];
        }
        else {
            if (!available_item_types_enum_1.AvailableItemTypes[data]) {
                ui_core_1.UI.throw('The given type is invalid', GenerateCommand.generateItem);
                return;
            }
            GenerateCommand.itemToGenerate.type = data;
        }
        GenerateCommand.askForItemFilename();
    }
    static getItemFilenameFromUser(data) {
        if (!data) {
            ui_core_1.UI.throw(`The given filename: "${data}" is not valid`, GenerateCommand.askForItemFilename);
            return;
        }
        GenerateCommand.itemToGenerate.relativePathFromSrc = GenerateCommand.extractRelativePathFromItemSourceFolder(data);
        GenerateCommand.itemToGenerate.filename = GenerateCommand.extractFilename(data);
        GenerateCommand.itemToGenerate.className = GenerateCommand.extractClassname(data);
        const extension = GenerateCommand.extractExtension(data);
        if (!extension || extension === available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]) {
            GenerateCommand.askForItemExtension();
            return;
        }
        const sub = GenerateCommand
            .startFileGenerationForThisItem()
            .subscribe(res => {
            if (!res) {
                ui_core_1.UI.error(`Couldn't create the item. Aborting.`);
                sub.unsubscribe();
                return;
            }
            ui_core_1.UI.success('Job completed successfully');
            sub.unsubscribe();
        });
    }
    ;
    static getItemExtensionFromUser(data) {
        if (!data) {
            dist_1.SmartCLI.GenericOutput.printWarning('Invalid extension name');
            GenerateCommand.askForItemExtension();
        }
        GenerateCommand.itemToGenerate.extension = data;
        ui_core_1.UI.success('Extension successfully set');
        const sub = GenerateCommand
            .startFileGenerationForThisItem()
            .subscribe(res => {
            if (!res) {
                ui_core_1.UI.error(`Couldn't create the item. Aborting.`);
                sub.unsubscribe();
                return;
            }
            ui_core_1.UI.success('Job completed successfully');
            sub.unsubscribe();
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////
    //  Askers
    ////////////////////////////////////////////////////////////////////////////////////
    static askForItemFilename() {
        ui_core_1.UI.print(`Type the filename for the new ${available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]}`, true);
        ui_core_1.UI.askUserInput('> ', GenerateCommand.getItemFilenameFromUser);
    }
    static askForItemExtension() {
        ui_core_1.UI.print(`Type the filename extension`, true);
        ui_core_1.UI.askUserInput('> ', GenerateCommand.getItemExtensionFromUser);
    }
}
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=generate.command.js.map