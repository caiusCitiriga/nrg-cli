export declare const CORE_COMMANDS: {
    help: {
        command: string;
        flags: null;
        aliases: string[];
    };
    set: {
        command: string;
        flags: {
            gitignore: {
                value: string;
            };
            gitignoreAdd: {
                value: string;
            };
        };
        aliases: never[];
    };
    new: {
        command: string;
        flags: null;
        aliases: string[];
    };
    init: {
        command: string;
        flags: null;
        aliases: string[];
    };
    generate: {
        command: string;
        aliases: string[];
        flags: {
            dto: {
                value: string;
            };
            core: {
                value: string;
            };
            enum: {
                value: string;
            };
            const: {
                value: string;
            };
            entity: {
                value: string;
            };
            service: {
                value: string;
            };
            interface: {
                value: string;
            };
        };
    };
};
