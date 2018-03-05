import { TYPES } from "./consts/types.const";
import { IoCContainer } from "./inversify.config";
import { IEnergy } from "./interfaces/energy.interface";

IoCContainer
    .get<IEnergy>(TYPES.IEnergy)
    .runProgram();