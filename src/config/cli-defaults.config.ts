import { IEnergyCLIConf } from '../interfaces/energy-cli-conf.interface';

export const CLI_CONF_FILENAME = '.energy.cli.json';

export const CLI_DEFAULTS: IEnergyCLIConf = {
    $schema: 'https://raw.githubusercontent.com/caiusCitiriga/nrg-cli/4324ea9ef7c8e2a3d2a4cab75f6d74b13298d4c0/src/config/cli-conf.schema.json',
    srcFolder: 'src',
    defaultExt: 'ts',
    additionalTypes: [],
    customFileTemplates: [],
    dotnetInterfaceStyle: false,
}
