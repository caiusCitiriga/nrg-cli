"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_types_enum_1 = require("../enums/item-types.enum");
exports.DefaultItemTypes = [
    {
        name: 'dto',
        plural: 'dtos',
        itemType: item_types_enum_1.ItemTypes.dto
    },
    {
        name: 'enum',
        plural: 'enums',
        itemType: item_types_enum_1.ItemTypes.enum
    },
    {
        name: 'model',
        plural: 'models',
        itemType: item_types_enum_1.ItemTypes.model
    },
    {
        name: 'const',
        plural: 'consts',
        itemType: item_types_enum_1.ItemTypes.const
    },
    {
        name: 'entity',
        plural: 'entities',
        itemType: item_types_enum_1.ItemTypes.entity
    },
    {
        name: 'interface',
        plural: 'interfaces',
        itemType: item_types_enum_1.ItemTypes.interface
    },
];
//# sourceMappingURL=default-types.config.js.map