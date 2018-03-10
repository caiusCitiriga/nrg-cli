
import { IAdditionalType } from './additional-type.interface';
import { ICustomFileTemplate } from './custom-file-template.interface';

export interface IConfReader {
    getSrcFolder(): string;
    getDefaultFilesExt(): string;
    getAdditionalTypes(): IAdditionalType[];
    getCustomFileTemplates(): ICustomFileTemplate[];
    useDotnetInterfaceStyle(): boolean;
}
