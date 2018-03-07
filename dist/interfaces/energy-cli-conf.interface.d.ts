import { ItemTypes } from '../enums/item-types.enum';
export interface IEnergyCLIConf {
    srcFolder: string;
    defaultExt: string;
    additionalTypes: IEnergyAdditionalType[];
    dotnetInterfaceStyle: boolean;
}
export interface IEnergyAdditionalType {
    name: string;
    plural?: string;
    itemType?: ItemTypes;
}
