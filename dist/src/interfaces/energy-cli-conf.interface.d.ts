import { IAdditionalType } from './additional-type.interface';
import { ICustomFileTemplate } from './custom-file-template.interface';
export interface IEnergyCLIConf {
    $schema: string;
    srcFolder: string;
    defaultExt: string;
    dotnetInterfaceStyle: boolean;
    additionalTypes: IAdditionalType[];
    customFileTemplates: ICustomFileTemplate[];
}
