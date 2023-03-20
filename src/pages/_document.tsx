import {
  Components,
  fetchDecoratorReact,
  Props,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import serverEnv from "../server/utils/serverEnv";

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string
): string => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

export default class MyDocument extends Document<{ Decorator: Components }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const isAudienceSykmeldt = ctx.pathname.startsWith("/sykmeldt");

    const decoratorParams: Props = {
      env: serverEnv.DECORATOR_ENV,
      context: isAudienceSykmeldt ? "privatperson" : "arbeidsgiver",
      chatbot: true,
      redirectToApp: true,
      level: "Level4",
    };

    const Decorator = await fetchDecoratorReact(decoratorParams);

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language };
  }

  render() {
    const { Decorator } = this.props;

    return (
      <Html lang="nb">
        <Head>
          <Decorator.Styles />
          <link
            rel="preload"
            href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>

        <body>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <Decorator.Scripts />
          <NextScript />
        </body>
      </Html>
    );
  }
}
