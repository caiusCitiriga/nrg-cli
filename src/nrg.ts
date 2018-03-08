import 'reflect-metadata';
import 'rxjs/add/operator/filter';
import * as process from 'process';
import { injectable, inject, named } from 'inversify';

import { SmartCLI } from 'smart-cli/dist';
import { IoCContainer } from './inversify.config';
import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';

import { ItemTypes } from './enums/item-types.enum';
import { TYPES, NAMED_TYPES } from './consts/types.const';

import { IEnergy } from './interfaces/energy.interface';
import { IConfReader } from './interfaces/conf-reader.interface';
import { ICommandRunner } from './interfaces/command-runner.interface';
import { Subscription } from 'rxjs/Subscription';

@injectable()
export class EnergyCLI implements IEnergy {
    private _cli: SmartCLI;
    private _initComand: ICommandRunner;
    private _generateComand: ICommandRunner;

    public constructor(
        @inject(TYPES.ICommandRunner)
        @named(NAMED_TYPES.GenerateCommand)
        generateComand: ICommandRunner,

        @inject(TYPES.ICommandRunner)
        @named(NAMED_TYPES.InitCommand)
        initComand: ICommandRunner,
    ) {
        //  Initialization of stuff
        this._cli = new SmartCLI();
        this._initComand = initComand;
        this._generateComand = generateComand;

        // Sets all the commands to SmartCLI
        this.setupCLI();
    }

    /**
     * Runs the program with the given args
     * 
     * @param {string} args 
     * @memberof EnergyCLI
     */
    public runProgram(args: string): void {
        this._cli.run(args);
    }

    private setupCLI(): void {
        this._cli
            .addCommand({
                flags: [],
                name: 'init',
                description: 'Initializes a Energy project inside the current folder',
                action: (flags: IFlag[]) => {
                    const sub: Subscription =
                        this._initComand
                            .run(flags)
                            .subscribe(res => {
                                this._cli.UI.out.printInfo('energy.cli.json file successfully generated');
                                return sub.unsubscribe();
                            });
                }
            })
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
                    const sub: Subscription =
                        this._generateComand
                            .run(flags)
                            .filter(res => !!res)
                            .subscribe(res => {
                                this._cli.UI.out.printInfo('Item generated successfully!')
                                return sub.unsubscribe();
                            });
                }
            })
    }
}
