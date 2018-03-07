import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { injectable } from 'inversify';

import { NRG_EXCEPTIONS } from '../consts/exceptions.conts';

import { IConfReader } from '../interfaces/conf-reader.interface';
import { IEnergyAdditionalType, IEnergyCLIConf } from '../interfaces/energy-cli-conf.interface';
import { NRGException } from './nrg-exception.entity';
import { CLI_DEFAULTS } from '../config/cli-defaults.config';

@injectable()
export class ConfReader implements IConfReader {
    private _cliConfFilename: string;
    private _configFile: IEnergyCLIConf;

    public constructor() {
        this._configFile = null as any;
        this._cliConfFilename = 'energy.cli.json';
    }

    public getSrcFolder(): string {
        this.readConf();
        return this._configFile.srcFolder;
    }

    public getDefaultFilesExt(): string {
        this.readConf();
        return this._configFile.defaultExt;
    }

    public getAdditionalTypes(): IEnergyAdditionalType[] {
        this.readConf();
        return this._configFile.additionalTypes;
    }

    public useDotnetInterfaceStyle(): boolean {
        this.readConf();
        return this._configFile.dotnetInterfaceStyle;
    }

    private ensureIsEnergyProjectFolder(): void {
        if (!fs.existsSync(process.cwd() + path.sep + this._cliConfFilename)) {
            new NRGException().throw({
                name: NRG_EXCEPTIONS.NotAEnergyProjectException.name,
                message: NRG_EXCEPTIONS.NotAEnergyProjectException.message()
            });
        }
    }

    private readConf(): void {
        this.ensureIsEnergyProjectFolder();
        this._configFile = this.fillMissingConfigurationsWithDefaults();
    }

    private fillMissingConfigurationsWithDefaults(): IEnergyCLIConf {
        const fileContent = JSON.parse(fs.readFileSync(process.cwd() + path.sep + this._cliConfFilename).toString()) as IEnergyCLIConf;

        fileContent.srcFolder = fileContent.srcFolder
            ? fileContent.srcFolder
            : CLI_DEFAULTS.srcFolder;

        fileContent.defaultExt = fileContent.defaultExt
            ? fileContent.defaultExt
            : CLI_DEFAULTS.defaultExt;

        fileContent.additionalTypes = fileContent.additionalTypes
            ? fileContent.additionalTypes
            : CLI_DEFAULTS.additionalTypes;

        return fileContent;
    }
}