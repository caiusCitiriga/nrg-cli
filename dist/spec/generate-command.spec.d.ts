import 'rxjs/add/operator/filter';
import { IConfReader } from "../interfaces/conf-reader.interface";
import { IEnergyAdditionalType } from "../interfaces/energy-cli-conf.interface";
export declare class MockConfReader implements IConfReader {
    private additionalTypes;
    private useDotnetInterfaces;
    private defaultFilesExtension;
    private srcFolder;
    setSrcFolder(val: string): void;
    setUseDotnetInterfaceStyle(val: boolean): void;
    setDefaultFilesExtension(val: string): void;
    setAdditionalTypes(val: IEnergyAdditionalType[]): void;
    getSrcFolder(): string;
    getDefaultFilesExt(): string;
    useDotnetInterfaceStyle(): boolean;
    getAdditionalTypes(): IEnergyAdditionalType[];
}
