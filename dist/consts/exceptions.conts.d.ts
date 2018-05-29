export declare const NRG_EXCEPTIONS: {
    NotAEnergyProjectException: {
        name: string;
        message: () => string;
    };
    ItemWriteToDiskException: {
        name: string;
        message: (err: string) => string;
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
    NoValidFileTemplateForThisItemException: {
        name: string;
        message: (itemName: string) => string;
    };
    InvalidRootFolderForScaffoldException: {
        name: string;
        message: (rootFolder: string) => string;
    };
};
