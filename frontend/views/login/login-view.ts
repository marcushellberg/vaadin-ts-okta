import { customElement, html, LitElement } from "lit-element";
import { Router, AfterEnterObserver, RouterLocation } from "@vaadin/router";
import { LoginResult } from "@vaadin/flow-frontend/Connect";
import { oktaSignIn, getUserInfo } from "../../auth";
import oktaStyles from "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

@customElement("login-view")
export class LoginView extends LitElement implements AfterEnterObserver {
  private returnUrl = "/";

  private onSuccess: (result: LoginResult) => void;

  constructor(onSuccess?: (result: LoginResult) => void) {
    super();
    const defaultonSuccess = () => {
      Router.go(this.returnUrl);
    };
    this.onSuccess = onSuccess || defaultonSuccess;
  }

  // The Okta Sign-In widget does not work in a Shadow DOM
  protected createRenderRoot() {
    return this;
  }

  // TODO: use the vaadin-login component and the Okta JS SDK instead of the Okta Sign-In widget
  // see https://github.com/okta/okta-auth-js
  render() {
    return html`
      <style>
        ${oktaStyles}
      </style>

      <!-- where the sign-in form will be displayed -->
      <div id="okta-login-container" style="padding-top: 4em;"></div>

      <p style="text-align: center;">user@vaadin.com / Passw0rd!</p>
    `;
  }

  protected async firstUpdated(_changedProperties: any) {
    super.firstUpdated(_changedProperties);

    const self = this;

    if (oktaSignIn.hasTokensInUrl()) {
      oktaSignIn.authClient.token.parseFromUrl().then(
        // If we get here, the user just logged in.
        function success(res: any) {
          const accessToken = res.tokens.accessToken;
          const idToken = res.tokens.idToken;

          oktaSignIn.authClient.tokenManager.add("accessToken", accessToken);
          oktaSignIn.authClient.tokenManager.add("idToken", idToken);

          // TODO: find a way to preserve the return URL

          self.onSuccess({
            token: accessToken,
            error: false,
            errorMessage: "",
            errorTitle: "",
          });
        },
        function error(err: any) {
          console.warn(
            `oktaSignIn.authClient.token.parseFromUrl() errored: ${err}`
          );
        }
      );
    } else {
      const user = await getUserInfo();
      if (user) {
        this.onSuccess({
          token: oktaSignIn.authClient.tokenManager.get("accessToken"),
          error: false,
          errorTitle: "",
          errorMessage: "",
        });
      } else {
        oktaSignIn.renderEl(
          { el: "#okta-login-container" },
          function success(res: any) {
            console.log(`oktaSignIn.renderEl() succeeded: ${res}`);
          },
          function error(err: any) {
            console.warn(`oktaSignIn.renderEl() errored: ${err}`);
          }
        );
      }
    }
  }

  onAfterEnter(location: RouterLocation) {
    this.returnUrl = location.redirectFrom || this.returnUrl;
  }
}
