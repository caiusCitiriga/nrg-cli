import "rxjs/add/observable/zip";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';
export declare class EnergyCLI {
    private _parser;
    private _factory;
    private _dispatcher;
    private _helpCommand;
    private _generateCommand;
    private _dispatcherOptions;
    private _parentCtorInitialized;
    constructor();
    private getDispatcherOptions();
}
