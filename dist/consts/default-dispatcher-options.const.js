"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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