import { AvailableItemTypes } from "../enums/available-item-types.enum";

export interface ItemToGenerateOptions {
    filename: string;
    extension: string;
    className: string;
    type: AvailableItemTypes;
    relativePathFromSrc: string;
}
