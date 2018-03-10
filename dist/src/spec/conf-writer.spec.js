"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const conf_writer_entity_1 = require("../entities/conf-writer.entity");
describe('ConfWriter', () => {
    it('should write the energy.cli.json file successfully', () => {
        //  Arrange
        const confWriter = new conf_writer_entity_1.ConfWriter();
        //  Act
        confWriter.initConfFile();
        const fileExists = fs.existsSync('./.energy.cli.json');
        //  Assert
        expect(fileExists).toBeTruthy();
        if (fileExists) {
            fs.unlinkSync('./.energy.cli.json');
        }
    });
});
//# sourceMappingURL=conf-writer.spec.js.map