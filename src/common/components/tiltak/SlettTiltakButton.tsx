import {Button, Heading, Modal} from "@navikt/ds-react";
import {Delete} from "@navikt/ds-icons";
import React, {useEffect, useState} from "react";
import {ButtonRow} from "@/common/components/wrappers/ButtonRow";
import styled from "styled-components";
import {useSlettTiltakSM} from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {useRouter} from "next/router";

const ModalContent = styled.div`
  padding: 2rem;
`

const HeadingWithExtraSpacing = styled(Heading)`
  margin-bottom: 2rem;
`

interface Props {
    oppfolgingsplanId: number;
    tiltakId: number;
}

export const SlettTiltakButton = ({oppfolgingsplanId, tiltakId}: Props) => {
    const [modelOpen, setModalOpen] = useState(false)
    const slettTiltakMutation = useSlettTiltakSM();

    useEffect(() => {
        if (Modal.setAppElement) {
            Modal.setAppElement("#__next");
        }
    }, [])

    return <>
        <Modal
            open={modelOpen}
            aria-label="Bekreft sletting av tiltak"
            onClose={() => setModalOpen((x) => !x)}
        >
            <Modal.Content>
                <ModalContent>
                    <HeadingWithExtraSpacing level="2" size="medium">
                        Er du sikker på at du vil slette tiltaket?
                    </HeadingWithExtraSpacing>

                    <ButtonRow>
                        <Button variant={"danger"}
                                onClick={() => {
                                    slettTiltakMutation.mutate({oppfolgingsplanId, tiltakId});
                                    setModalOpen(false);
                                }}>Slett</Button>
                        <Button variant={"tertiary"} onClick={() => setModalOpen(false)}>Avbryt</Button>
                    </ButtonRow>
                </ModalContent>
            </Modal.Content>
        </Modal>

        <Button variant={"tertiary"} icon={<Delete/>} onClick={() => setModalOpen(true)}>Slett</Button>
    </>
}