import { ItemTypes } from "../enums/item-types.enum";
import { IEnergyAdditionalTypeCLIConf } from "../interfaces/energy-cli-conf.interface";

export const DefaultItemTypes: IEnergyAdditionalTypeCLIConf[] = [
    {
        name: 'dto',
        plural: 'dtos',
        itemType: ItemTypes.dto
    },
    {
        name: 'enum',
        plural: 'enums',
        itemType: ItemTypes.enum
    },
    {
        name: 'model',
        plural: 'models',
        itemType: ItemTypes.model
    },
    {
        name: 'const',
        plural: 'consts',
        itemType: ItemTypes.const
    },
    {
        name: 'entity',
        plural: 'entities',
        itemType: ItemTypes.entity
    },
    {
        name: 'interface',
        plural: 'intefaces',
        itemType: ItemTypes.interface
    },
];
