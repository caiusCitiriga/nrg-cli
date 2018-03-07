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
const types_const_1 = require("../consts/types.const");
const item_types_enum_1 = require("../enums/item-types.enum");
const default_types_config_1 = require("../config/default-types.config");
const nrg_exception_entity_1 = require("./nrg-exception.entity");
const exceptions_conts_1 = require("../consts/exceptions.conts");
const dist_1 = require("smart-cli/dist");
let GenerateCommand = class GenerateCommand {
    constructor(confReader) {
        this._UI = new dist_1.SmartCLI().UI;
        this._confReader = confReader;
        this._availableItemTypes = [];
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
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.interface).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.interface), flags);
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.custom).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.custom), flags);
            default:
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
                message: exceptions_conts_1.NRG_EXCEPTIONS.MissingItemNameException.message(flags[0].name),
            });
        }
    }
    mergeAdditionalTypesWithDefaultOnes() {
        return default_types_config_1.DefaultItemTypes.concat(this._confReader.getAdditionalTypes());
    }
    generateItem(itemType, flags) {
        const jobStatus = new BehaviorSubject_1.BehaviorSubject(false);
        const itemData = this.extractItemData(flags, itemType);
        const pathItemsToCheck = itemData.fullPath.split(path.sep);
        pathItemsToCheck.pop(); //      remove the filename
        pathItemsToCheck.shift(); //    remove the '/' at the beginning
        this.ensureEveryFolderExistsBeforeWrite(pathItemsToCheck);
        const exportType = itemType.itemType === item_types_enum_1.ItemTypes.interface
            ? 'interface'
            : itemType.itemType === item_types_enum_1.ItemTypes.const
                ? 'const'
                : itemType.itemType === item_types_enum_1.ItemTypes.enum
                    ? 'enum'
                    : 'class';
        const typescriptItemContent = `export ${exportType} ${itemData.classname} {\n\t\n}\n`;
        fs.writeFile(itemData.fullPath, itemData.ext === 'ts' ? typescriptItemContent : '', (err) => {
            if (!!err) {
                throw new nrg_exception_entity_1.NRGException().throw({
                    name: exceptions_conts_1.NRG_EXCEPTIONS.ItemWriteToDiskException.name,
                    message: exceptions_conts_1.NRG_EXCEPTIONS.ItemWriteToDiskException.message(err.message),
                });
            }
            jobStatus.next(true);
        });
        return jobStatus.asObservable();
    }
    extractItemData(flags, itemType) {
        const rawFilename = flags[0].options[0].value;
        const ext = this.extractExtension(rawFilename, itemType.name);
        const result = {
            ext: ext,
            filename: this.extractFilename(rawFilename, ext),
            classname: this.extractClassname(rawFilename, ext),
            foldername: itemType.plural,
            fullPath: ``,
        };
        result.fullPath = `${process.cwd()}${path.sep}${this._confReader.getSrcFolder()}${path.sep}${result.foldername}${path.sep}${result.filename}.${itemType.name}.${ext}`;
        return result;
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
    extractClassname(rawString, extension) {
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
        return this._confReader.useDotnetInterfaceStyle() ? `I${finalClassName}` : finalClassName;
    }
    ensureEveryFolderExistsBeforeWrite(pathItems) {
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
};
GenerateCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_const_1.TYPES.IConfReader)),
    __metadata("design:paramtypes", [Object])
], GenerateCommand);
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=generate-command.entity.js.map