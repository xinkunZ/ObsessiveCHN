// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "obsessivechn" is now active!');

    var dis1 = vscode.commands.registerCommand('extension.obsessiveAll', replaceHello());

    context.subscriptions.push(dis1);
}

function replaceHello() {
    vscode.window.showInformationMessage('Hello World!');
}


function replace() {
    var editor = vscode.window.activeTextEditor;
    var selection = editor.selection;
    var startPattern = ' ';
    var endPattern = ' ';
    var wordPattern = /([\u4e00-\u9fa5]*)([a-z,A-Z]+)([\u4e00-\u9fa5]+)/g;

    if (!isAnythingSelected()) {
        var withSurroundingWord = getSurroundingWord(editor, selection, wordPattern);

        if (withSurroundingWord != null) {
            selection = editor.selection = withSurroundingWord;
        }

    }

    if (!isAnythingSelected()) {
        var position = selection.active;
        var newPosition = position.with(position.line, position.character + startPattern.length)
        return editor.edit((edit) => {
            edit.insert(selection.start, startPattern + endPattern);
        }).then(() => {
            editor.selection = new vscode.Selection(newPosition, newPosition)
        })
    } else if (isSelectionMatch(selection, startPattern, endPattern)) {
        return replaceSelection((text) => text.substr(startPattern.length, text.length - startPattern.length - endPattern.length))
    }
    else {
        return replaceSelection((text) => {
            return text.replace(wordPattern, '$1 $2');
        })
    }

}

function isSelectionMatch(selection, startPattern, endPattern) {
    var editor = vscode.window.activeTextEditor;
    var text = editor.document.getText(selection)
    if (startPattern.constructor === RegExp) {
        return startPattern.test(text);
    }

    return text.startsWith(startPattern) && text.endsWith(endPattern)
}


function replaceSelection(replaceFunc) {
    var editor = vscode.window.activeTextEditor;
    var selection = editor.selection;

    var newText = replaceFunc(editor.document.getText(selection));
    return editor.edit((edit) => {
        edit.replace(selection, newText)
    })
}


function getSurroundingWord(editor, selection, wordPattern) {
    var range = editor.document.getWordRangeAtPosition(selection.active, wordPattern);
    return range == null
        ? null
        : new vscode.Selection(range.start, range.end);
}

function isAnythingSelected() {
    return !vscode.window.activeTextEditor.selection.isEmpty;
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate; 