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
                desc: 'Generates a new item',
                flags: [
                    {
                        flag: 'c',
                        desc: 'Angular CLI wrap for component'
                    },
                    {
                        flag: 's',
                        desc: 'Angular CLI wrap for service'
                    },
                    {
                        flag: 'p',
                        desc: 'Angular CLI wrap for pipe'
                    },
                    {
                        flag: 'g',
                        desc: 'Angular CLI wrap for guard'
                    },
                    {
                        flag: 'm',
                        desc: 'Angular CLI wrap for module'
                    },
                    {
                        flag: 'd',
                        desc: 'Angular CLI wrap for directive'
                    },
                    {
                        flag: 'item',
                        desc: 'Creates a new project item.'
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