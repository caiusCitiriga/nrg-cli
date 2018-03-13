import 'rxjs/add/operator/filter';

import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as child_process from 'child_process';

import { ItemTypes } from '../enums/item-types.enum';
import { DefaultItemTypes } from '../config/default-types.config';

import { IConfReader } from '../interfaces/conf-reader.interface';
import { IAdditionalType } from '../interfaces/additional-type.interface';
import { ICustomFileTemplate } from '../interfaces/custom-file-template.interface';

import { ScaffoldCommand } from '../entities/scaffold-command.entity';
import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';

export class MockConfReader implements IConfReader {
    private additionalTypes = [];
    private customFileTemplates = [];
    private useDotnetInterfaces = false;
    private defaultFilesExtension = 'ts';
    private defaultProjectStructure = {};
    private srcFolder = 'dist/spec/src_outlet';

    public setSrcFolder(val: string): void { this.srcFolder = val; }
    public setAdditionalTypes(val: IAdditionalType[]): void { this.additionalTypes = val; }
    public setDefaultFilesExtension(val: string): void { this.defaultFilesExtension = val; }
    public setUseDotnetInterfaceStyle(val: boolean) { this.useDotnetInterfaces = val; }
    public setCustomFileTemplates(val: ICustomFileTemplate[]): void { this.customFileTemplates = val; }
    public setDefaultProjectStructure(val: any): void { this.defaultProjectStructure = val; }

    public getSrcFolder(): string { return this.srcFolder; }
    public getDefaultFilesExt(): string { return this.defaultFilesExtension; }
    public getAdditionalTypes(): IAdditionalType[] { return this.additionalTypes; }
    public getCustomFileTemplates(): ICustomFileTemplate[] { return this.customFileTemplates; }
    public useDotnetInterfaceStyle(): boolean { return this.useDotnetInterfaces; }
    public getDefaultProjectStructure(): any { return this.defaultProjectStructure; }
}

const confReader = new MockConfReader();
const scaffoldCommand = new ScaffoldCommand(confReader);

beforeEach(() => {
    rimraf(confReader.getSrcFolder(), err => {
        if (!!err) {
            console.log(`There was an error deleting the srcFolder:\n${err.message}`);
        }
    });

    confReader.setDefaultProjectStructure({
        folderOne: null,
        folderTwo: {
            folderDeep: null
        }
    });

    fs.mkdirSync(confReader.getSrcFolder());
});

afterEach(() => {
    rimraf(confReader.getSrcFolder(), err => {
        if (!!err) {
            console.log(`There was an error deleting the srcFolder:\n${err.message}`);
        }
    });
})

describe('ScaffoldCommand', () => {
    it('should scaffold correctly the structure', () => {
        //  Arrange
        const flags: IFlag[] = [];

        const expectedExtension = 'ts';

        //  Act/Assert
        scaffoldCommand
            .run(flags)
            .filter(res => !!res)
            .subscribe(res => {
                expect(fs.existsSync(confReader.getSrcFolder() + path.sep + 'folderOne')).toEqual(true);
                expect(fs.existsSync(confReader.getSrcFolder() + path.sep + 'folderTwo')).toEqual(true);
                expect(fs.existsSync(confReader.getSrcFolder() + path.sep + 'folderTwo' + path.sep + 'folderDeep')).toEqual(true);
            });
    });
});
