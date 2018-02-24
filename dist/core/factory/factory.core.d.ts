import { Observable } from "rxjs/Observable";
import { AvailableInstances } from "../../enums/available-instances.enum";
import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
export declare class Factory {
    private _instances;
    private _instancesInitialized;
    private _dispatcherOptions;
    private _parentCtorInitialized;
    constructor(dispatcherOpts: DispatcherOptions[], parentCtorInitialized: Observable<boolean>);
    getInstance<T>(instance: AvailableInstances, newInstance?: boolean): T;
    private getInstances();
}
