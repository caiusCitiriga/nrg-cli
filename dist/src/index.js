#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/filter");
class EnergyCLI {
    constructor() {
        this.args = [];
    }
    start() {
        this.cleanupArgs();
        if (this.args.length) {
            this.dispatch();
            return;
        }
    }
    dispatch() {
        console.log(this.args[0]);
    }
    cleanupArgs() {
        this.args = process.argv;
        this.args.shift();
        this.args.shift();
    }
}
exports.EnergyCLI = EnergyCLI;
const NRG = new EnergyCLI();
NRG.start();
