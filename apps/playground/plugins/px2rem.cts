const normalPxReg = /(\d+(\.\d+)?)px/g;
const blendPxReg = /(\w+)px/g;
let options = { remUnit: 16, remPrecision: 8 };
const varMap = new Map();
export default ({ types }, opts, rootPath) => {
  // console.log('rootPath>>>', rootPath); 根目录
  Object.assign(options, opts);
  return {
    visitor: {
      VariableDeclarator(path) {
        const { id, init } = path.node;
        const validValue =
          init && init.value && !isNaN(+init.value)
            ? init.value.toString()
            : null;
        if (validValue) {
          varMap.set(id.name, validValue);
        }
      },
      StringLiteral(path) {
        const { value } = path.node;
        if (normalPxReg.test(value)) {
          const strNode = types.stringLiteral(calcValue(value));
          path.replaceWith(strNode);
        }
      },
      TemplateLiteral(path) {
        // const tplContent = `${path.node.quasis[0].value.raw}${path.node.expressions[0].name}${path.node.quasis[1].value.raw}`
        let tplContent = "";
        path.node.quasis.forEach((qua, index) => {
          const targetExpression = path.node.expressions[index];
          tplContent +=
            qua.value.raw + (targetExpression ? targetExpression.name : "");
        });
        // console.log('tplContent>>>', tplContent);
        const newTplContent = tplContent.replace(blendPxReg, (matchStr, g1) => {
          // console.log('matchStr', matchStr, g1, +g1);
          if (g1) {
            if (isNaN(+g1)) {
              const value = varMap.get(g1);
              // console.log('value>>>', value);
              if (value || value === 0) {
                return calcValue(value + "px");
              }
            } else {
              return calcValue(matchStr);
            }
          }
          return matchStr;
        });
        // console.log('newTplContent>>>', newTplContent);
        const strNode = types.stringLiteral(newTplContent);
        path.replaceWith(strNode);
      },
    },
  };
};

function calcValue(value) {
  const { remUnit, remPrecision } = options;
  return value.replace(normalPxReg, (_, $1) => {
    let val = (+$1 / remUnit).toFixed(remPrecision);
    return val + "rem";
  });
}
