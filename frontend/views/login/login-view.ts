import { css, customElement, html, LitElement } from "lit-element";
import { signIn } from "../../auth";
import "@vaadin/vaadin-login/vaadin-login-form";

@customElement("login-view")
export class LoginView extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  `;

  render() {
    return html`
      <vaadin-login-form
        @login=${this.login}
        noForgotPassword
      ></vaadin-login-form>

      <p style="text-align: center;">user@vaadin.com / Passw0rd!</p>
    `;
  }

  async login(e: CustomEvent) {
    signIn(e.detail.username, e.detail.password);
  }
}
