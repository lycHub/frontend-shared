import tencentcloud from "tencentcloud-sdk-nodejs-tmt";

const TmtClient = tencentcloud.tmt.v20180321.Client;

const clientConfig = {
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "tmt.tencentcloudapi.com",
    },
  },
};

const client = new TmtClient(clientConfig);

const defaultParams = {
  ProjectId: 0,
};

export function translateSingleText(params) {
  return client.TextTranslate(params);
}

export function batchTranslateText(params) {
  return client.TextTranslateBatch({ ...defaultParams, ...params });
}
