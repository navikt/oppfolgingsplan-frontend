import React from 'react';
import {
    finnOppfolgingsdialogMotpartNavn,
    inneholderGodkjenninger,
    inneholderGodkjenningerAvArbeidstaker,
} from '@/common/utils/oppfolgingsdialogUtils';
import {hentPlanStatus} from '@/common/utils/teaserUtils';
import {LinkPanel, Tag} from "@navikt/ds-react";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

const texts = {
    etiketter: {
        tilGodkjenning: 'Til godkjenning',
    },
};

interface TilGodkjenningStatusProps {
    oppfolgingsplan: Oppfolgingsplan
}

export const TilGodkjenningStatus = ({oppfolgingsplan}: TilGodkjenningStatusProps) => {
    if (inneholderGodkjenninger(oppfolgingsplan) &&
        !inneholderGodkjenningerAvArbeidstaker(oppfolgingsplan)) {
        return <Tag variant={"warning"} size={"small"}>{texts.etiketter.tilGodkjenning}</Tag>
    }
    return null;
};

interface OppfolgingsdialogTeaserProps {
    oppfolgingsplan: Oppfolgingsplan;
    rootUrlPlaner?: string
}

const OppfolgingsdialogTeaser = ({oppfolgingsplan, rootUrlPlaner}: OppfolgingsdialogTeaserProps) => {
    const planStatus = hentPlanStatus(oppfolgingsplan);
    return (
        <LinkPanel href={`${rootUrlPlaner}/oppfolgingsplaner/${oppfolgingsplan.id}`} border>
            <div className="inngangspanel">
        <span className="oppfolgingsplanInnhold__ikon">
          <img alt="" src={planStatus.img}/>
        </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsplan.id}`}>
                            <span
                                className="inngangspanel__tittel">{finnOppfolgingsdialogMotpartNavn(oppfolgingsplan)}</span>
                        </h3>
                    </header>
                    {typeof planStatus.tekst === 'object' ? (
                        <p className="inngangspanel__tekst" dangerouslySetInnerHTML={planStatus.tekst}/>
                    ) : (
                        <p className="inngangspanel__tekst" dangerouslySetInnerHTML={{__html: planStatus.tekst}}/>
                    )}
                    <TilGodkjenningStatus oppfolgingsplan={oppfolgingsplan}/>
                </div>
            </div>
        </LinkPanel>
    );
};

export default OppfolgingsdialogTeaser;
