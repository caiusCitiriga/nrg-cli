import { IEnergyCLIConf } from '../interfaces/energy-cli-conf.interface';

export const CLI_DEFAULTS: IEnergyCLIConf = {
    $schema: 'https://raw.githubusercontent.com/caiusCitiriga/nrg-cli/ddf66c06fe8a2b5a0e3aeb3da8574ff919f0847a/src/config/cli-conf.schema.json',
    srcFolder: 'src',
    defaultExt: 'ts',
    additionalTypes: [],
    customFileTemplates: [],
    dotnetInterfaceStyle: false,
}
