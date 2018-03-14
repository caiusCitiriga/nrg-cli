import { IEnergyCLIConf } from '../interfaces/energy-cli-conf.interface';

export const CLI_CONF_FILENAME = '.energy.cli.json';

export const CLI_DEFAULTS: IEnergyCLIConf = {
    $schema: 'https://raw.githubusercontent.com/caiusCitiriga/nrg-cli/38bd13fb9fd8054793460851cf4b8c75635c3779/src/config/cli-conf.schema.json',
    srcFolder: 'src',
    defaultExt: 'ts',
    additionalTypes: [],
    customFileTemplates: [],
    dotnetInterfaceStyle: false,
    defaultProjectStructure: {
        "default": {
            "folder-one": {
                "deep-one": null,
                "deep-two": {
                    "deep-deep-one": null,
                    "deep-deep-two": null
                }
            },
            "folder-two": {
                "deep-one": null,
                "deep-two": null,
                "deep-three": null
            },
            "interfaces": null,
            "dtos": null,
            "enums": null,
            "customs": null,
            "models": null,
            "entities": {
                "plain": null,
                "complex": null
            }
        }
    }
}
