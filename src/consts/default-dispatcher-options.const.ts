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
                desc: '\nInitializes a new project inside the current folder\n',
                flags: [],
                aliases: ['i'],
                action: null as any,
            },
            {
                command: 'set',
                desc: '\nSets a preference in the CLI configuration\n' +
                    `${chalk.dim('Type ') + chalk.white.italic('nrg help --set') + chalk.dim(' to see the full flags list')}\n`,
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
                action: null as any,
            },
            {
                command: 'new',
                desc: '\nGenerates a new Energy project\n',
                flags: [],
                aliases: ['n'],
                action: null as any,
            },
            {
                command: 'generate',
                desc: '\nGenerates a new item.\n' +
                    ' - The respective file will be namespaced by a [.item-type.extension] notation.\n' +
                    ' - Also, the item-type will match a specific folder inside your source folder.\n' +
                    ' - If the folder does not exists, it will be created.\n' +
                    ' - During the process, Energy will try to guess the extension, if provided.\n' +
                    ' - If the guess fails, you will be prompted for the extension. Type it, with no dots.\n\n' +
                    `${chalk.dim('NOTE: This command can be run without any flags. The flags are meant for a quicker usage, skipping the prompts.\nType ') + chalk.white.italic('nrg help --generate') + chalk.dim(' to see the full flags list')}\n`,
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
                desc: '\nShows the help for each command.\n' +
                    `${chalk.dim('Type ') + chalk.white.italic('nrg help --command-name') + chalk.dim(' to see the details for that command')}\n`,
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