# Dogfooding the RunFromPackage Feature

>Checking user scenarios for Run-From-Package feature

## Setting up for local dev

1. Looked around online for 30 minutes on how to start a local project for a JS function
    - Visual Studio document only had C# templates
    - VS Code document wouldn’t allow Zip deployment
    - __"Download app content" button is broken__ (on Edge and Chrome)
1. Eventually found [this](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function-azure-cli) 
1. Install Azure Functions core tools
1. Create project with CLI
1. Editing with VS Code
1. Add logic for HTTP arguments
    - Imaginary scenarios where the user may write to the read-only directories

## Zip Deploy

1. Found [this doc](https://docs.microsoft.com/en-us/azure/azure-functions/deployment-zip-push) in the lefthand navigation pane while reading the doc in step 2 above
    - Easy to find, right under "Deploy" section
1. Deploy using:
    ```
    az functionapp deployment source config-zip  -g freebergrunfrompackage -n freebergrunfro
mpackage --src C:\Users\jafreebe\Desktop\demos\functions\runfrompackage-dogfood.zip
    ```

__Hard break in user experience at this point__
- Message says that everything is OK, but the function does not show in the portal list
- SSH does not work and Bash is slow -- How can I check that the .zip is on the Function app?
- The [zip deployment docs](https://docs.microsoft.com/en-us/azure/azure-functions/deployment-zip-push) do not show
    - Troubleshooting
    - Confirm that the .zip functions are on the app
- I could not continue past this point. I tried:
    - Redploying
    - Using the old-school Powershell HTTP deployment
    - 

1. Then I find there is an option to [run from the deployment package](https://docs.microsoft.com/en-us/azure/azure-functions/deployment-zip-push#run-functions-from-the-deployment-package)
1. I go into the portal and add the environment variable `WEBSITE_RUN_FROM_PACKAGE` to `1`.

## Run from package

1. 

## Notes

- Finding the first document for initial, local development was very difficult
    - Specifically to use JS development __and__  zip deployment