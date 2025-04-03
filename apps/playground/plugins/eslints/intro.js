const plugin = {
  // name和version应从package.json中读取
  meta: {
    name: "eslint-plugin-example",
    version: "1.2.3",
  },
  configs: {
    /* 
    	plugins: {
			example,
		},
		extends: ["example/recommended"],
    */
    recommended: [
      {
        plugins: {
          example: plugin,
        },
        rules: {
          "example/dollar-sign": "error",
        },
        languageOptions: {
          globals: {
            myGlobal: "readonly",
          },
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
      },
    ],
  },
  rules: {
    "dollar-sign": {
      create(context) {
        // rule implementation ...
      },
    },
  },
  processors: {},
};

export default plugin;
