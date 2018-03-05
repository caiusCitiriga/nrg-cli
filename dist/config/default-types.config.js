"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_types_enum_1 = require("../enums/item-types.enum");
exports.DefaultItemTypes = {
    dto: {
        name: 'dto',
        plural: 'dtos',
        itemType: item_types_enum_1.ItemTypes.dto
    },
    enum: {
        name: 'enum',
        plural: 'enums',
        itemType: item_types_enum_1.ItemTypes.enum
    },
    model: {
        name: 'model',
        plural: 'models',
        itemType: item_types_enum_1.ItemTypes.model
    },
    const: {
        name: 'const',
        plural: 'consts',
        itemType: item_types_enum_1.ItemTypes.const
    },
    entity: {
        name: 'entity',
        plural: 'entities',
        itemType: item_types_enum_1.ItemTypes.entity
    },
    interface: {
        name: 'interface',
        plural: 'intefaces',
        itemType: item_types_enum_1.ItemTypes.interface
    },
};
//# sourceMappingURL=default-types.config.js.map