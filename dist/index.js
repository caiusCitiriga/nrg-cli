#! /usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
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
