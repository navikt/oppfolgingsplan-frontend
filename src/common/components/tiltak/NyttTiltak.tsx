import {Button} from "@navikt/ds-react";
import PlusIcon from "@/common/components/icons/PlusIcon";
import {useState} from "react";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {useLagreTiltakSM} from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {FormValues, TiltakForm} from "@/common/components/tiltak/TiltakForm";
import {TiltakFormHeading} from "@/common/components/tiltak/TiltakFormHeading";
import {useForm} from "react-hook-form";
import {TiltakDTO} from "@/server/service/schema/oppfolgingsplanSchema";

interface Props {
    oppfolgingsplanId: number
}

export const NyttTiltak = ({oppfolgingsplanId}: Props) => {
    const lagreTiltak = useLagreTiltakSM();
    const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false)

    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm();

    const nyttTiltakInformasjon = (data: FormValues): Partial<TiltakDTO> => {
        console.log(data)
        return {
            tiltaknavn: data.overskrift,
            beskrivelse: data.beskrivelse,
            fom: data.fom?.toJSON(),
            tom: data.tom?.toJSON()
        }
    }

    const resetStateAndClose = () => {
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
        onSubmit={(data) => {
            lagreTiltak.mutate({
                oppfolgingsplanId: oppfolgingsplanId,
                tiltak: nyttTiltakInformasjon(data)
            });
            resetStateAndClose();
        }}
        onCancel={resetStateAndClose}
    />
}