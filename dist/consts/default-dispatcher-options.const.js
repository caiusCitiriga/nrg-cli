"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.DEFAULT_DISPATCHER_OPTS = {
    assignCallbackToCommand: (command, callback) => {
        exports.DEFAULT_DISPATCHER_OPTS.options.find(opt => opt.command === command).action = callback;
    },
    options: [
        {
            command: 'init',
            desc: '\nInitializes a new project inside the current folder\n',
            flags: [],
            aliases: ['i'],
            action: null,
        },
        {
            command: 'set',
            desc: '\nSets a preference in the CLI configuration\n' +
                `${chalk_1.default.dim('Type ') + chalk_1.default.white.italic('nrg help --set') + chalk_1.default.dim(' to see the full flags list')}\n`,
            flags: [
                {
                    flag: 'gitignore',
                    desc: `Sets the list of entries in the .gitignore file. Use a separated entries list.`
                },
                {
                    flag: 'gitignore-add',
                    desc: 'Pushes a new item in the current .gitignore items list'
                }
            ],
            aliases: [''],
            action: null,
        },
        {
            command: 'new',
            desc: '\nGenerates a new Energy project\n',
            flags: [],
            aliases: ['n'],
            action: null,
        },
        {
            command: 'generate',
            desc: '\nGenerates a new item.\n' +
                ' - The respective file will be namespaced by a [.item-type.extension] notation.\n' +
                ' - Also, the item-type will match a specific folder inside your source folder.\n' +
                ' - If the folder does not exists, it will be created.\n' +
                ' - During the process, Energy will try to guess the extension, if provided.\n' +
                ' - If the guess fails, you will be prompted for the extension. Type it, with no dots.\n\n' +
                `${chalk_1.default.dim('NOTE: This command can be run without any flags. The flags are meant for a quicker usage, skipping the prompts.\nType ') + chalk_1.default.white.italic('nrg help --generate') + chalk_1.default.dim(' to see the full flags list')}\n`,
            flags: [
                {
                    flag: 'dto',
                    desc: 'DTO shorthand'
                },
                {
                    flag: 'core',
                    desc: 'CORE shorthand'
                },
                {
                    flag: 'enum',
                    desc: 'ENUM shorthand'
                },
                {
                    flag: 'const',
                    desc: 'CONST shorthand'
                },
                {
                    flag: 'entity',
                    desc: 'ENTITY shorthand'
                },
                {
                    flag: 'service',
                    desc: 'SERVICE shorthand'
                },
                {
                    flag: 'interface',
                    desc: 'INTERFACE shorthand'
                }
            ],
            aliases: ['g'],
            action: null,
        },
        {
            command: 'help',
            desc: '\nShows the help for each command.\n' +
                `${chalk_1.default.dim('Type ') + chalk_1.default.white.italic('nrg help --command-name') + chalk_1.default.dim(' to see the details for that command')}\n`,
            flags: [
                {
                    flag: 'new',
                    desc: 'Shows flags and detailed info about the NEW command'
                },
                {
                    flag: 'generate',
                    desc: 'Shows flags and detailed info about the GENERATE command'
                }
            ],
            aliases: ['h'],
            action: null
        }
    ]
};
//# sourceMappingURL=default-dispatcher-options.const.js.map