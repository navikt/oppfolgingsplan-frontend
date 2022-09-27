import {NextPage} from "next";
import React from "react";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {useOppfolgingsplanerSM, useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {OppfolgingsplanPageSM, Page} from "@/common/pagewrappers/OppfolgingsplanPageSM";
import {TiltakContent} from "../../../sykmeldt/components/tiltak/tiltakContent";

const texts = {
    tittel: 'Tiltak',
    updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
    infoboks: {
        title: 'Hva kan gjøre det lettere å jobbe?',
        info:
            'Når dere har fått oversikt over arbeidsoppgavene dine, kan dere se på hva slags tilrettelegging det er mulig å tilby.',
    },
};
//
// interface TiltakContentProps {
//     oppfolgingsplan?: Oppfolgingsplan
// }
//
// const TiltakContent = ({oppfolgingsplan}: TiltakContentProps): ReactElement => {
//
//     const [visTiltakSkjema, setVisTiltakSkjema] = useState(true)
//
//     if (!oppfolgingsplan) {
//         return <div>TODO finn på bedre null safety</div>
//     }
//
//     if (oppfolgingsplan.tiltakListe.length == 0) {
//         if (!visTiltakSkjema) {
//             return <OppfolgingsplanInfoboks
//                 svgUrl={TiltakOnboardingImage}
//                 svgAlt=""
//                 tittel={texts.infoboks.title}
//                 tekst={texts.infoboks.info}
//             >
//                 <div className="knapperad">
//                     <button className="knapp knapperad__element" aria-pressed={visTiltakSkjema} onClick={() => setVisTiltakSkjema(!visTiltakSkjema)}>
//                         + Legg til
//                     </button>
//                 </div>
//             </OppfolgingsplanInfoboks>
//         } else {
//             return <div>
//                 <TiltakInfoboks visTiltakSkjema={visTiltakSkjema} toggleSkjema={() => setVisTiltakSkjema(!visTiltakSkjema)} />
//                 {/*<TiltakSkjema*/}
//                 {/*    sendLagre={() => console.log("todo")}*/}
//                 {/*    avbryt={() => console.log("todo")}*/}
//                 {/*    fnr={oppfolgingsplan.arbeidstaker.fnr}*/}
//                 {/*    varselTekst={""}*/}
//                 {/*    oppdateringFeilet={() => console.log("todo")}*/}
//                 {/*/>*/}
//             </div>
//         }
//     }
//
//     return <div>
//             <TiltakInfoboks visTiltakSkjema={visTiltakSkjema} toggleSkjema={() => setVisTiltakSkjema(!visTiltakSkjema)} />
//             {/*{visTiltakSkjema && (*/}
//             {/*    <TiltakSkjema*/}
//             {/*        sendLagre={() => console.log("todo")}*/}
//             {/*        avbryt={() => setVisTiltakSkjema(false)}*/}
//             {/*        fnr={oppfolgingsplan.arbeidstaker.fnr}*/}
//             {/*        varselTekst={"this.state.varselTekst"}*/}
//             {/*        oppdateringFeilet={false}*/}
//             {/*    />*/}
//             {/*)}*/}
//
//             <TiltakListe
//                 liste={sorterTiltakEtterNyeste(oppfolgingsplan.tiltakListe)}
//                 fnr={oppfolgingsplan.arbeidstaker.fnr || ""} //todo
//             />
//         </div>
// }

const Tiltak: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const oppfolgingsplaner = useOppfolgingsplanerSM()
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId)

    return (
        <OppfolgingsplanPageSM isLoading={oppfolgingsplaner.isLoading} isError={oppfolgingsplaner.isError}
                               oppfolgingsplan={aktivPlan} page={Page.TILTAK}>
            {aktivPlan && <TiltakContent oppfolgingsplan={aktivPlan}/>}
        </OppfolgingsplanPageSM>
    )
}

export default Tiltak