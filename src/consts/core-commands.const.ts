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
}
