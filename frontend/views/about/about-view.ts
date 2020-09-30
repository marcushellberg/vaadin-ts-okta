import { LitElement, html, css, customElement } from "lit-element";

@customElement("about-view")
export class AboutView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--lumo-space-m) var(--lumo-space-l);
      }
    `;
  }

  render() {
    return html`
      <h1>Vaadin + Okta login example app</h1>
      <p>
        This app uses okta for authentication. You need to be authenticated to
        access this app and its server endpoint.
      </p>
    `;
  }
}
