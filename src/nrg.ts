#! /usr/bin/env node
import 'reflect-metadata';
import 'rxjs/add/operator/filter';
import * as process from 'process';
import { injectable, inject, named } from 'inversify';

import { SmartCLI } from 'smart-cli/dist';
import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';

import { TYPES, NAMED_TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';
import { ItemTypes } from './enums/item-types.enum';

import { IEnergy } from './interfaces/energy.interface';
import { IConfReader } from './interfaces/conf-reader.interface';
import { ICommandRunner } from './interfaces/command-runner.interface';

@injectable()
export class EnergyCLI implements IEnergy {
    private _cli: SmartCLI;
    private _generateComand: ICommandRunner;

    public constructor(
        @inject(TYPES.ICommandRunner)
        @named(NAMED_TYPES.GenerateCommand)
        generateComand: ICommandRunner
    ) {
        //  Initialization of stuff
        this._cli = new SmartCLI();
        this._generateComand = generateComand;

        // Sets all the commands to SmartCLI
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
                action: (flags: IFlag[]) => {
                    this._generateComand
                        .run(flags)
                        .filter(res => !!res)
                        .subscribe(res => this._cli.UI.out.printInfo('Item generated successfully!'));
                }
            });
    }
}
