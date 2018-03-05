import { ItemTypes } from '../enums/item-types.enum';
export interface IEnergyCLIConf {
    srcFolder: string;
    defaultExt: string;
    additionalTypes: IEnergyAdditionalTypeCLIConf[];
    dotnetInterfaceStyle: boolean;
}
export interface IEnergyAdditionalTypeCLIConf {
    name: string;
    plural?: string;
    itemType?: ItemTypes;
}
