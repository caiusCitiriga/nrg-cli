export declare const NRG_EXCEPTIONS: {
    NotAEnergyProjectException: {
        name: string;
        message: () => string;
    };
    MissingItemTypeFlagException: {
        name: string;
        message: () => string;
    };
    MissingItemNameException: {
        name: string;
        message: (itemType: string) => string;
    };
    InvalidItemTypeGenerationException: {
        name: string;
        message: () => string;
    };
};
