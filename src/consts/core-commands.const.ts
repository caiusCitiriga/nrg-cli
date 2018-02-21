export const CORE_COMMANDS = {
    help: {
        command: 'help',
        flags: null,
        aliases: ['h']
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
            c: {
                value: 'c'
            },
            s: {
                value: 's'
            },
            p: {
                value: 'p'
            },
            g: {
                value: 'g'
            },
            m: {
                value: 'm'
            },
            d: {
                value: 'd'
            },
            item: {
                value: 'item'
            },
        }
    },
}
