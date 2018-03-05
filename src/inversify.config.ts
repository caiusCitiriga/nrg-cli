
import { Container } from "inversify";

import { TYPES } from "./consts/types.const";

import { IConfReader } from "./interfaces/conf-reader.interface";
import { INrgException } from "./interfaces/nrg-exception.interface";

import { ConfReader } from "./entities/conf-reader.entity";
import { NRGException } from "./entities/nrg-exception.entity";


const IoCContainer = new Container();
IoCContainer.bind<IConfReader>(TYPES.IConfReader).to(ConfReader);
IoCContainer.bind<INrgException>(TYPES.INrgException).to(NRGException);

export { IoCContainer };