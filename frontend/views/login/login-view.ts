import { customElement, html, internalProperty, LitElement } from "lit-element";
import { signIn } from "../../auth";
import "@vaadin/vaadin-login/vaadin-login-form";

@customElement("login-view")
export class LoginView extends LitElement {
  @internalProperty()
  private error = !!new URLSearchParams().get("error");

  render() {
    return html`
      <style>
        login-view {
          display: flex;
          flex-direction: column;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
      </style>
      <vaadin-login-form
        @login=${this.login}
        ?error=${this.error}
        noForgotPassword
      ></vaadin-login-form>

      <p>user@vaadin.com / Passw0rd!</p>
    `;
  }

  async login(e: CustomEvent) {
    try {
      await signIn(e.detail.username, e.detail.password);
    } catch (e) {
      this.error = true;
    }
  }

  // Password managers don't like shadow root, render in light DOM
  protected createRenderRoot() {
    return this;
  }
}
