// @ts-ignore
import OktaSignIn from "@okta/okta-signin-widget";
// TODO: 275kB min-zipped just to render a login widget?

// In the Okta admin panel set the following:
//  - Application type: Single Page App (SPA)
//  - Allowed grant types: Authorization Code
//  - Login redirect URIs: http://localhost:8080/login

export const oktaSignIn = new OktaSignIn({
  baseUrl: "https://dev-692531.okta.com", // use your own
  clientId: "0oa12olfwdRzTUrhQ4x7", // use your own
  authParams: {
    issuer: "https://dev-692531.okta.com/oauth2/default",
    responseType: ["token", "id_token"],
    display: "page",
  },
});

export async function getUserInfo() {
  try {
    return await oktaSignIn.authClient.token.getUserInfo();
  } catch (error) {
    // console.warn(`oktaSignIn.authClient.token.getUserInfo() errored: ${error}`);
    return null;
  }
}
