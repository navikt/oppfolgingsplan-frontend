import {
  DocumentComponent,
  DocumentComponentKey,
  DocumentComponentType,
} from "types/client/brev";

export class DocumentComponentBuilder {
  private readonly documentComponent: DocumentComponent;

  constructor() {
    this.documentComponent = {
      type: "PARAGRAPH",
      title: null,
      key: null,
      texts: [],
    };
  }

  withType(type: DocumentComponentType): DocumentComponentBuilder {
    this.documentComponent.type = type;
    return this;
  }

  withKey(key: DocumentComponentKey): DocumentComponentBuilder {
    this.documentComponent.key = key;
    return this;
  }

  withTitle(title: string): DocumentComponentBuilder {
    this.documentComponent.title = title;
    return this;
  }

  withText(text: string): DocumentComponentBuilder {
    this.documentComponent.texts.push(text);
    return this;
  }

  build(): DocumentComponent {
    return this.documentComponent;
  }
}
