import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import { gluesql } from 'gluesql/gluesql.rollup';
import chalk from 'chalk';

const db = await gluesql();
const terminal = document.querySelector<HTMLDivElement>("#terminal")!;
const term = new Terminal();

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(terminal);
fitAddon.fit();

let command = '';

chalk.level = 3;

function prompt() {
    term.write('\n\r');
    term.write(chalk.greenBright('gluesql> '));
}

async function runCommand() {
    let result: any
    try {
        result = await db.query(command);
        term.write(JSON.stringify(result));
    } catch (e) {
        result = e;
        console.error(e);
        term.write(
            chalk.redBright(result.toString().replaceAll('\n', '\n\r'))
        );
    }
    command = '';
}

term.onKey(async e => {
    term.write(e.key);
    if (e.key == '\r') {
        term.write('\n\r');
        await runCommand();
        prompt();
    } else if (e.key == '\u0003') {
        prompt();
    } else if (e.key == '\u007F') {
        prompt();
    } else {
        command += e.key;
    }
})

prompt();
