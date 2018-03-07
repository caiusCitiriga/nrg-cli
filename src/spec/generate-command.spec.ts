import 'rxjs/add/operator/filter';

import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as cp from 'child_process';
import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";
import { IConfReader } from "../interfaces/conf-reader.interface";
import { IEnergyAdditionalTypeCLIConf } from "../interfaces/energy-cli-conf.interface";

import { GenerateCommand } from "../entities/generate-command.entity";
import { DefaultItemTypes } from "../config/default-types.config";
import { ItemTypes } from "../enums/item-types.enum";

export class MockConfReader implements IConfReader {
    private additionalTypes = [];
    private useDotnetInterfaces = false;
    private defaultFilesExtension = 'ts';
    private srcFolder = './dist/spec/src_outlet';

    public setSrcFolder(val: string): void { this.srcFolder = val; }
    public setUseDotnetInterfaceStyle(val: boolean) { this.useDotnetInterfaces = val; }
    public setDefaultFilesExtension(val: string): void { this.defaultFilesExtension = val; }
    public setAdditionalTypes(val: IEnergyAdditionalTypeCLIConf[]): void { this.additionalTypes = val; }

    public getSrcFolder(): string { return this.srcFolder; }
    public getDefaultFilesExt(): string { return this.defaultFilesExtension; }
    public useDotnetInterfaceStyle(): boolean { return this.useDotnetInterfaces; }
    public getAdditionalTypes(): IEnergyAdditionalTypeCLIConf[] { return this.additionalTypes; }
}

const confReader = new MockConfReader();
const generateCommand = new GenerateCommand(confReader);

beforeAll(() => {
    const defTypes = DefaultItemTypes.concat(confReader.getAdditionalTypes());
    (generateCommand as any)._availableItemTypes = defTypes;
    (generateCommand as any)._availableItemTypes
        .forEach((t, idx) =>
            !!t.itemType ? null : (generateCommand as any)._availableItemTypes[idx].itemType = ItemTypes.custom
        );
});

describe('GenerateCommand with case "g --dto=test-one.dto"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.dto"
                }
            ]
        }];

        const expectedExtension = 'ts';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);

        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });

    it('should parse the filename correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.dto"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedFilename = 'test-one.dto';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = (generateCommand as any).extractFilename(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });

    it('should parse the classname correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.dto"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedClassname = 'TestOneDto';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = (generateCommand as any).extractClassname(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});

describe('GenerateCommand with case "g --dto=test-one"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one"

                }
            ]
        }];

        const expectedExtension = 'ts';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);

        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });

    it('should parse the filename correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedFilename = 'test-one';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = (generateCommand as any).extractFilename(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });

    it('should parse the classname correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedClassname = 'TestOne';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = (generateCommand as any).extractClassname(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});

describe('GenerateCommand with case "g --dto=test-one.special"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special"

                }
            ]
        }];

        const expectedExtension = 'ts';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);

        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });

    it('should parse the filename correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedFilename = 'test-one.special';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = (generateCommand as any).extractFilename(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });

    it('should parse the classname correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedClassname = 'TestOneSpecial';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = (generateCommand as any).extractClassname(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});

describe('GenerateCommand with case "g --dto=test-one.special.dto"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special.dto"

                }
            ]
        }];

        const expectedExtension = 'ts';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);

        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });

    it('should parse the filename correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special.dto"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedFilename = 'test-one.special.dto';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = (generateCommand as any).extractFilename(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });

    it('should parse the classname correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special.dto"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedClassname = 'TestOneSpecialDto';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = (generateCommand as any).extractClassname(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});

describe('GenerateCommand with case "g --dto=test-one.special.dto.ts"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special.dto.ts"

                }
            ]
        }];

        const expectedExtension = 'ts';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);

        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });

    it('should parse the filename correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special.dto.ts"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedFilename = 'test-one.special.dto';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = (generateCommand as any).extractFilename(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });

    it('should parse the classname correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special.dto.ts"

                }
            ]
        }];

        const expectedExtension = 'ts';
        const expectedClassname = 'TestOneSpecialDto';

        //  Act
        const extensionResult = (generateCommand as any).extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = (generateCommand as any).extractClassname(flags[0].options[0].value, extensionResult);

        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });

    it('should create the item correctly', () => {
        //  Arrange
        const flags: IFlag[] = [{
            name: "dto",
            options: [
                {
                    name: "dto",
                    value: "test-one.special.ts"

                }
            ]
        }];

        //  Act/Assert
        if (fs.existsSync(confReader.getSrcFolder())) {
            rimraf.sync(confReader.getSrcFolder());
        }

        generateCommand
            .run(flags)
            .filter(res => !!res)
            .subscribe(res => {
                //  Assert
                expect(fs.existsSync(confReader.getSrcFolder() + '/dtos/' + 'test-one.special.ts')).toBeTruthy();
                rimraf.sync(confReader.getSrcFolder());
            });
    });
});