
import { Container } from "inversify";

import { TYPES } from "./consts/types.const";

import { IConfReader } from "./interfaces/conf-reader.interface";

import { ConfReader } from "./entities/conf-reader.entity";


const IoCContainer = new Container();
IoCContainer.bind<IConfReader>(TYPES.IConfReader).to(ConfReader);

export { IoCContainer };