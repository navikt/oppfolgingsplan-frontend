FROM gcr.io/distroless/nodejs20-debian12@sha256:7715474a901a28e3edcdf7730f14b33e30c26085989ce04b0de163fe8fab0f03

WORKDIR /app

COPY package.json /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]