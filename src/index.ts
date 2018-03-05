#! /usr/bin/env node
import * as process from 'process';
import { SmartCLI } from 'smart-cli/dist';

import { TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';
import { ItemTypes } from './enums/item-types.enum';

import { IConfReader } from './interfaces/conf-reader.interface';

export class EnergyCLI {
    private _cli: SmartCLI;
    private _confReader: IConfReader;

    public constructor() {
        //  Initialization of stuff
        this._cli = new SmartCLI();
        this._confReader = IoCContainer.get<IConfReader>(TYPES.IConfReader);

        console.log(this._confReader.getSrcFolder());
        console.log(this._confReader.getAdditionalTypes());
        console.log(this._confReader.getDefaultFilesExt());

        //  Sets all the commands to SmartCLI
        this.setupCLI();
    }

    /**
     * Runs the CLI program passing the user args.
     * 
     * @memberof EnergyCLI
     */
    public runProgram(): void {
        this, this._cli.run(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString())
    }

    private setupCLI(): void {
        this._cli
            .addCommand({
                name: 'g',
                description: 'Generates a new item',
                flags: [
                    {
                        name: 'dto',
                        description: 'DTO',
                        options: []
                    },
                    {
                        name: 'enum',
                        description: 'Enum',
                        options: []
                    },
                    {
                        name: 'model',
                        description: 'Model',
                        options: []
                    },
                    {
                        name: 'const',
                        description: 'Constant',
                        options: []
                    },
                    {
                        name: 'entity',
                        description: 'Entity',
                        options: []
                    },
                    {
                        name: 'int',
                        description: 'Interface',
                        options: []
                    }
                ],
                action: (flags) => {
                    const itemType = flags[0].name;
                    const itemFileName = flags[0].options[0].value;
                    const itemFileExtension = 'ts';
                }
            });
    }
}

new EnergyCLI()
    .runProgram();