#! /usr/bin/env node
import 'rxjs/add/observable/of';
import { SmartCLI } from 'smart-cli/dist';
import * as SCLIEXEPTIONS from 'smart-cli/dist/consts/exceptions.conts'
import { IUserInterface } from 'smart-cli/dist/interfaces/plain/user-interface.interface';

import { TYPES } from './consts/types.const';
import { NRG_EXCEPTIONS } from './consts/exceptions.conts';

import { IEnergy } from './interfaces/energy.interface';
import { IoCContainer } from './inversify.config';

const NRG = IoCContainer.get<IEnergy>(TYPES.IEnergy);
try {
    NRG.runProgram(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
} catch (e) {
    const ERROR: Error = e;
    let warnWasThrown = false;
    const UI: IUserInterface = ((NRG as any)._cli as SmartCLI).UI;

    if (ERROR.name === SCLIEXEPTIONS.NRG_EXCEPTIONS.NoMatchingCommandException.name) {
        warnWasThrown = true;
        NRG.runProgram('help');
    }

    if (ERROR.name === NRG_EXCEPTIONS.MissingItemTypeFlagException.name) {
        warnWasThrown = true;
        console.log();
        UI.out.printWarning(`${e.message}\n`);
    }

    if (!warnWasThrown) {
        console.log();
        UI.out.printError(`${e.name}\nMESSAGE: ${e.message}\n`);
    }
}