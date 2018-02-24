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
const dist_1 = require("smart-cli/dist");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const core_commands_const_1 = require("../../consts/core-commands.const");
const available_item_types_enum_1 = require("../../enums/available-item-types.enum");
const ui_core_1 = require("../ui.core");
const defaults_conf_1 = require("../../config/defaults.conf");
//  Since is generated getting inputs from user, the reference to "GenerateCommand" gets lost.
//  Needs to be therefore static inside
class GenerateCommand {
    constructor() {
        GenerateCommand.pathDelimiter = '/';
        GenerateCommand.itemToGenerate = {
            type: null,
            filename: '',
            extension: '',
            className: '',
            relativePathFromSrc: ''
        };
    }
    run(dispatcherOptions, flags) {
        if (!GenerateCommand.ensureIsEnergyProject()) {
            ui_core_1.UI.error('Your are not inside an Energy project. Cannot run this command here.');
            return;
        }
        switch (flags[0].flag.split(':')[0]) {
            case core_commands_const_1.CORE_COMMANDS.generate.flags.item.value:
                GenerateCommand.currentFlags = flags[0];
                GenerateCommand.generateItem();
                break;
        }
    }
    //  Input getters
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
        GenerateCommand.extractRelativePathFromItemSourceFolder(data);
        GenerateCommand.extractFilenameAndExtension(data);
    }
    ;
    static getItemExtensionFromUser(data) {
        if (!data) {
            dist_1.SmartCLI.GenericOutput.printWarning('Invalid extension name');
            GenerateCommand.askForItemExtension();
        }
        GenerateCommand.itemToGenerate.extension = data;
        ui_core_1.UI.success('Extension successfully set');
        GenerateCommand.startFileGenerationForThisItem();
    }
    //  Internals
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
            return false;
        }
        explodedFilenameByPathDelimiter.forEach((folder, index) => {
            GenerateCommand.itemToGenerate.relativePathFromSrc += folder + GenerateCommand.pathDelimiter;
        });
        return true;
    }
    static extractFilenameAndExtension(data) {
        const explodedFilenameByPathDelimiter = data.split(GenerateCommand.pathDelimiter);
        GenerateCommand.itemToGenerate.filename = explodedFilenameByPathDelimiter[explodedFilenameByPathDelimiter.length - 1];
        const explodedFileByDash = GenerateCommand.itemToGenerate.filename.split('-');
        let className = '';
        explodedFileByDash.forEach(part => {
            //  If it contains a dot, it may be the extension, or a specific typename. Skip it
            if (part.indexOf('.') != -1 && part.split('.').length === 1) {
                return;
            }
            //  If instead, it has a "composite custom dot notation" parse it skipping the last one.
            if (part.indexOf('.') != -1 && part.split('.').length >= 3) {
                className += GenerateCommand.extractMultipleUserCustomExtensions(part);
                return;
            }
            //  If none of the statements before where true, it means that the file is like "item.ext"
            className += (part.charAt(0).toUpperCase()) + (part.slice(1).toLowerCase());
        });
        //  Try to extract the extension. Throw if can't
        const explodedFileByDot = GenerateCommand.itemToGenerate.filename.split('.');
        if (explodedFileByDot.length === 1) {
            this.askForItemExtension();
            return;
        }
        ;
        let fileExtension = explodedFileByDot[explodedFileByDot.length - 1];
        GenerateCommand.startFileGenerationForThisItem();
    }
    static extractMultipleUserCustomExtensions(part) {
        let customPart = '';
        const explodedPart = part.split('.');
        explodedPart.pop();
        if (explodedPart.length === 0) {
            throw new Error('Something went wrong in extractMultipleUsersCustomExtension. The part arrived, has only one element in it');
        }
        explodedPart.forEach(p => customPart += (p.charAt(0).toUpperCase()) + (p.slice(1).toLowerCase()));
        return customPart;
    }
    static startFileGenerationForThisItem() {
        const jobDone = new BehaviorSubject_1.BehaviorSubject(false);
        try {
            let previousFoldersStack = GenerateCommand.getCLIConf().sourceFolder + path.sep;
            const explodedPathToCheck = GenerateCommand
                .itemToGenerate
                .relativePathFromSrc
                .split(GenerateCommand.pathDelimiter);
            //  Remove the last "" element
            explodedPathToCheck.pop();
            explodedPathToCheck
                .forEach((folder) => {
                previousFoldersStack += folder + path.sep;
                if (!fs.existsSync(previousFoldersStack)) {
                    fs.mkdirSync(previousFoldersStack);
                    if (!fs.readdirSync(previousFoldersStack)) {
                        throw new Error(`The folder ${folder} wasn't created. Aborting`);
                    }
                    ui_core_1.UI.success(`Folder ${folder} created`);
                }
            });
            if (GenerateCommand.itemToGenerate.type === available_item_types_enum_1.AvailableItemTypes.custom) {
            }
            else {
                const filename = `${previousFoldersStack + GenerateCommand.itemToGenerate.filename}.${available_item_types_enum_1.AvailableItemTypes[GenerateCommand.itemToGenerate.type]}.${GenerateCommand.itemToGenerate.extension}`;
                fs.writeFile(filename, null, (err) => {
                    if (err) {
                        throw new Error(`Error creating the item: ${err.message}`);
                    }
                    ui_core_1.UI.success(`File ${GenerateCommand.itemToGenerate.filename}.${GenerateCommand.itemToGenerate.extension} generated`);
                });
            }
        }
        catch (e) {
            const error = e;
            if (error.message === 'Invalid CLI configuration') {
                ui_core_1.UI.warn('Your CLI configuration appears to be corrupted.');
            }
        }
        return jobDone.asObservable();
    }
    static getCLIConf() {
        const conf = JSON.parse(fs.readFileSync(process.cwd() + path.sep + defaults_conf_1.DEFAULTS.cliConfigurationFilename).toString());
        if (!conf) {
            throw new Error('Invalid CLI configuration');
        }
        return conf;
    }
    //  Askers
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