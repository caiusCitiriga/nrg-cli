import 'reflect-metadata';

import * as fs from 'fs';

import { injectable } from 'inversify';

import { CLI_DEFAULTS } from '../config/cli-defaults.config';
import { CLI_CONF_FILENAME } from '../config/cli-defaults.config';

import { IConfWriter } from "../interfaces/conf-writer.interface";

@injectable()
export class ConfWriter implements IConfWriter {
    public initConfFile(): boolean {
        fs.writeFileSync(`./${CLI_CONF_FILENAME}`, JSON.stringify(CLI_DEFAULTS));
        return true;
    }
}