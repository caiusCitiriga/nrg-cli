import 'rxjs/add/operator/filter';
import { IConfReader } from "../interfaces/conf-reader.interface";
import { IAdditionalType } from '../interfaces/additional-type.interface';
import { ICustomFileTemplate } from '../interfaces/custom-file-template.interface';
export declare class MockConfReader implements IConfReader {
    private additionalTypes;
    private customFileTemplates;
    private useDotnetInterfaces;
    private defaultFilesExtension;
    private defaultProjectStructure;
    private srcFolder;
    setSrcFolder(val: string): void;
    setAdditionalTypes(val: IAdditionalType[]): void;
    setDefaultFilesExtension(val: string): void;
    setUseDotnetInterfaceStyle(val: boolean): void;
    setCustomFileTemplates(val: ICustomFileTemplate[]): void;
    setDefaultProjectStructure(val: any): void;
    getSrcFolder(): string;
    getDefaultFilesExt(): string;
    getAdditionalTypes(): IAdditionalType[];
    getCustomFileTemplates(): ICustomFileTemplate[];
    useDotnetInterfaceStyle(): boolean;
    getDefaultProjectStructure(): any;
}
