#! /usr/bin/env node
import 'rxjs/add/observable/of';
import { TYPES } from './consts/types.const';
import { IoCContainer } from './inversify.config';
import { IEnergy } from './interfaces/energy.interface';

import * as SCLIEXEPTIONS from 'smart-cli/dist/consts/exceptions.conts'

const NRG = IoCContainer.get<IEnergy>(TYPES.IEnergy);
try {
    NRG.runProgram(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
} catch (e) {
    const ERROR: Error = e;
    if (ERROR.name === SCLIEXEPTIONS.NRG_EXCEPTIONS.NoMatchingCommandException.name) {
        NRG.runProgram('help');
    }
}