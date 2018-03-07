import * as fs from 'fs';
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
import { IUserInterface } from 'smart-cli/dist/interfaces/plain/user-interface.interface';
import { SmartCLI } from 'smart-cli/dist';

@injectable()
export class GenerateCommand implements ICommandRunner {
    private _UI: IUserInterface;
    private _confReader: IConfReader;
    private _availableItemTypes: IEnergyAdditionalTypeCLIConf[];

    public constructor(
        @inject(TYPES.IConfReader) confReader: IConfReader
    ) {
        this._UI = new SmartCLI().UI;
        this._confReader = confReader;
        this._availableItemTypes = [];
    }

    public run(flags: IFlag[]): Observable<boolean> {
        this.ensureFlagsIntegrity(flags);
        this._availableItemTypes = this.mergeAdditionalTypesWithDefaultOnes();
        this._availableItemTypes.forEach((t, idx) => !!t.itemType ? null : this._availableItemTypes[idx].itemType = ItemTypes.custom);

        switch (flags[0].name) {
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.dto).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.dto), flags);
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.enum).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.enum), flags);
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.model).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.model), flags);
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.const).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.const), flags);
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.entity).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.entity), flags);
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.interface).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.interface), flags);
            case this._availableItemTypes.find(t => t.itemType === ItemTypes.custom).name:
                return this.generateItem(this._availableItemTypes.find(t => t.itemType === ItemTypes.custom), flags);
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

    private generateItem(itemType: IEnergyAdditionalTypeCLIConf, flags: IFlag[]): Observable<boolean> {
        const jobStatus = new BehaviorSubject(false);
        const itemData = this.extractItemData(flags, itemType);

        const pathItemsToCheck = itemData.fullPath.split(path.sep);
        pathItemsToCheck.pop(); //      remove the filename
        pathItemsToCheck.shift(); //    remove the '/' at the beginning
        this.ensureEveryFolderExistsBeforeWrite(pathItemsToCheck);

        const exportType = itemType.itemType === ItemTypes.interface
            ? 'interface'
            : itemType.itemType === ItemTypes.const
                ? 'const'
                : itemType.itemType === ItemTypes.enum
                    ? 'enum'
                    : 'class';

        const typescriptItemContent = `export ${exportType} ${itemData.classname} {\n\t\n}\n`;
        fs.writeFile(itemData.fullPath, itemData.ext === 'ts' ? typescriptItemContent : '', (err) => {
            if (!!err) {
                throw new NRGException().throw({
                    name: NRG_EXCEPTIONS.ItemWriteToDiskException.name,
                    message: NRG_EXCEPTIONS.ItemWriteToDiskException.message(err.message),
                });
            }

            jobStatus.next(true);
        });
        return jobStatus.asObservable();
    }

    private extractItemData(flags: IFlag[], itemType: IEnergyAdditionalTypeCLIConf): { ext: string, filename: string, classname: string, foldername: string, fullPath: string } {
        const rawFilename = flags[0].options[0].value;
        const ext = this.extractExtension(rawFilename, itemType.name);
        const result = {
            ext: ext,
            filename: this.extractFilename(rawFilename, ext),
            classname: this.extractClassname(rawFilename, ext),
            foldername: itemType.plural,
            fullPath: ``,
        };

        result.fullPath = `${process.cwd()}${path.sep}${this._confReader.getSrcFolder()}${path.sep}${result.foldername}${path.sep}${result.filename}.${itemType.name}.${ext}`
        return result;
    }

    private extractExtension(rawString: string, itemTypeName: string): string {
        let extension = this._confReader.getDefaultFilesExt();
        const splittedValueByExtensionDelimiter = rawString.split('.');
        splittedValueByExtensionDelimiter.shift(); // remove the filename

        if (
            splittedValueByExtensionDelimiter.length > 1
            && splittedValueByExtensionDelimiter[splittedValueByExtensionDelimiter.length - 1] !== ItemTypes[ItemTypes[itemTypeName]]
        ) {
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

        return this._confReader.useDotnetInterfaceStyle() ? `I${finalClassName}` : finalClassName;
    }

    private ensureEveryFolderExistsBeforeWrite(pathItems: string[]): void {
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
}