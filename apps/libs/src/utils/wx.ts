import URI from "urijs";

export function redirectHref(corpId: string, agentid: string) {
  const uri = URI("https://open.weixin.qq.com/connect/oauth2/authorize");
  // console.log('location.href :>> ', location.href);
  uri
    .search({
      appid: corpId,
      redirect_uri: encodeURI(location.href),
      response_type: "code",
      scope: "snsapi_base",
      state: "zeiss",
      agentid,
    })
    .hash("wechat_redirect");
  return uri.href();
}
