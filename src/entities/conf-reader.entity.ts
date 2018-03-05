import 'reflect-metadata';
import * as fs from 'fs';

import { injectable } from 'inversify';

import { IConfReader } from "../interfaces/conf-reader.interface";
import { IEnergyAdditionalTypeCLIConf, IEnergyCLIConf } from '../interfaces/energy-cli-conf.interface';

@injectable()
export class ConfReader implements IConfReader {
    private _configFile: IEnergyCLIConf;

    public constructor() {
        fs.readFileSync()
    }
    public getSrcFolder(): string {

    }

    public getDefaultFilesExt(): string {
        throw new Error("Method not implemented.");
    }

    public getAdditionalTypes(): IEnergyAdditionalTypeCLIConf[] {
        throw new Error("Method not implemented.");
    }
}