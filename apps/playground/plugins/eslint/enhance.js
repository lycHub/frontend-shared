const plugin = {
  meta: {
    name: "eslint-plugin-enhance",
    version: "0.0.1",
    docs: {
      description: "Enhance eslint rules.",
    },
  },
  configs: {},
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
              // 获取source code
              const sourceCode = context.sourceCode;

              // 将left和right的source code拼成三元运算符
              const newText = `${sourceCode.getText(
                expressionNode.left
              )} ? ${sourceCode.getText(expressionNode.right)} : null`;
              // console.log("newText>>>", newText);

              context.report({
                node: expressionNode,
                messageId: "noAndChainWithinJsx",
                suggest: [
                  // 针对错误之一提供报错信息和修复建议
                  {
                    messageId: "noAndChainWithinJsx",
                    fix(fixer) {
                      // 用三元表达式替换整个短链表达式
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

Object.assign(plugin.configs, {
  recommended: [
    {
      plugins: {
        enhance: plugin,
      },
      rules: {
        "enhance/force-conditions-within-block": "error",
        "enhance/no-and-chain-within-jsx": "error",
      },
    },
  ],
});

export default plugin;
