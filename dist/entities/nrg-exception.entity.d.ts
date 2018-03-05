import { INrgException } from "../interfaces/nrg-exception.interface";
import { INrgExceptionOpts } from "../interfaces/nrg-exception-opts.interface";
export declare class NRGException implements INrgException {
    get(opts: INrgExceptionOpts): Error;
    throw(opts: INrgExceptionOpts): void;
}
