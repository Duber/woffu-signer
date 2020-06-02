# Woffu Signer

## Description
Woffu Signer automatizes clocking in and out your workday in Woffu.

## Features
- You can continue to check-in and out manually. It will only check you in or out if by the time specified in configuration you haven´t check-in/out already.
- It won´t check you in on bank holidays or personal vacation as long as they are specified in Woffu.
- Timezone configurable so it works all year round.

## Unsupported
- Different schedules for check-in/out for different days are not supported. However, you can deploy Woffu Signer multiple times with different configurations for a similar effect.

## Deploy
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDuber%2Fwoffu-signer%2Fmaster%2Fdeploy%2Fdeploy-to-azure.json)

Although deploy to azure is fully automated (both infrastructure and code), if you needed to deploy manually to an existing functionapp you can do so with the following command (requires [azure powershell](https://docs.microsoft.com/en-us/powershell/azure/?view=azps-4.1.0) and [azure function tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)):  
```func azure functionapp publish your_existing_functionapp_name```

## Settings
- **WOFFU_URL**: Your woffu url. ie: https://your_company.woffu.com
- **WOFFU_USERNAME**
- **WOFFU_PASSWORD**
- **SignInSchedule**: Cron Expression when Sign in will be performed. See [link](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=csharp#ncrontab-expressions)
- **SignOutSchedule**: Cron Expression when Sign out will be performed. See [link](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=csharp#ncrontab-expressions)
- **WEBSITE_TIME_ZONE**: Timezone. Taken into account together with schedule expressions in order to fire signin/signout. See [link](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-vista/cc749073(v=ws.10))  

You can update settings in your FunctionApp at any time [link](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings).


## Development
0. Install Node version 12.17
0. npm install
0. create a local.settings.json out of example.settings.json 
0. install Azure functions extension in VsCode (optional)
0. npm start or run with vscode and azure functions extension