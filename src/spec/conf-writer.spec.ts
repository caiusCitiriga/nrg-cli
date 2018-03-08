import * as fs from 'fs';

import { ConfWriter } from "../entities/conf-writer.entity";

describe('ConfWriter', () => {

    it('should write the energy.cli.json file successfully', () => {
        //  Arrange
        const confWriter = new ConfWriter();

        //  Act
        confWriter.initConfFile();
        const fileExists = fs.existsSync('./energy.cli.json');

        //  Assert
        expect(fileExists).toBeTruthy();
        if (fileExists) {
            fs.unlinkSync('./energy.cli.json');
        }
    });
});