export interface CallbacksChain {
    nextCallback: number;
    callbacksChain: ((data: string) => void)[];
}
