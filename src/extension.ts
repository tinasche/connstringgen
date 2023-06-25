import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let coreWork = vscode.commands.registerCommand('connstringgen.selectDb', async () => {
		const connStrings = {
			"sqlserver": `Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;`,
			"postgresql": `Server=127.0.0.1;Port=5432;Database=myDataBase;User Id=myUsername;Password=myPassword;`,
			"mysql": `Server=myServerAddress;Port=1234;Database=myDataBase;Uid=myUsername;Pwd=myPassword;`,
			"sqlite3": `Data source=database.db;`,
		};
		const result = await vscode.window.showQuickPick(["sqlserver", "mysql", "postgresql", "sqlite3"]) as string;
		let dbString = "";
		for (let index = 0; index < Object.keys(connStrings).length; index++) {
			if (result === Object.keys(connStrings)[index]) {
				dbString = connStrings[Object.keys(connStrings)[index ] as keyof typeof connStrings];
				console.log(dbString);
			}
		}

		vscode.env.clipboard.writeText(dbString);
		vscode.window.showInformationMessage(`Connection string copied to clipboard`);
	});

	context.subscriptions.push(coreWork);
}

export function deactivate() { }
