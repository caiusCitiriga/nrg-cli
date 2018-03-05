import { IEnergyAdditionalTypeCLIConf } from './energy-cli-conf.interface';

export interface IConfReader {
    getSrcFolder(): string;
    getDefaultFilesExt(): string;
    useDotnetInterfaceStyle(): boolean;
    getAdditionalTypes(): IEnergyAdditionalTypeCLIConf[];
}
