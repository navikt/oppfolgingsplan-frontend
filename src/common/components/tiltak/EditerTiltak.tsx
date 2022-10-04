import {useState} from "react";
import {useLagreTiltakSM} from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {TiltakForm} from "@/common/components/tiltak/TiltakForm";
import {TiltakDTO} from "@/server/service/schema/oppfolgingsplanSchema";

interface Props {
    oppfolgingsplanId: number,
    tiltak: TiltakDTO,

    doneEditing(): void
}

export const EditerTiltak = ({oppfolgingsplanId, tiltak, doneEditing}: Props) => {
    const lagreTiltak = useLagreTiltakSM();
    const [tiltakNavn, setTiltakNavn] = useState<string>(tiltak.tiltaknavn)
    const [beskrivelse, setBeskrivelse] = useState<string>(tiltak.beskrivelse ? tiltak.beskrivelse : "")
    const [fom, setFom] = useState<Date | null>(tiltak.fom ? new Date(tiltak.fom) : null);
    const [tom, setTom] = useState<Date | null>(tiltak.tom ? new Date(tiltak.tom) : null);

    const tiltakInformasjon: TiltakDTO = {
        ...tiltak,
        tiltaknavn: tiltakNavn,
        beskrivelse: beskrivelse,
        fom: fom?.toJSON() ?? null,
        tom: tom?.toJSON() ?? null
    }

    return (
        <TiltakForm
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
                    tiltak: tiltakInformasjon
                });
                doneEditing()
            }}
            onCancel={doneEditing}
        />
    )
}