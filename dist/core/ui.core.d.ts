import "rxjs/add/observable/of";
export declare class UI {
    static askUserInput(question: string, callback?: (data: string) => void, surroundInNewLines?: boolean): void;
    static clear(): void;
    static print(string: string, surroundInNewlines?: boolean): void;
    static throw(message: string, callback: any, clearTime?: number): void;
    static success(string: string, surroundInNewlines?: boolean): void;
    static warn(string: string, surroundInNewlines?: boolean): void;
    static info(string: string, surroundInNewlines?: boolean): void;
    static error(string: string, surroundInNewlines?: boolean): void;
    static printTableExperimental(maxLen: number, currLen: number): string;
}
