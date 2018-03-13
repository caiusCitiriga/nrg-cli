"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/filter");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const item_types_enum_1 = require("../enums/item-types.enum");
const generate_command_entity_1 = require("../entities/generate-command.entity");
const default_types_config_1 = require("../config/default-types.config");
class MockConfReader {
    constructor() {
        this.additionalTypes = [];
        this.customFileTemplates = [];
        this.useDotnetInterfaces = false;
        this.defaultFilesExtension = 'ts';
        this.defaultProjectStructure = {};
        this.srcFolder = 'dist/spec/src_outlet';
    }
    setSrcFolder(val) { this.srcFolder = val; }
    setAdditionalTypes(val) { this.additionalTypes = val; }
    setDefaultFilesExtension(val) { this.defaultFilesExtension = val; }
    setUseDotnetInterfaceStyle(val) { this.useDotnetInterfaces = val; }
    setCustomFileTemplates(val) { this.customFileTemplates = val; }
    setDefaultProjectStructure(val) { this.defaultProjectStructure = val; }
    getSrcFolder() { return this.srcFolder; }
    getDefaultFilesExt() { return this.defaultFilesExtension; }
    getAdditionalTypes() { return this.additionalTypes; }
    getCustomFileTemplates() { return this.customFileTemplates; }
    useDotnetInterfaceStyle() { return this.useDotnetInterfaces; }
    getDefaultProjectStructure() { return this.getDefaultProjectStructure; }
}
exports.MockConfReader = MockConfReader;
const confReader = new MockConfReader();
const generateCommand = new generate_command_entity_1.GenerateCommand(confReader);
beforeAll(() => {
    const defTypes = default_types_config_1.DefaultItemTypes.concat(confReader.getAdditionalTypes());
    generateCommand._availableItemTypes = defTypes;
    generateCommand._availableItemTypes
        .forEach((t, idx) => !!t.itemType ? null : generateCommand._availableItemTypes[idx].itemType = item_types_enum_1.ItemTypes.custom);
});
describe('GenerateCommand with case "g --dto=test-one.dto"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });
    it('should parse the filename correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = generateCommand.extractFilename(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });
    it('should parse the classname correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = generateCommand.extractClassname(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});
describe('GenerateCommand with case "g --dto=test-one"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });
    it('should parse the filename correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = generateCommand.extractFilename(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });
    it('should parse the classname correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = generateCommand.extractClassname(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});
describe('GenerateCommand with case "g --dto=test-one.special"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });
    it('should parse the filename correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = generateCommand.extractFilename(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });
    it('should parse the classname correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = generateCommand.extractClassname(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});
describe('GenerateCommand with case "g --dto=test-one.special.dto"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });
    it('should parse the filename correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = generateCommand.extractFilename(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });
    it('should parse the classname correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = generateCommand.extractClassname(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});
describe('GenerateCommand with case "g --dto=test-one.special.dto.ts"', () => {
    it('should parse the extension correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        //  Assert
        expect(extensionResult).toEqual(expectedExtension);
    });
    it('should parse the filename correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const filenameResult = generateCommand.extractFilename(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(`${filenameResult}.${extensionResult}`).toEqual(`${expectedFilename}.${expectedExtension}`);
    });
    it('should parse the classname correctly', () => {
        //  Arrange
        const flags = [{
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
        const extensionResult = generateCommand.extractExtension(flags[0].options[0].value, flags[0].name);
        const classnameResult = generateCommand.extractClassname(flags[0].options[0].value, extensionResult);
        //  Assert
        expect(classnameResult).toEqual(expectedClassname);
    });
});
describe('GenerateCommand integration testing', () => {
    it('should create the item correctly without the deep folder path', () => {
        //  Arrange
        const flags = [{
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
            expect(fs.existsSync(process.cwd() + path.sep + confReader.getSrcFolder() + '/dtos/' + 'test-one.special.dto.ts')).toBeTruthy();
            rimraf.sync(confReader.getSrcFolder());
        });
    });
    it('should create the interface item correctly', () => {
        //  Arrange
        const flags = [{
                name: "int",
                options: [
                    {
                        name: "int",
                        value: "test-one"
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
            expect(fs.existsSync(process.cwd() + path.sep + confReader.getSrcFolder() + '/interfaces/' + 'test-one.interface.ts')).toBeTruthy();
            rimraf.sync(confReader.getSrcFolder());
        });
    });
    it('should return the item data parsed correctly', () => {
        //  Arrange
        const flags = [{
                name: "dto",
                options: [
                    {
                        name: "dto",
                        value: "deep/test-one.special.ts"
                    }
                ]
            }];
        const expectedFullPath = `${process.cwd()}${path.sep}${confReader.getSrcFolder()}${path.sep}dtos${path.sep}deep${path.sep}test-one.special.dto.ts`;
        //  Act
        const itemData = generateCommand.extractItemData(flags, default_types_config_1.DefaultItemTypes.find(t => t.name === 'dto'));
        //  Assert
        expect(itemData.ext).toBe('ts');
        expect(itemData.foldername).toBe('dtos');
        expect(itemData.fullPath).toBe(expectedFullPath);
        expect(itemData.filename).toBe('test-one.special');
        expect(itemData.classname).toBe('TestOneSpecial');
    });
});
//# sourceMappingURL=generate-command.spec.js.map