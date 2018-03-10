"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const process = require("process");
const inversify_1 = require("inversify");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const dist_1 = require("smart-cli/dist");
const exceptions_conts_1 = require("../consts/exceptions.conts");
const types_const_1 = require("../consts/types.const");
const item_types_enum_1 = require("../enums/item-types.enum");
const default_types_config_1 = require("../config/default-types.config");
const nrg_exception_entity_1 = require("./nrg-exception.entity");
let GenerateCommand = class GenerateCommand {
    constructor(confReader) {
        this._UI = new dist_1.SmartCLI().UI;
        this._confReader = confReader;
        this._availableItemTypes = [];
        this._subfoldersDelimiter = '/';
    }
    run(flags) {
        this.ensureFlagsIntegrity(flags);
        this._availableItemTypes = this.mergeAdditionalTypesWithDefaultOnes();
        this._availableItemTypes.forEach((t, idx) => !!t.itemType ? null : this._availableItemTypes[idx].itemType = item_types_enum_1.ItemTypes.custom);
        switch (flags[0].name) {
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.dto).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.dto), flags);
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.enum).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.enum), flags);
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.model).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.model), flags);
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.const).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.const), flags);
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.entity).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.entity), flags);
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.interface).name.substr(0, 3):
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.interface), flags);
            default:
                //  If the user didn't specified any custom item types, this check will fail    
                if (this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.custom)
                    && this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.custom).name === flags[0].name) {
                    return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.custom), flags);
                }
                throw new nrg_exception_entity_1.NRGException().throw({
                    name: exceptions_conts_1.NRG_EXCEPTIONS.InvalidItemTypeGenerationException.name,
                    message: exceptions_conts_1.NRG_EXCEPTIONS.InvalidItemTypeGenerationException.message(),
                });
        }
    }
    ensureFlagsIntegrity(flags) {
        if (!flags.length) {
            throw new nrg_exception_entity_1.NRGException().throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.MissingItemTypeFlagException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.MissingItemTypeFlagException.message(),
            });
        }
        if (!flags[0].options || !flags[0].options[0] || !flags[0].options[0].value) {
            throw new nrg_exception_entity_1.NRGException().throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.MissingItemNameException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.MissingItemNameException.message(flags[0].name === 'int' ? 'interface' : flags[0].name),
            });
        }
    }
    mergeAdditionalTypesWithDefaultOnes() {
        return default_types_config_1.DefaultItemTypes.concat(this._confReader.getAdditionalTypes());
    }
    generateItem(itemType, flags) {
        const jobStatus = new BehaviorSubject_1.BehaviorSubject(false);
        const itemData = this.extractItemData(flags, itemType);
        this.ensureEveryFolderExistsBeforeWrite(itemData);
        this.writeFile(jobStatus, itemData);
        return jobStatus.asObservable();
    }
    extractItemData(flags, itemType) {
        let filename = '';
        let additionalSubfolders = '';
        const rawFilename = flags[0].options[0].value;
        const ext = this.extractExtension(rawFilename, itemType.name);
        const extractionResult = this.extractFilename(rawFilename, ext).split(this._subfoldersDelimiter);
        if (extractionResult.length > 1) {
            const subfoldersLen = extractionResult.length;
            filename = extractionResult[extractionResult.length - 1];
            additionalSubfolders = extractionResult.filter((item, idx) => idx < (extractionResult.length - 1)).join(path.sep) + path.sep;
        }
        else {
            filename = extractionResult[0];
        }
        const result = {
            ext: ext,
            filename: filename,
            classname: this.extractClassname(filename, ext, itemType),
            foldername: itemType.plural,
            fullPath: ``,
            fileContent: '',
        };
        result.fullPath = `${process.cwd()}${path.sep}${this._confReader.getSrcFolder()}${path.sep}${result.foldername}${path.sep}${additionalSubfolders}${result.filename}.${itemType.name}.${ext}`;
        result.fileContent = this.getFileContent(itemType, result);
        return result;
    }
    getFileContent(itemType, itemData) {
        let finalResult = '';
        const customFileTemplates = this._confReader.getCustomFileTemplates();
        if (!customFileTemplates && itemData.ext === 'ts' || itemData.ext === 'tsx') {
            return this.generateDetaultTSItem(itemType, itemData);
        }
        if (customFileTemplates.find(cft => cft.itemName === itemType.name)) {
            const fileTemplateData = customFileTemplates.find(cft => cft.itemName === itemType.name);
            if (fileTemplateData.templateUrl && !!fileTemplateData.templateUrl.length) {
                finalResult = fs.readFileSync(fileTemplateData.templateUrl, { encoding: 'utf-8' }).toString();
            }
            else {
                finalResult = fileTemplateData.template;
            }
            if (!finalResult.length) {
                new nrg_exception_entity_1.NRGException().throw({
                    name: exceptions_conts_1.NRG_EXCEPTIONS.NoValidFileTemplateForThisItemException.name,
                    message: exceptions_conts_1.NRG_EXCEPTIONS.NoValidFileTemplateForThisItemException.message(itemType.name),
                });
            }
        }
        return finalResult.length ? finalResult : `// Energy couldn't find a valid file template for this item.`;
    }
    generateDetaultTSItem(itemType, itemData) {
        const exportType = itemType.itemType === item_types_enum_1.ItemTypes.interface
            ? 'interface'
            : itemType.itemType === item_types_enum_1.ItemTypes.const
                ? 'const'
                : itemType.itemType === item_types_enum_1.ItemTypes.enum
                    ? 'enum'
                    : 'class';
        return `export ${exportType} ${itemData.classname} {\n    \n}\n`;
    }
    extractExtension(rawString, itemTypeName) {
        let extension = this._confReader.getDefaultFilesExt();
        const splittedValueByExtensionDelimiter = rawString.split('.');
        splittedValueByExtensionDelimiter.shift(); // remove the filename
        if (splittedValueByExtensionDelimiter.length > 1
            && splittedValueByExtensionDelimiter[splittedValueByExtensionDelimiter.length - 1] !== item_types_enum_1.ItemTypes[item_types_enum_1.ItemTypes[itemTypeName]]) {
            //  Has own extension
            extension = splittedValueByExtensionDelimiter[splittedValueByExtensionDelimiter.length - 1];
        }
        return extension;
    }
    extractFilename(rawString, extension) {
        let splittedValueByExtensionDelimiter = rawString.split('.');
        splittedValueByExtensionDelimiter = splittedValueByExtensionDelimiter.filter(val => val !== extension);
        return splittedValueByExtensionDelimiter.join('.');
    }
    extractClassname(rawString, extension, itemType) {
        let finalClassName = '';
        let splittedValueByDot = rawString.split('.');
        splittedValueByDot = splittedValueByDot.filter(val => val !== extension);
        const reformedValueWithoutExtension = splittedValueByDot.join('.');
        const explodedValueByDash = reformedValueWithoutExtension.split('-');
        explodedValueByDash.forEach(word => {
            if (word.indexOf('.') !== -1) {
                word.split('.').forEach(subWord => finalClassName += subWord[0].toUpperCase() + subWord.substr(1));
                return;
            }
            finalClassName += word[0].toUpperCase() + word.substr(1);
        });
        return this._confReader.useDotnetInterfaceStyle() && itemType.name === 'interface'
            ? `I${finalClassName}`
            : finalClassName;
    }
    ensureEveryFolderExistsBeforeWrite(itemData) {
        const pathItems = itemData.fullPath.split(path.sep);
        pathItems.pop(); //      remove the filename
        pathItems.shift(); //    remove the '/' at the beginning
        let progressivePath = path.sep;
        let directoriesCreated = 0;
        pathItems.forEach(item => {
            progressivePath += item + path.sep;
            if (!fs.existsSync(progressivePath)) {
                directoriesCreated++;
                fs.mkdirSync(progressivePath);
            }
        });
    }
    writeFile(jobStatus, itemData) {
        fs.writeFile(itemData.fullPath, itemData.fileContent, (err) => {
            if (!!err) {
                throw new nrg_exception_entity_1.NRGException().throw({
                    name: exceptions_conts_1.NRG_EXCEPTIONS.ItemWriteToDiskException.name,
                    message: exceptions_conts_1.NRG_EXCEPTIONS.ItemWriteToDiskException.message(err.message),
                });
            }
            jobStatus.next(true);
        });
    }
};
GenerateCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_const_1.TYPES.IConfReader)),
    __metadata("design:paramtypes", [Object])
], GenerateCommand);
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=generate-command.entity.js.map