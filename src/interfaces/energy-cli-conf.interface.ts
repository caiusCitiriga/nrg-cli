import { ItemTypes } from '../enums/item-types.enum';

export interface IEnergyCLIConf {
    srcFolder: string;
    defaultExt: string;
    dotnetInterfaceStyle: boolean;
    additionalTypes: IEnergyAdditionalType[];
    customFileTemplates: IEnergyCustomFileTemplate[];
}

export interface IEnergyAdditionalType {
    name: string;
    plural?: string;
    itemType?: ItemTypes;
}

export interface IEnergyCustomFileTemplate {
    itemName: string;
    template: string;
}