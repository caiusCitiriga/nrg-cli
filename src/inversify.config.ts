
import { Container } from 'inversify';

import { TYPES } from './consts/types.const';
import { NAMED_TYPES } from './consts/types.const';
import { NRGException } from './entities/nrg-exception.entity';

import { IEnergy } from './interfaces/energy.interface';
import { IConfReader } from './interfaces/conf-reader.interface';
import { IConfWriter } from './interfaces/conf-writer.interface';
import { INrgException } from './interfaces/nrg-exception.interface';
import { ICommandRunner } from './interfaces/command-runner.interface';

import { EnergyCLI } from './nrg';
import { ConfReader } from './entities/conf-reader.entity';
import { ConfWriter } from './entities/conf-writer.entity';
import { InitCommand } from './entities/init-command.entity';
import { ScaffoldCommand } from './entities/scaffold-command.entity';
import { GenerateCommand } from './entities/generate-command.entity';

const IoCContainer = new Container();
IoCContainer.bind<IEnergy>(TYPES.IEnergy).to(EnergyCLI);
IoCContainer.bind<IConfReader>(TYPES.IConfReader).to(ConfReader);
IoCContainer.bind<IConfWriter>(TYPES.IConfWriter).to(ConfWriter);
IoCContainer.bind<INrgException>(TYPES.INrgException).to(NRGException);

//  Command runners
IoCContainer.bind<ICommandRunner>(TYPES.ICommandRunner).to(InitCommand).whenTargetNamed(NAMED_TYPES.InitCommand);
IoCContainer.bind<ICommandRunner>(TYPES.ICommandRunner).to(ScaffoldCommand).whenTargetNamed(NAMED_TYPES.ScaffoldCommand);
IoCContainer.bind<ICommandRunner>(TYPES.ICommandRunner).to(GenerateCommand).whenTargetNamed(NAMED_TYPES.GenerateCommand);

export { IoCContainer };