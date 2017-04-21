// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "obsessivechn" is now active!');


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
    //     The code you place here will be executed every time your command is executed

    //     Display a message box to the user
    //     vscode.window.showInformationMessage('Hello World!');
    // });

    var dis1 = vscode.commands.registerCommand('extension.obsessiveSelected', replaceSelected());
    var dis2 = vscode.commands.registerCommand('extension.obsessiveAll', replaceAll());

    context.subscriptions.push(dis1);
    context.subscriptions.push(dis2);
}

function replaceSelected() {
    if (isAnythingSelected()) {
        var editor = vscode.window.activeTextEditor;
        var selection = editor.selection;
        var newText = regReplace(editor.document.getText(selection));
        return editor.edit((edit) => {
            edit.replace(selection, newText)
        });
    }
}


function replaceAll() {
    var editor = vscode.window.activeTextEditor;
    var selection = editor.selection;
    var newText = regReplace(editor.document.getText());
    return editor.edit((edit) => {
        edit.replace(selection, newText)
    });
}

function regReplace(str) {
    var newvalue = str.replace(new RegExp('([a-z,A-Z])([\u4e00-\u9fa5])', 'gm'), '$1 $2');
    return newvalue.replace(new RegExp('([\u4e00-\u9fa5])([a-z,A-Z])', 'gm'), '$1 $2');
}

function isAnythingSelected() {
    return !vscode.window.activeTextEditor.selection.isEmpty;
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate; 