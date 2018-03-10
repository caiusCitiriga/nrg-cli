import 'reflect-metadata';

import * as fs from 'fs';

import { injectable } from 'inversify';

import { CLI_DEFAULTS } from '../config/cli-defaults.config';

import { IConfWriter } from "../interfaces/conf-writer.interface";

@injectable()
export class ConfWriter implements IConfWriter {
    public initConfFile(): boolean {
        fs.writeFileSync('./.energy.cli.json', JSON.stringify(CLI_DEFAULTS));
        return true;
    }
}