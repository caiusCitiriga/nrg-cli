export const TYPES = {
    IEnergy: Symbol.for('IEnergy'),
    IConfReader: Symbol.for('IConfReader'),
    IConfWriter: Symbol.for('IConfWriter'),
    INrgException: Symbol.for('INrgException'),
    ICommandRunner: Symbol.for('ICommandRunner'),
};

export const NAMED_TYPES = {
    InitCommand: 'InitCommand',
    ScaffoldCommand: 'ScaffoldCommand',
    GenerateCommand: 'GenerateCommand',
};
