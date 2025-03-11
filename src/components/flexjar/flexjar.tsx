import { SubmitHandler, useForm } from "react-hook-form";
import React, { ReactElement } from "react";
import { Alert, BodyShort, Textarea } from "@navikt/ds-react";
import { useOpprettFlexjarFeedback } from "./queryhooks/useOpprettFlexjarFeedback";
import { TakkForTilbakemeldingen } from "./TakkForTilbakemeldingen";

export type FormValues = {
  endretFraDagensOppfolgingsplan: string;
  hvordanFolgeOppSykmeldte: string;
  delingMedFastlegeOgNav: string;
  andreOnsker: string | null;
};

export const Flexjar = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>();
  const sendFeedbackMutation = useOpprettFlexjarFeedback();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    sendFeedbackMutation.mutate(data);
  };

  return (
    <section>
      <form
        id="flexjar-skjema"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div>
          <BodyShort>Anonym tilbakemelding på tjenesten</BodyShort>

          <div className="py-4">
            {!isSubmitSuccessful && (
              <div className="mt-6 w-full space-y-6">
                <Textarea
                  {...register("endretFraDagensOppfolgingsplan", {
                    required:
                      "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.",
                  })}
                  label="Hvis du kunne endre på noe i dagens oppfølgingsplan, hva ville det vært?"
                  error={errors.endretFraDagensOppfolgingsplan?.message}
                  maxLength={1000}
                  minRows={2}
                />

                <Textarea
                  {...register("hvordanFolgeOppSykmeldte", {
                    required:
                      "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.",
                  })}
                  label="Hva trenger du for at oppfølgingsplanen hjelper deg til å følge opp sykmeldte?"
                  error={errors.hvordanFolgeOppSykmeldte?.message}
                  maxLength={1000}
                  minRows={2}
                />

                <Textarea
                  {...register("delingMedFastlegeOgNav", {
                    required:
                      "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.",
                  })}
                  label="Hvordan kan vi gjøre det enklere for deg å dele planen med fastlege og Nav?"
                  error={errors.delingMedFastlegeOgNav?.message}
                  maxLength={1000}
                  minRows={2}
                />

                <Textarea
                  {...register("andreOnsker")}
                  label="Har du andre ønsker til en ny oppfølgingsplan?"
                  error={errors.andreOnsker?.message}
                  maxLength={1000}
                  minRows={2}
                />

                <Alert variant="warning" className="mt-4">
                  Ikke skriv inn navn eller andre personopplysninger. Dette blir
                  kun brukt til å lage en best mulig ny oppfølgingsplan.
                </Alert>
              </div>
            )}
          </div>
        </div>

        {isSubmitSuccessful && <TakkForTilbakemeldingen />}
      </form>
    </section>
  );
};
