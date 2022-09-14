import { DocumentComponent } from "types/client/brev";

export class DocumentBuilder {
  private readonly document: DocumentComponent[];

  constructor() {
    this.document = [];
  }

  withComponent(component: DocumentComponent): DocumentBuilder {
    this.document.push(component);
    return this;
  }

  build(): DocumentComponent[] {
    return this.document;
  }
}
