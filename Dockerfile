FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:20-slim AS runtime

WORKDIR /app

COPY package.json /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]