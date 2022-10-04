import {Button} from "@navikt/ds-react";
import PlusIcon from "@/common/components/icons/PlusIcon";
import {useState} from "react";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {useLagreTiltakSM} from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {TiltakForm} from "@/common/components/tiltak/TiltakForm";
import {TiltakFormHeading} from "@/common/components/tiltak/TiltakFormHeading";
import {TiltakDTO} from "@/server/service/schema/oppfolgingsplanSchema";

interface Props {
    oppfolgingsplanId: number
}

export const NyttTiltak = ({oppfolgingsplanId}: Props) => {
    const lagreTiltak = useLagreTiltakSM();
    const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false)
    const [tiltakNavn, setTiltakNavn] = useState<string>("")
    const [beskrivelse, setBeskrivelse] = useState<string>("")
    const [fom, setFom] = useState<Date | null>(null);
    const [tom, setTom] = useState<Date | null>(null);

    const nyttTiltakInformasjon: Partial<TiltakDTO> = {
        tiltaknavn: tiltakNavn,
        beskrivelse: beskrivelse,
        fom: fom?.toJSON(),
        tom: tom?.toJSON()
    }

    const resetStateAndClose = () => {
        setTiltakNavn("");
        setBeskrivelse("");
        setFom(null);
        setTom(null);
        setLeggerTilNyttTiltak(false);
    }

    if (!leggerTilNyttTiltak) {
        return (
            <TiltakPanel border={true}>
                <TiltakFormHeading/>

                {!leggerTilNyttTiltak &&
                    <Button variant={"secondary"} icon={<PlusIcon/>} onClick={() => setLeggerTilNyttTiltak(true)}>Legg
                        til
                        et nytt tiltak</Button>}
            </TiltakPanel>
        )
    }

    return <TiltakForm
        tiltakNavn={tiltakNavn}
        setTiltakNavn={setTiltakNavn}
        beskrivelse={beskrivelse}
        setBeskrivelse={setBeskrivelse}
        fom={fom}
        setFom={setFom}
        tom={tom}
        setTom={setTom}
        displayError={lagreTiltak.isError}
        onSave={() => {
            lagreTiltak.mutate({
                oppfolgingsplanId: oppfolgingsplanId,
                tiltak: nyttTiltakInformasjon
            });
            resetStateAndClose();
        }}
        onCancel={resetStateAndClose}
    />
}