export default function (babel) {
  const { types: t } = babel;
  return {
    name: "up-regexp",
    visitor: {
      RegExpLiteral(path) {
        const oldName = path.parent.id.name;
        const newIdentifier = path.scope.generateUidIdentifierBasedOnNode(
          path.parent.id
        ).name;
        path.scope.rename(oldName, newIdentifier);
        path.parentPath.remove();

        const newDeclaration = t.variableDeclaration("const", [
          t.variableDeclarator(
            t.identifier(newIdentifier),
            t.regExpLiteral(path.parent.init.pattern)
          ),
        ]);

        const program = path.findParent(t.isProgram);
        program.node.body.unshift(newDeclaration);

        // console.log("path", path.parent.id);
      },
    },
  };
}
