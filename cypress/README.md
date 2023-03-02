# Cypress (https://docs.cypress.io/)

- Rammeverk for å kjøre automatiske nettleser-tester
- Testene kan kjøres lokalt, og det er også satt opp kjøring av alle tester ved push (Github Actions)
- Kjøres per nå uten dekoratør da dekoratøren kan skape litt flakyness ved f.eks å poppe opp spørreunderspøkelser

## Hvordan kjøre testene?

- `npm run dev-ingen-dekorator`: Start server uten dekoratør (om du ikke alt har gjort det).
- `npx cypress open`: Alternativ 1 - Starter Cypress sin UI-baserte test-runner
- `npx cypress run`: Alternativ 2 - Kjører tester fra terminal uten UI

## Cypress how-to og retningslinjer

- Intro til å skrive tester: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress
- Best practices: https://docs.cypress.io/guides/references/best-practices
