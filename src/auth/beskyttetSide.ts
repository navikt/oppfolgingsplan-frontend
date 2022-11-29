import { logger } from "@navikt/next-logger";
import { GetServerSidePropsResult, NextPageContext } from "next";

import { isMockBackend } from "../environments/publicEnv";
import { validateToken } from "../server/auth/idporten/verifyIdportenToken";

type PageHandler = (
  context: NextPageContext
) => void | Promise<GetServerSidePropsResult<Record<string, unknown>>>;

function beskyttetSide(handler: PageHandler) {
  return async function withBearerTokenHandler(
    context: NextPageContext
  ): Promise<ReturnType<typeof handler>> {
    if (isMockBackend) {
      return handler(context);
    }

    const request = context.req;

    if (request == null) {
      throw new Error("Context is missing request. This should not happen");
    }

    const wonderwallRedirect = {
      redirect: {
        destination: "/oauth2/login?redirect=/syk/oppfolgingsplaner/sykmeldt",
        permanent: false,
      },
    };

    const bearerToken: string | null | undefined =
      request.headers["authorization"];

    if (!bearerToken) {
      return wonderwallRedirect;
    }

    if (!(await validateToken(bearerToken))) {
      logger.error("Kunne ikke validere idportentoken i beskyttetSide");
      return wonderwallRedirect;
    }

    return handler(context);
  };
}

export const beskyttetSideUtenProps = beskyttetSide(
  async (): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
    return {
      props: {},
    };
  }
);
