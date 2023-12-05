import { render, screen } from "../../../utils/test/testUtils";
import { NyArbeidsoppgaveSM } from "../NyArbeidsoppgaveSM";
import { waitFor, within } from "@testing-library/react";
import jExpect from "../../../../jestGlobals";

describe("NyArbeidsoppgaveSM", () => {
  it("should post on lagre", async () => {
    const { user, requestBodySpy } = render(<NyArbeidsoppgaveSM />);

    await user.click(
      screen.getByRole("button", { name: "Legg til ny arbeidsoppgave" }),
    );
    await user.type(
      screen.getByRole("textbox", {
        name: "Navn på arbeidsoppgaven (obligatorisk)",
      }),
      "Dette er en arbeidsoppgave",
    );
    const radioGroup = within(
      screen.getByRole("group", {
        name: "Kan oppgaven gjennomføres i sykeperioden? (obligatorisk)",
      }),
    );
    await user.click(
      radioGroup.getByRole("radio", {
        name: "Ja, den kan gjennomføres med tilrettelegging",
      }),
    );
    const checkboxGroup = within(
      screen.getByRole("group", {
        name: "Hva skal til for å gjennomføre oppgaven?",
      }),
    );
    await user.click(
      checkboxGroup.getByRole("checkbox", {
        name: "Arbeide fra et annet sted",
      }),
    );
    await user.type(
      screen.getByRole("textbox", {
        name: "Beskrivelse (obligatorisk)",
      }),
      "Dette er en beskrivelse",
    );
    await user.click(
      screen.getByRole("button", {
        name: "Lagre",
      }),
    );

    await waitFor(() =>
      jExpect(requestBodySpy).toHaveBeenCalledWith({
        arbeidsoppgavenavn: "Dette er en arbeidsoppgave",
        gjennomfoering: {
          kanBeskrivelse: "Dette er en beskrivelse",
          kanGjennomfoeres: "TILRETTELEGGING",
          medHjelp: false,
          medMerTid: false,
          paaAnnetSted: true,
        },
      }),
    );
  });
});
