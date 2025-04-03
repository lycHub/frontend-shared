const plugin = {
  // name和version应从package.json中读取
  meta: {
    name: "eslint-plugin-foo-bar",
    version: "1.2.3",
  },
  configs: {},
  rules: {
    "foo-bar": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
        },
        fixable: "code",
        // hasSuggestions: true,
        // important: true,
        messages: {
          notBar:
            'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
        },
      },
      create(context) {
        return {
          VariableDeclarator(node) {
            // console.log("foobar node>>>", node.parent.kind);
            if (
              node.parent.kind === "const" &&
              node.id.name === "foo" &&
              node.init.value !== "bar"
            ) {
              context.report({
                node,
                messageId: "notBar",
                data: {
                  notBar: node.init.value,
                },
                /*  suggest: [
                  {
                    messageId: "notBar",
                    fix(fixer) {
                      return fixer.replaceText(node.init, '"bar"');
                    },
                  },
                ], */
                fix(fixer) {
                  return fixer.replaceText(node.init, '"bar"');
                },
              });
            }
          },
        };
      },
    },
  },
};

export default plugin;
