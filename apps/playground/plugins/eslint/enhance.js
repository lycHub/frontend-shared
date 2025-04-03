export default {
  meta: {
    name: "eslint-plugin-enhance",
    version: "0.0.1",
    docs: {
      description: "Enhance eslint rules.",
    },
  },
  rules: {
    "force-conditions-within-block": {
      meta: {
        type: "layout",
        docs: {
          description: "Condition statements must be within a block.",
        },
        fixable: "code",
        messages: {
          notWithinBlock: "Condition statements must be within a block.",
        },
      },
      create(context) {
        return {
          IfStatement(node) {
            loopIfStatement(node, context);
          },
        };
      },
    },
    "no-and-chain-within-jsx": {
      meta: {
        type: "suggestion",
        docs: {
          description: "Not allow && statements within jsx element.",
        },
        fixable: "code",
        hasSuggestions: true,
        messages: {
          noAndChainWithinJsx: "Not allow && statements within jsx element.",
        },
      },
      create(context) {
        return {
          JSXExpressionContainer(node) {
            const expressionNode = node.expression;
            if (
              expressionNode?.type === "LogicalExpression" &&
              expressionNode.operator === "&&"
            ) {
              const sourceCode = context.sourceCode;
              const newText = `${sourceCode.getText(
                expressionNode.left
              )} ? ${sourceCode.getText(expressionNode.right)} : null`;
              // console.log("newText>>>", newText);
              context.report({
                node: expressionNode,
                messageId: "noAndChainWithinJsx",
                suggest: [
                  {
                    messageId: "noAndChainWithinJsx",
                    fix(fixer) {
                      return fixer.replaceText(expressionNode, newText);
                    },
                  },
                ],
              });
            }
          },
        };
      },
    },
  },
};

function loopIfStatement(rootNode, context) {
  const loop = (node) => {
    const consequentNode = node.consequent;
    // console.log("IfStatement consequentNode>>>", consequentNode);
    if (consequentNode.type !== "BlockStatement") {
      context.report({
        node: consequentNode,
        messageId: "notWithinBlock",
        fix(fixer) {
          return [
            fixer.insertTextBefore(consequentNode, "{"),
            fixer.insertTextAfter(consequentNode, "}"),
          ];
        },
      });
    }

    const alternateNode = node.alternate;
    if (!alternateNode?.type) return;
    if (alternateNode.type === "IfStatement") {
      loop(alternateNode);
    } else if (alternateNode.type !== "BlockStatement") {
      context.report({
        node: alternateNode,
        messageId: "notWithinBlock",
        fix(fixer) {
          return [
            fixer.insertTextBefore(alternateNode, "{"),
            fixer.insertTextAfter(alternateNode, "}"),
          ];
        },
      });
    }
  };
  loop(rootNode);
}
