import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {NyttTiltak} from "@/common/components/tiltak/NyttTiltak";

interface Props {
    oppfolgingsplan: Oppfolgingsplan
}

export const TiltakContent = ({oppfolgingsplan}: Props) => {
    return <div>

        <NyttTiltak/>

        {/*  Tiltakslista  */}
        {/*{oppfolgingsplan.tiltakListe.map(tiltak => <div>{tiltak.beskrivelse}</div>)}*/}

    </div>
}