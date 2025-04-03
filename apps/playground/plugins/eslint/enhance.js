export default {
  meta: {
    name: "eslint-plugin-enhance",
    version: "0.0.1",
  },
  rules: {
    "force-conditions-within-block": {
      meta: {
        type: "problem",
        docs: {
          description: "Enhance eslint rules.",
        },
        fixable: "code",
        // hasSuggestions: true,
        // important: true,
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
