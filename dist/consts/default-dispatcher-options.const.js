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
            desc: 'Initializes a new AngularX project inside the current folder',
            flags: [],
            aliases: ['i'],
            action: null,
        },
        {
            command: 'new',
            desc: 'Generates a new AngularX project',
            flags: [],
            aliases: ['n'],
            action: null,
        },
        {
            command: 'generate',
            desc: '\nGenerates a new item.\n\n' +
                ' - The respective file will be namespaced by a [.item-type.extension] notation.\n' +
                ' - Also, the item-type will match a specific folder inside your source folder.\n' +
                ' - If the folder does not exists, it will be created.\n' +
                ' - During the process, Energy will try to guess the extension, if provided.\n' +
                ' - If the guess fails, you will be prompted for the extension. Type it, with no dots.\n\n' +
                `${chalk_1.default.yellow('NOTE: This command can be run without any flags. The flags are meant for a quicker usage, skipping the prompts.')}`,
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
            desc: 'Shows the help for each command. Type help [-command] to see details',
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