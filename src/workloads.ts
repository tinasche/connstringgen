import { env, window } from "vscode";

export function erroring() { window.showWarningMessage("This is a sample error message"); }

export async function showDb() {
	const connStrings = {
		"sqlserver": `Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;`,
		"postgresql": `Server=127.0.0.1;Port=5432;Database=myDataBase;User Id=myUsername;Password=myPassword;`,
		"mysql": `Server=myServerAddress;Port=1234;Database=myDataBase;Uid=myUsername;Pwd=myPassword;`,
		"sqlite3": `Data source=database.db;`,
	};
	const result = await window.showQuickPick(["sqlserver", "mysql", "postgresql", "sqlite3"]) as string;
	let dbString = "";
	for (let index = 0; index < Object.keys(connStrings).length; index++) {
		if (result === Object.keys(connStrings)[index]) {
			dbString = connStrings[Object.keys(connStrings)[index] as keyof typeof connStrings];
			console.log(dbString);
		}
	}

	env.clipboard.writeText(dbString);
	window.showInformationMessage(`Connection string copied to clipboard`);
}

export async function showConnString() {
	// TODO: Implement multistep input
	const connStrings = {
		"sqlserver": {
			"standard": "Server={myServerAddress};Database={myDataBase};User Id={myUsername};Password={myPassword};Asynchronous Processing=True;",
			"winAuth": "Server={myServerAddress};Database={myDataBase};Trusted_Connection=True;",
			"withMars": "Server={myServerAddress};Database={myDataBase};Trusted_Connection=True;MultipleActiveResultSets=true;",
			"localdb": "Server=(localdb)\\{MyInstance};Integrated Security=true;"
		},
		"mysql": {
			"standard": "Server={myServerAddress};Database={myDataBase};Uid={myUsername};Pwd={myPassword};Port={1234};",
			"encryptedConnection": "Server={myServerAddress};Database={myDataBase};Uid={myUsername};Pwd={myPassword};SslMode=Preferred;Keepalive=10;",
			"tableCaching": "Server={myServerAddress};Database={myDataBase};Uid={myUsername};Pwd={myPassword};tablecache=true;DefaultTableCacheAge=30;",
			"winAuth": "Server={myServerAddress};Database={myDataBase};IntegratedSecurity=yes;Uid=auth_windows;"
		},
		"postgresql": {
			"standard": "Server={127.0.0.1};Port=5432;Database={myDataBase};User Id={myUsername};Password={myPassword};",
			"winAuth": "Server={127.0.0.1};Port=5432;Database={myDataBase};Integrated Security=true;",
			"withSsl": "Server={127.0.0.1};Port=5432;Database={myDataBase};Userid={myUsername};Password={myPassword};Protocol=3;SSL=true;SslMode=Require;"
		},
		"sqlite3": {
			"standard": "Data source={dbname}.db;"
		}
	};

	const dbEngine = await window.showQuickPick(Object.keys(connStrings)) as string;
	// const connType = await window.showQuickPick(Object.keys(`connStrings.${dbEngine}`));
	if (dbEngine in Object.getOwnPropertyNames(connStrings)) {
		
	}

	await env.clipboard.writeText(dbEngine);
	// window.showInformationMessage(`${dbEngine}: ${connType}`);
	// window.showInformationMessage(`${connType}`);
}