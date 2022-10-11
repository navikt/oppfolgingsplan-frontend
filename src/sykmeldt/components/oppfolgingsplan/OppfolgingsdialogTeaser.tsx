import React from "react";
import {
  finnOppfolgingsdialogMotpartNavn,
  inneholderGodkjenninger,
  inneholderGodkjenningerAvArbeidstaker,
} from "@/common/utils/oppfolgingsdialogUtils";
import { hentPlanStatus } from "@/common/utils/teaserUtils";
import { LinkPanel, Tag } from "@navikt/ds-react";
import Image from "next/image";
import NextLink from "next/link";
import styled from "styled-components";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

const texts = {
  etiketter: {
    tilGodkjenning: "Til godkjenning",
  },
};

interface TilGodkjenningStatusProps {
  oppfolgingsplan: Oppfolgingsplan;
}

export const TilGodkjenningStatus = ({
  oppfolgingsplan,
}: TilGodkjenningStatusProps) => {
  if (
    inneholderGodkjenninger(oppfolgingsplan) &&
    !inneholderGodkjenningerAvArbeidstaker(oppfolgingsplan)
  ) {
    return <StyledSubTitle>{texts.etiketter.tilGodkjenning}</StyledSubTitle>;
  }
  return null;
};

interface OppfolgingsdialogTeaserProps {
  oppfolgingsplan: Oppfolgingsplan;
  rootUrlPlaner?: string;
}

const LinkPanelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  margin: 0;
  width: 4.5em;
  height: 4.5em;
`;

const StyledTitle = styled.h3`
  margin: 0;
`;

const StyledSubTitle = styled.h4`
  margin: 0.25rem 0;
`;

const StyledSmallText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.004em;
`;

const OppfolgingsdialogTeaser = ({
  oppfolgingsplan,
}: OppfolgingsdialogTeaserProps) => {
  const planStatus = hentPlanStatus(oppfolgingsplan);
  const landingUrl = useLandingUrl();

  return (
    <NextLink
      href={`${landingUrl}/${oppfolgingsplan.id}/arbeidsoppgaver`}
      passHref
    >
      <LinkPanel border>
        <LinkPanelContent>
          <ImageContainer>
            <Image alt="" src={planStatus.img} />
          </ImageContainer>
          <div>
            <header>
              <StyledTitle
                className="js-title"
                id={`oppfolgingsdialog-header-${oppfolgingsplan.id}`}
              >
                <span>
                  {finnOppfolgingsdialogMotpartNavn(oppfolgingsplan)}kfjg
                </span>
              </StyledTitle>
            </header>
            <TilGodkjenningStatus oppfolgingsplan={oppfolgingsplan} />
            {typeof planStatus.tekst === "object" ? (
              <StyledSmallText dangerouslySetInnerHTML={planStatus.tekst} />
            ) : (
              <StyledSmallText
                dangerouslySetInnerHTML={{ __html: planStatus.tekst }}
              />
            )}
          </div>
        </LinkPanelContent>
      </LinkPanel>
    </NextLink>
  );
};

export default OppfolgingsdialogTeaser;
