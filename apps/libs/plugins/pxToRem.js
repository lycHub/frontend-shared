const propList = ["*font-size*", "--text-size*"];

const defOptions = {
  rootValue: 16,
  unitPrecision: 4,
  propList,
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 4,
  exclude: [/^(?!.*node_modules\/antd-mobile)/], // 排除node_modules下的包，除了antd-mobile
};

export default function (options = {}) {
  return { ...defOptions, ...options };
}
