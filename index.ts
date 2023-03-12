import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';

const terminal = document.querySelector<HTMLDivElement>("#terminal")!;

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(terminal);
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
fitAddon.fit();