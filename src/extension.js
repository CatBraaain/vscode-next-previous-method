const vscode = require("vscode");
const nextPreviousMethod = require("./next-previous-method.js");

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "next-previous-method.nextMethod",
      nextPreviousMethod.nextMethod
    ),
    vscode.commands.registerTextEditorCommand(
      "next-previous-method.previousMethod",
      nextPreviousMethod.previousMethod
    )
  );

  return;
}

function deactivate() {
  return undefined;
}

// console.log("for debug message");
// vscode.window.showInformationMessage("for debug message");

module.exports = { activate, deactivate };
