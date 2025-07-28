import {
  DecoratorComponentsReact,
  fetchDecoratorReact,
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
import {
  createBreadcrumbsAG,
  createBreadcrumbsSM,
} from "../components/blocks/breadcrumbs";

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string,
): string => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

interface Props {
  Decorator: DecoratorComponentsReact;
  language: string;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const isAudienceSykmeldt = ctx.pathname.startsWith("/sykmeldt");

    const Decorator = await fetchDecoratorReact({
      env: serverEnv.DECORATOR_ENV,
      params: {
        context: isAudienceSykmeldt ? "privatperson" : "arbeidsgiver",
        chatbot: true,
        feedback: false,
        redirectToApp: true,
        logoutWarning: true,
        breadcrumbs: isAudienceSykmeldt
          ? createBreadcrumbsSM(ctx.pathname)
          : createBreadcrumbsAG(
              ctx.pathname,
              "Den sykmeldte",
              ctx.query.narmestelederid as string,
            ),
      },
    });

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language };
  }

  render() {
    const { Decorator } = this.props;

    return (
      <Html lang="nb">
        <Head>
          <Decorator.HeadAssets />
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
