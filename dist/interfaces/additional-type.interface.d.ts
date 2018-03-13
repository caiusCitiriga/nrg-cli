import { ItemTypes } from "../enums/item-types.enum";
export interface IAdditionalType {
    name: string;
    plural?: string;
    itemType?: ItemTypes;
}
