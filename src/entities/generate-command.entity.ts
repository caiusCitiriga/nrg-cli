import * as path from 'path';
import * as process from 'process';

import { Observable } from 'rxjs/Observable';
import { injectable, inject } from 'inversify';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';

import { TYPES } from '../consts/types.const';
import { ItemTypes } from '../enums/item-types.enum';
import { DefaultItemTypes } from '../config/default-types.config';

import { IConfReader } from '../interfaces/conf-reader.interface';
import { ICommandRunner } from '../interfaces/command-runner.interface';
import { IEnergyAdditionalTypeCLIConf } from '../interfaces/energy-cli-conf.interface';
import { NRGException } from './nrg-exception.entity';
import { NRG_EXCEPTIONS } from '../consts/exceptions.conts';

@injectable()
export class GenerateCommand implements ICommandRunner {
    private _availableItemTypes: IEnergyAdditionalTypeCLIConf[];
    @inject(TYPES.IConfReader) private _confReader: IConfReader;

    public run(flags: IFlag[]): void {
        this.ensureFlagsIntegrity(flags);
        this._availableItemTypes = this.mergeAdditionalTypesWithDefaultOnes();
        this._availableItemTypes.forEach((t, idx) => !!t.itemType ? null : this._availableItemTypes[idx].itemType = ItemTypes.custom);

        switch (flags[0].name) {
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.dto).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.dto), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.enum).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.enum), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.model).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.model), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.const).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.const), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.entity).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.entity), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.interface).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.interface), flags);
                break;
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.custom).name:
                this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.custom), flags);
                break;
            default:
                throw new NRGException().throw({
                    name: NRG_EXCEPTIONS.InvalidItemTypeGenerationException.name,
                    message: NRG_EXCEPTIONS.InvalidItemTypeGenerationException.message(),
                });
        }
    }

    private ensureFlagsIntegrity(flags: IFlag[]): void {
        if (!flags.length) {
            throw new NRGException().throw({
                name: NRG_EXCEPTIONS.MissingItemTypeFlagException.name,
                message: NRG_EXCEPTIONS.MissingItemTypeFlagException.message(),
            });
        }

        if (!flags[0].options || !flags[0].options[0] || !flags[0].options[0].value) {
            throw new NRGException().throw({
                name: NRG_EXCEPTIONS.MissingItemNameException.name,
                message: NRG_EXCEPTIONS.MissingItemNameException.message(flags[0].name),
            });
        }
    }

    private mergeAdditionalTypesWithDefaultOnes(): IEnergyAdditionalTypeCLIConf[] {
        return DefaultItemTypes.concat(this._confReader.getAdditionalTypes());
    }

    private generateItem(type: IEnergyAdditionalTypeCLIConf, flags: IFlag[]): Observable<boolean> {
        const status = new BehaviorSubject(false);
        const filename = this.parseFilename(flags[0].options[0].value);
        // const className = this.parseClassname(flags[0].options[0].value);
        const itemPath = process.cwd() + path.sep + this._confReader.getSrcFolder();

        return status.asObservable();
    }

    private parseFilename(rawString: string): string {
        const ext = this.extractExtension(rawString);
        const filename = this.extractFilename(rawString, ext);
        const classname = this.extractClassname(rawString, ext);

        console.log(classname);
        return;
    }

    private extractExtension(rawString: string): string {
        let extension = this._confReader.getDefaultFilesExt();
        const splittedValueByExtensionDelimiter = rawString.split('.');
        splittedValueByExtensionDelimiter.shift(); // remove the filename

        if (splittedValueByExtensionDelimiter.length >= 1) {
            //  Has own extension
            extension = splittedValueByExtensionDelimiter[splittedValueByExtensionDelimiter.length - 1];
        }

        return extension;
    }

    private extractFilename(rawString: string, extension: string): string {
        let splittedValueByExtensionDelimiter = rawString.split('.');
        splittedValueByExtensionDelimiter = splittedValueByExtensionDelimiter.filter(val => val !== extension);

        return splittedValueByExtensionDelimiter.join('.');
    }

    private extractClassname(rawString: string, extension: string): string {
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
}