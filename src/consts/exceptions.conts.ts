export const NRG_EXCEPTIONS = {
    NotAEnergyProjectException: {
        name: 'NotAEnergyProjectException',
        message: () => {
            return `This is not a valid EnergyCLI project. Run nrg init to create a CLI conf file.`;
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
        message: (itemType: string) => {
            return `The filename for the ${itemType} item is missing`;
        }
    },
    InvalidItemTypeGenerationException: {
        name: 'InvalidItemTypeGenerationException',
        message: () => {
            return `The requested item-type does not exist in the default types, nor in the additional types. Did you add it to the additionalTypes array?`;
        }
    }
}