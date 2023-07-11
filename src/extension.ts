import * as vscode from 'vscode';
import { erroring, showConnString, showDb } from './workloads';

export function activate(context: vscode.ExtensionContext) {

	let errWork = vscode.commands.registerCommand('connstringgen.showErr', erroring);
	let showDbs = vscode.commands.registerCommand('connstringgen.showDb', showDb);
	let showConn = vscode.commands.registerCommand('connstringgen.showConn', showConnString);

	context.subscriptions.push(errWork);
	context.subscriptions.push(showDbs);
	context.subscriptions.push(showConn);
}

export function deactivate() { }
