import { ItemTypes } from "../enums/item-types.enum";

export const DefaultItemTypes = {
    dto: {
        name: 'dto',
        plural: 'dtos',
        itemType: ItemTypes.dto
    },
    enum: {
        name: 'enum',
        plural: 'enums',
        itemType: ItemTypes.enum
    },
    model: {
        name: 'model',
        plural: 'models',
        itemType: ItemTypes.model
    },
    const: {
        name: 'const',
        plural: 'consts',
        itemType: ItemTypes.const
    },
    entity: {
        name: 'entity',
        plural: 'entities',
        itemType: ItemTypes.entity
    },
    interface: {
        name: 'interface',
        plural: 'intefaces',
        itemType: ItemTypes.interface
    },
};
