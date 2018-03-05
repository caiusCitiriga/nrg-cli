import { Observable } from 'rxjs/Observable';

import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';

export interface ICommandRunner {
    run(flags: IFlag[]): Observable<boolean>;
}
