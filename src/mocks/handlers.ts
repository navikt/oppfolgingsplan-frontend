import { rest } from "msw";
export const handlers = [
  rest.post(
    "/api/oppfolgingsplan/:planId/arbeidsoppgave/lagre",
    (req, res, ctx) => {
      return res(ctx.status(200));
    },
  ),
];
