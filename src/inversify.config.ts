
import { Container } from "inversify";

import { TYPES, NAMED_TYPES } from "./consts/types.const";

import { IEnergy } from "./interfaces/energy.interface";
import { IConfReader } from "./interfaces/conf-reader.interface";
import { INrgException } from "./interfaces/nrg-exception.interface";
import { ICommandRunner } from "./interfaces/command-runner.interface";

import { EnergyCLI } from "./nrg";
import { ConfReader } from "./entities/conf-reader.entity";
import { NRGException } from "./entities/nrg-exception.entity";
import { GenerateCommand } from "./entities/generate-command.entity";


const IoCContainer = new Container();
IoCContainer.bind<IEnergy>(TYPES.IEnergy).to(EnergyCLI);
IoCContainer.bind<IConfReader>(TYPES.IConfReader).to(ConfReader);
IoCContainer.bind<INrgException>(TYPES.INrgException).to(NRGException);
IoCContainer.bind<ICommandRunner>(TYPES.ICommandRunner).to(GenerateCommand).whenTargetNamed(NAMED_TYPES.GenerateCommand);

export { IoCContainer };