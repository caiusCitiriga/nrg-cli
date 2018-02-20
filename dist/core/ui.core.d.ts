import "rxjs/add/observable/of";
export declare class UI {
    static printKeyValuePairs(set: {
        key: string;
        value: string;
    }[], space_char?: string): void;
    static askUserInput(question: string, callback?: (data: any) => void, surroundInNewLines?: boolean): void;
    static print(string: string, surroundInNewlines?: boolean): void;
    static success(string: string, surroundInNewlines?: boolean): void;
    static warn(string: string, surroundInNewlines?: boolean): void;
    static error(string: string, surroundInNewlines?: boolean): void;
    static printTableExperimental(maxLen: number, currLen: number): string;
}
