import { INrgExceptionOpts } from "./nrg-exception-opts.interface";
export interface INrgException {
    get(opts: INrgExceptionOpts): Error;
    throw(opts: INrgExceptionOpts): void;
}
