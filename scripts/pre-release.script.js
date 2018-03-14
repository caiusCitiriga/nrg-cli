const fs = require('fs');
const rimraf = require('rimraf');
const { exec } = require('child_process');
const { BehaviorSubject } = require('rxjs/BehaviorSubject');
const SmartCLI = require('smart-cli/dist/index').SmartCLI;

const cli = new SmartCLI();
const newVersion = {
    name: null,
    number: null,
};

function askReleaseVersion() {
    cli.UI.input.askUserInput({
        question: 'New version number: \n> ',
        callback: answer => {
            newVersion.number = answer;
            askReleaseName();
        }
    });
}

function askReleaseName() {
    cli.UI.input.askUserInput({
        question: 'New version name: \n> ',
        callback: answer => {
            newVersion.name = answer;
            askConfirm();
        }
    });
}

function askConfirm() {
    console.log();
    cli.UI.out.printTitle('New version information')
    cli.UI.out.printKeyValues({
        set: [
            {
                k: 'Version number',
                v: newVersion.number
            },
            {
                k: 'Version name',
                v: newVersion.name
            },
        ]
    });
    cli.UI.input.askUserInput({
        question: 'Do you confirm the information? \n> ',
        callback: (answer) => {
            if (answer.toLowerCase() === 'y') {
                askLastConfirm();
                return;
            }
            if (answer.toLowerCase() === 'n') {
                abort();
                return;
            }

            console.log();
            askConfirm();
        }
    });
}

function askLastConfirm() {
    console.log();
    cli.UI.out.printWarning('Your\'e about to publish a new release to NPM. Are you sure about this? You cannot go back from this point.\n');

    setTimeout(() => {

    }, 1500);
    cli.UI.input.askUserInput({
        question: '> ',
        callback: (answer) => {
            if (answer.toLowerCase() === 'y') {
                publish();
                return;
            }

            if (answer.toLowerCase() === 'n') {
                abort();
                return;
            }

            askLastConfirm();
        }
    });
}

function publish() {
    const package = JSON.parse(fs.readFileSync('./package.json').toString());
    package.version = newVersion.number;
    fs.writeFileSync('./package.json', JSON.stringify(package), { encoding: 'utf-8' });
    cli.UI.out.printInfo('Package version updated successfully');

    const infoFile = JSON.parse(fs.readFileSync('./src/config/package.info.json').toString());
    infoFile.name = newVersion.name;
    infoFile.version = newVersion.number;
    fs.writeFileSync('./src/config/package.info.json', JSON.stringify(infoFile), { encoding: 'utf-8' });
    cli.UI.out.printInfo('CLI info version updated successfully');

    rimraf('./dist', err => {
        if (!!err) {
            cli.UI.out.printError(err.message);
            abort();
            return;
        }
    });

    cli.UI.out.printInfo('Removed old dist folder successfully');
    cli.UI.out.printInfo('Rebuilding package...');
    let buildEnded = new BehaviorSubject(false);
    exec('npm run build', (err, stdout, stderr) => {
        if (!!err) {
            cli.UI.out.printError(err.message);
            abort();
            buildEnded.next(true);
            return;
        };

        if (!stderr) {
            cli.UI.out.printInfo('Rebuilded package successfully');
            fs.copyFileSync('./src/config/package.info.json', './dist/config/package.info.json');
            fs.copyFileSync('./src/config/energy.cli.default.json', './dist/config/energy.cli.default.json');
            cli.UI.out.printInfo('Copied JSON config files into dist successfully');
            buildEnded.next(true);
            return;
        } else {
            cli.UI.out.printError(stderr);
            abort();
            buildEnded.next(true);
            return;
        }
    });

    let testsEnded = new BehaviorSubject(false);
    let startTests = new BehaviorSubject(false);
    const sub = buildEnded
        .subscribe(res => {
            if (!res) {
                return;
            }
            startTests.next(true);
        });

    const startTestsSub = startTests
        .subscribe(res => {
            if (!res) { return; }
            cli.UI.out.printInfo('Running tests...');
            exec('npm run test', (err, stdout, stderr) => {
                if (!!err) {
                    cli.UI.out.printError(err.message);
                    abort();
                    testsEnded.next(true);
                    return;
                };

                if (!stderr) {
                    cli.UI.out.printInfo('All tests passed');
                    testsEnded.next(true);
                    return;
                } else {
                    cli.UI.out.printError(stderr);
                    abort();
                    testsEnded.next(true);
                    return;
                }
            });
        });


    const tsub = testsEnded
        .subscribe(res => {
            if (!res) {
                return;
            }

            console.log();
            cli.UI.out.printInfo('PRE-RELEASE PROCESS COMPLETED SUCCESSFULLY!\n');

            sub.unsubscribe();
            tsub.unsubscribe();
            startTestsSub.unsubscribe();
        });

}

function abort() {
    console.log();
    cli.UI.out.printWarning('Pre-Release process aborted\n');
}

//  Start
cli.UI.out.printBoxTitle('Pre-Release process started');
askReleaseVersion();
