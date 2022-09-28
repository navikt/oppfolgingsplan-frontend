import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {NyttTiltak} from "@/common/components/tiltak/NyttTiltak";
import {LagredeTiltak} from "@/common/components/tiltak/LagredeTiltak";

interface Props {
    oppfolgingsplan: Oppfolgingsplan
}

export const TiltakContent = ({oppfolgingsplan}: Props) => {
    return (
        <div>
            <NyttTiltak oppfolgingsplanId={oppfolgingsplan.id}/>

            <LagredeTiltak oppfolgingsplan={oppfolgingsplan}/>
        </div>
    )
}