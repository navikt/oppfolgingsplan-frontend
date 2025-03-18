import React, { useRef } from "react";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
  Alert,
  BodyLong,
  Button,
  GuidePanel,
  HStack,
  Modal,
  Textarea,
} from "@navikt/ds-react";
import { TakkForTilbakemeldingen } from "./TakkForTilbakemeldingen";
import { SubmitHandler, useForm } from "react-hook-form";
import { useOpprettFlexjarFeedback } from "./queryhooks/useOpprettFlexjarFeedback";
import { OpprettFeedbackData } from "../../pages/api/flexjar";
import { EmoQuestion } from "./emoji/EmoQuestion";

export type FlexjarFormValues = {
  endretFraDagensOppfolgingsplan: string;
  hvordanFolgeOppSykmeldte: string;
};

export const FlexJarModal = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FlexjarFormValues>();
  const [activeRating, setActiveRating] = React.useState<number | null>(null);
  const sendFeedbackMutation = useOpprettFlexjarFeedback();

  const onSubmit: SubmitHandler<FlexjarFormValues> = (data) => {
    const feedbackData: OpprettFeedbackData = {
      feedback: data.endretFraDagensOppfolgingsplan,
      svar: activeRating!,
      hvordanFolgeOppSykmeldte: data.hvordanFolgeOppSykmeldte,
      feedbackId: "oppfolgingsplan-arbeidsgiver",
    };
    sendFeedbackMutation.mutate(feedbackData);
  };

  return (
    <>
      <GuidePanel className="mb-8">
        <HStack gap="4">
          <BodyLong>
            Hei! Vi jobber med en ny og forbedret oppfølgingsplan i 2025. Vi
            ønsker å lære av deg, for å forstå hva dine behov er. Har du to
            minutter?
          </BodyLong>
          <Button onClick={() => ref.current?.showModal()}>
            Åpne spørreskjema
          </Button>
        </HStack>
      </GuidePanel>

      <Modal
        ref={ref}
        header={{
          icon: <MagnifyingGlassIcon aria-hidden={true} />,
          heading: "Innspill til utvikling av ny oppfølgingsplan",
        }}
      >
        <Modal.Body>
          <section>
            {!isSubmitSuccessful && (
              <form
                id="flexjar-skjema"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full"
              >
                <div>
                  <BodyLong>
                    Svarene du sender inn er anonyme, og blir sendt til
                    utviklingsteamet i Nav som har ansvaret for
                    oppfølgingsplanen.
                  </BodyLong>

                  <div className="py-4">
                    <div className="mt-6 w-full space-y-6">
                      <EmoQuestion
                        question="Hvordan opplever du dagens oppfølgingsplan?"
                        activeState={activeRating}
                        setActiveState={setActiveRating}
                      />

                      {activeRating != null && (
                        <>
                          <Textarea
                            {...register("endretFraDagensOppfolgingsplan", {
                              required:
                                "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.",
                            })}
                            label="Hvis du kunne endre på noe i dagens oppfølgingsplan, hva ville det vært?"
                            error={
                              errors.endretFraDagensOppfolgingsplan?.message
                            }
                            maxLength={1000}
                            minRows={2}
                          />

                          <Textarea
                            {...register("hvordanFolgeOppSykmeldte", {
                              required:
                                "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.",
                            })}
                            label="Hva trenger du for at oppfølgingsplanen skal være til hjelp med å følge opp dine sykmeldte?"
                            error={errors.hvordanFolgeOppSykmeldte?.message}
                            maxLength={1000}
                            minRows={2}
                          />

                          <Alert variant="warning" className="mt-4">
                            Ikke skriv inn navn eller andre personopplysninger.
                            Dette blir kun brukt til å lage en best mulig ny
                            oppfølgingsplan.
                          </Alert>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
            {isSubmitSuccessful && <TakkForTilbakemeldingen />}
          </section>
        </Modal.Body>

        <Modal.Footer>
          {!isSubmitSuccessful && (
            <Button disabled={activeRating == null} form="flexjar-skjema">
              Send tilbakemelding
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={() => ref.current?.close()}
          >
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
