import chalk, { Chalk } from 'chalk';
import { SmartCLI } from "smart-cli/dist";
import { CommandFlag } from "../interfaces/command-flag.interface";
import { DispatcherOptions } from "../interfaces/dispatcher-options.interface";

export const DEFAULT_DISPATCHER_OPTS: {
    assignCallbackToCommand: (command: string, callback: (flags: CommandFlag[]) => void) => void,
    options: DispatcherOptions[]
} = {
        assignCallbackToCommand: (command: string, callback: (flags: CommandFlag[]) => void) => {
            (DEFAULT_DISPATCHER_OPTS.options.find(opt => opt.command === command) as DispatcherOptions).action = callback;
        },

        options: [
            {
                command: 'init',
                desc: 'Initializes a new AngularX project inside the current folder',
                flags: [],
                aliases: ['i'],
                action: null as any,
            },
            {
                command: 'new',
                desc: 'Generates a new AngularX project',
                flags: [],
                aliases: ['n'],
                action: null as any,
            },
            {
                command: 'generate',
                desc: '\nGenerates a new item.\n\n' +
                    ' - The respective file will be namespaced by a [.item-type.extension] notation.\n' +
                    ' - Also, the item-type will match a specific folder inside your source folder.\n' +
                    ' - If the folder does not exists, it will be created.\n' +
                    ' - During the process, Energy will try to guess the extension, if provided.\n' +
                    ' - If the guess fails, you will be prompted for the extension. Type it, with no dots.\n\n' +
                    `${chalk.yellow('NOTE: This command can be run without any flags. The flags are meant for a quicker usage, skipping the prompts.')}`,
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
                action: null as any,
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
                    }],
                aliases: ['h'],
                action: null as any
            }
        ]
    };