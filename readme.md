# Woffu Signer

## Deploy
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDuber%2Fwoffu-signer%2Fmaster%2Fdeploy%2Fdeploy-to-azure.json)

Although deploy to azure is fully automated (both infrastructure and code), if you needed to deploy manually to an existing functionapp you can do so with the following command (requires [azure powershell](https://docs.microsoft.com/en-us/powershell/azure/?view=azps-4.1.0) and [azure function tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)): ```func azure functionapp publish your_existing_functionapp_name```

## Development
0. Install Node version 12.17
1. Clone repo
2. npm install

For debugging you can install Azure functions extension in VsCode