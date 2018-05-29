"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI_CONF_FILENAME = '.energy.cli.json';
exports.CLI_DEFAULTS = {
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
};
//# sourceMappingURL=cli-defaults.config.js.map