"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORE_COMMANDS = {
    help: {
        command: 'help',
        flags: null,
        aliases: ['h']
    },
    set: {
        command: 'set',
        flags: {
            gitignore: {
                value: 'gitignore',
            },
            gitignoreAdd: {
                value: 'gitignore-add'
            }
        },
        aliases: []
    },
    new: {
        command: 'new',
        flags: null,
        aliases: ['n']
    },
    init: {
        command: 'init',
        flags: null,
        aliases: ['i']
    },
    generate: {
        command: 'generate',
        aliases: ['g'],
        flags: {
            dto: {
                value: 'dto'
            },
            core: {
                value: 'core'
            },
            enum: {
                value: 'enum'
            },
            const: {
                value: 'const'
            },
            entity: {
                value: 'entity'
            },
            service: {
                value: 'service'
            },
            interface: {
                value: 'interface'
            },
        }
    },
};
//# sourceMappingURL=core-commands.const.js.map