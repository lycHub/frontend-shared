import URI from "urijs";

function redirectHref(corpId: string, agentid: string) {
  const uri = new URI('https://open.weixin.qq.com/connect/oauth2/authorize');
  // console.log('location.href :>> ', location.href);
  uri.search({
    appid: corpId,
    redirect_uri: encodeURIComponent(removeCode(location.href).url),
    response_type: 'code',
    scope: 'snsapi_base',
    state: 'zeiss',
    agentid,
  }).hash("wechat_redirect");
  return uri.href();
}


function removeCode(url: string) {
  const uri = new URI(url);
  const hasCode = uri.hasSearch('code');
  return {
    hasCode,
    url: hasCode ? uri.removeSearch('code').toString() : url
  }
}

export {
  redirectHref,
  removeCode
}