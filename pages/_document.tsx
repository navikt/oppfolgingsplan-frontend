import { ServerStyleSheet } from "styled-components";
import {
  Components,
  fetchDecoratorReact,
  Props,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import serverEnv from "@/server/utils/serverEnv";

export default class MyDocument extends Document<{ Decorator: Components }> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const isAudienceSykmeldt = ctx.pathname.startsWith("/sykmeldt");

    const decoratorParams: Props = {
      env: serverEnv.DECORATOR_ENV,
      context: isAudienceSykmeldt ? "privatperson" : "arbeidsgiver",
      chatbot: true,
      redirectToApp: true,
      utloggingsvarsel: true,
      level: "Level4",
    };
    const Decorator = await fetchDecoratorReact(decoratorParams);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        Decorator,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { Decorator } = this.props;

    return (
      <Html lang="nb">
        <Head />
        <Decorator.Styles />
        <Decorator.Scripts />
        <body>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
