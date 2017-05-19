// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "obsessivechn" is now active!');

    var dis1 = vscode.commands.registerCommand('extension.obsessiveAll', replace);

    context.subscriptions.push(dis1);
}

var formatLeft = /([a-z,A-Z]+)([\u4e00-\u9fa5])/g;
var formatRight = /([\u4e00-\u9fa5])([a-z,A-Z]+)/g;

function replace() {

    var editor = vscode.window.activeTextEditor;
    var document = editor.document;
    var range = new vscode.Range(
        // line 0, char 0:
        0, 0,
        // last line:
        document.lineCount,
        // last character:
        document.lineAt(document.lineCount - 1).range.end.character);

    if (isAnythingSelected()) {
        range = editor.selection;
    }

    var replaceStr = "$1 $2";
    if (document.languageId == "markdown") {
        replaceStr = "$1`$2`";
    }

    var newText = editor.document.getText(range).replace(formatLeft, replaceStr).replace(formatRight, replaceStr);

    return editor.edit((edit) => {
        edit.replace(range, newText);
    });

}

function isAnythingSelected() {
    return !vscode.window.activeTextEditor.selection.isEmpty;
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate; 