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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const process = require("process");
const inversify_1 = require("inversify");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const types_const_1 = require("../consts/types.const");
const item_types_enum_1 = require("../enums/item-types.enum");
const default_types_config_1 = require("../config/default-types.config");
const nrg_exception_entity_1 = require("./nrg-exception.entity");
const exceptions_conts_1 = require("../consts/exceptions.conts");
let GenerateCommand = class GenerateCommand {
    run(flags) {
        this.ensureFlagsIntegrity(flags);
        this._availableItemTypes = this.mergeAdditionalTypesWithDefaultOnes();
        this._availableItemTypes.forEach((t, idx) => !!t.itemType ? null : this._availableItemTypes[idx].itemType = item_types_enum_1.ItemTypes.custom);
        switch (flags[0].name) {
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.dto).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.dto), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.enum).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.enum), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.model).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.model), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.const).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.const), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.entity).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.entity), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.interface).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.interface), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.custom).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === item_types_enum_1.ItemTypes.custom), flags);
                break;
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
    generateItem(type, flags) {
        const status = new BehaviorSubject_1.BehaviorSubject(false);
        const filename = this.parseFilename(flags[0].options[0].value);
        // const className = this.parseClassname(flags[0].options[0].value);
        const itemPath = process.cwd() + path.sep + this._confReader.getSrcFolder();
        return status.asObservable();
    }
    parseFilename(rawString) {
        const ext = this.extractExtension(rawString);
        const filename = this.extractFilename(rawString, ext);
        const classname = this.extractClassname(rawString, ext);
        console.log(classname);
        return;
    }
    extractExtension(rawString) {
        let extension = this._confReader.getDefaultFilesExt();
        const splittedValueByExtensionDelimiter = rawString.split('.');
        splittedValueByExtensionDelimiter.shift(); // remove the filename
        if (splittedValueByExtensionDelimiter.length >= 1) {
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
        return finalClassName;
    }
};
__decorate([
    inversify_1.inject(types_const_1.TYPES.IConfReader),
    __metadata("design:type", Object)
], GenerateCommand.prototype, "_confReader", void 0);
GenerateCommand = __decorate([
    inversify_1.injectable()
], GenerateCommand);
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=generate-command.entity.js.map