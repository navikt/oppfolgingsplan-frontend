import React from 'react';
import {finnOppfolgingsdialogMotpartNavn} from '@/common/utils/oppfolgingsdialogUtils';
import {hentStatusUtenAktivSykmelding} from '@/common/utils/teaserUtils';
import getContextRoot from '@/common/utils/getContextRoot';
import {BodyLong, Heading, LinkPanel} from "@navikt/ds-react";
import Image from "next/image";
import {PlanIkkeAktivSykmeldingImage} from "@/common/images/imageComponents";
import {OppfolgingsplanDTO} from "@/server/service/schema/oppfolgingsplanSchema";

interface Props {
    oppfolgingsplanUtenAktivSykmelding: OppfolgingsplanDTO
}

const OppfolgingsdialogTidligereUtenSykmelding = ({oppfolgingsplanUtenAktivSykmelding}: Props) => {
    const planStatus = hentStatusUtenAktivSykmelding(oppfolgingsplanUtenAktivSykmelding);

    return (
        <LinkPanel href={`${getContextRoot()}/oppfolgingsplaner/${oppfolgingsplanUtenAktivSykmelding.id}`} border>
            <Image alt="" src={PlanIkkeAktivSykmeldingImage}/>
            <div>
                <Heading size={"medium"}
                         level={"3"}>{finnOppfolgingsdialogMotpartNavn(oppfolgingsplanUtenAktivSykmelding)}</Heading>
                <BodyLong>{planStatus.tekst}</BodyLong>
            </div>
        </LinkPanel>
    );
};

export default OppfolgingsdialogTidligereUtenSykmelding;
