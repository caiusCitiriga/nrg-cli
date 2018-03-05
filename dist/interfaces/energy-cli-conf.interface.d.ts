export interface IEnergyCLIConf {
    srcFolder: string;
    defaultExt: string;
    additionalTypes: IEnergyAdditionalTypeCLIConf[];
}
export interface IEnergyAdditionalTypeCLIConf {
    name: string;
    plural?: string;
}
