import { readFileSync } from "node:fs";
import { join } from "node:path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

const getRootDir = () => process.cwd();
const targetFilePath = "/src/main.ts";

export default () => {
  try {
    const sourceCode = readFileSync(
      join(getRootDir(), targetFilePath),
      "utf-8"
    );
    const ast = parser.parse(sourceCode, {
      sourceType: "module",
      strictMode: true,
      plugins: ["typescript"],
    });

    traverse.default(ast, {
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
      },
    });
    const { code } = generate.default(ast, {}, sourceCode);
    console.log("code", code);
  } catch (error) {
    console.error("Read file error :>> ", error);
  }
};
