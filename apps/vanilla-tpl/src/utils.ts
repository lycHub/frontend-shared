import URI from "urijs";

export const getBasePath = () =>
  `${window.location.origin + import.meta.env.VITE_BASE_URL}`;

export const getRedirectUri = () => encodeURI(`${getBasePath()}/callback`);

export function getAuthUrl() {
  const uri = new URI(import.meta.env.VITE_AUTH_URL);
  uri.search({
    response_type: "code",
    grant_type: "authorization_code",
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: getRedirectUri(),
    scope: "openid profile email phone",
  });
  return uri.href();
  // return uri.href() + `&scope=${saveScope}`;
}
