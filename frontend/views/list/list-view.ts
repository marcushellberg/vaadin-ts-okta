import "@vaadin/vaadin-grid/src/vaadin-grid-column";
import {
  css,
  customElement,
  html,
  internalProperty,
  LitElement,
} from "lit-element";
import "@vaadin/vaadin-grid";
import Contact from "../../generated/com/vaadin/tutorial/backend/Contact";
import { getContacts } from "../../generated/ListEndpoint";
@customElement("list-view")
export class ListView extends LitElement {
  @internalProperty()
  private contacts: Contact[] = [];

  static styles = css`
    :host {
      display: block;
      padding: var(--lumo-space-l);
      height: 100%;
      box-sizing: border-box;
    }
    vaadin-grid {
      height: 100%;
    }
  `;

  render() {
    return html`<h1>Contact list</h1>

      <vaadin-grid .items=${this.contacts}>
        <vaadin-grid-column path="firstName" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="lastName" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="email" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="company" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="status" auto-width></vaadin-grid-column>
      </vaadin-grid> `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.contacts = await getContacts();
  }
}
