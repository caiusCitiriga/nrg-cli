"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/filter");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const scaffold_command_entity_1 = require("../entities/scaffold-command.entity");
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
    getDefaultProjectStructure() { return this.defaultProjectStructure; }
}
exports.MockConfReader = MockConfReader;
const confReader = new MockConfReader();
const scaffoldCommand = new scaffold_command_entity_1.ScaffoldCommand(confReader);
describe('ScaffoldCommand', () => {
    beforeEach((done) => {
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
        done();
    });
    afterEach((done) => {
        rimraf(confReader.getSrcFolder(), err => {
            if (!!err) {
                console.log(`There was an error deleting the srcFolder:\n${err.message}`);
            }
        });
        done();
    });
    it('should scaffold correctly the structure', (done) => {
        //  Arrange
        const flags = [];
        const expectedExtension = 'ts';
        //  Act
        scaffoldCommand
            .run(flags)
            .filter(res => !!res)
            .subscribe(res => done());
        //  Assert
        expect(fs.existsSync(confReader.getSrcFolder() + path.sep + 'folderOne')).toEqual(true);
        expect(fs.existsSync(confReader.getSrcFolder() + path.sep + 'folderTwo')).toEqual(true);
        expect(fs.existsSync(confReader.getSrcFolder() + path.sep + 'folderTwo' + path.sep + 'folderDeep')).toEqual(true);
    });
});
//# sourceMappingURL=scaffold-command.spec.js.map