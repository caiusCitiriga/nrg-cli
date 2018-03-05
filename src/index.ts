import "rxjs/add/observable/of";
import { TYPES } from "./consts/types.const";
import { IoCContainer } from "./inversify.config";
import { IEnergy } from "./interfaces/energy.interface";

const NRG = IoCContainer.get<IEnergy>(TYPES.IEnergy);
NRG.runProgram();