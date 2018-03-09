"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NRG_EXCEPTIONS = {
    NotAEnergyProjectException: {
        name: 'NotAEnergyProjectException',
        message: () => {
            return `This is not a valid EnergyCLI project. Run nrg init to create a CLI conf file.`;
        }
    },
    ItemWriteToDiskException: {
        name: 'ItemWriteToDiskException',
        message: (err) => {
            return `There was an error when trying to create the item to disk: ${err}`;
        }
    },
    MissingItemTypeFlagException: {
        name: 'MissingItemTypeFlagException',
        message: () => {
            return `The generate command has to be ran with the item-type flag. See help --g for more information`;
        }
    },
    MissingItemNameException: {
        name: 'MissingItemNameException',
        message: (itemType) => {
            return `The filename for the ${itemType} item is missing`;
        }
    },
    InvalidItemTypeGenerationException: {
        name: 'InvalidItemTypeGenerationException',
        message: () => {
            return `The requested item-type does not exist in the default types, nor in the additional types.`;
        }
    }
};
//# sourceMappingURL=exceptions.conts.js.map