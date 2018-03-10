import { IEnergyAdditionalType } from './energy-cli-conf.interface';

export interface IConfReader {
    getSrcFolder(): string;
    getDefaultFilesExt(): string;
    getAdditionalTypes(): IEnergyAdditionalType[];
    getCustomFileTemplates(): ICustomFileTemplate[];
    useDotnetInterfaceStyle(): boolean;
}
