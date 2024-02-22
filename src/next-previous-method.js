const vscode = require("vscode");

const methodSymbolKinds = [
  vscode.SymbolKind.Method,
  vscode.SymbolKind.Constructor,
  vscode.SymbolKind.Function,
];

async function nextMethod(editor) {
  const [previousPositions, nextPositions] = await getMethodPositionGroups(editor);

  const targetPosition = nextPositions[0];
  if (targetPosition) {
    navigateToPosition(editor, targetPosition);
  }
}

async function previousMethod(editor) {
  const [previousPositions, nextPositions] = await getMethodPositionGroups(editor);

  const targetPosition = previousPositions.at(-1);
  if (targetPosition) {
    navigateToPosition(editor, targetPosition);
  }
}

async function getMethodPositionGroups(editor) {
  const nestedSymbols = await getNestedSymbols(editor);
  const flattenedSymbols = getFlattenedSymbols(nestedSymbols);
  const filteredSymbols = flattenedSymbols.filter(symbol =>
    methodSymbolKinds.includes(symbol.kind)
  );
  const sortedSymbols = filteredSymbols.sort((a, b) => {
    const positionA = a.location.range.start;
    const positionB = b.location.range.start;
    return positionA.isBefore(positionB) ? -1 : 1;
  });
  const methodSymbols = sortedSymbols;

  const methodPositions = methodSymbols.map(symbol => symbol.location.range.start);
  const activeCursor = editor.selection.active;
  const previousPositions = methodPositions.filter(position => position.isBefore(activeCursor));
  const nextPositions = methodPositions.filter(position => position.isAfter(activeCursor));

  return [previousPositions, nextPositions];
}

async function getNestedSymbols(editor) {
  const result = await vscode.commands.executeCommand(
    "vscode.executeDocumentSymbolProvider",
    editor.document.uri
    // vscode.window.activeTextEditor.document.uri
  );
  const nestedSymbols = result ? result : [];
  return nestedSymbols;
}

function getFlattenedSymbols(nestedSymbols) {
  const flattenedSymbols = [];
  const flatSymbolsRecursively = (flattenedSymbols, nestedSymbols) =>
    nestedSymbols.forEach(symbol => {
      flattenedSymbols.push(symbol);
      flatSymbolsRecursively(flattenedSymbols, symbol.children);
    });
  flatSymbolsRecursively(flattenedSymbols, nestedSymbols);
  return flattenedSymbols;
}

function navigateToPosition(editor, targetPosition) {
  editor.selection = new vscode.Selection(targetPosition, targetPosition);
  vscode.commands.executeCommand("revealLine", {
    lineNumber: targetPosition.line,
  });
}

module.exports = { nextMethod, previousMethod };
