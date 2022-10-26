import { MedicalBoxImage, NavLogoImage } from "components/blocks/images/imageComponents";
import { toDateMedMaanedNavn } from "utils/dateUtils";
import { GodkjentPlan } from "../../../schema/oppfolgingsplanSchema";
import { BildeTekstLinje } from "../BildeTekstLinje";

interface Props {
  godkjentPlan: GodkjentPlan;
}

export const GodkjentPlanDeltBekreftelse = ({ godkjentPlan }: Props) => {
  return (
    <>
      {godkjentPlan.deltMedNAV && godkjentPlan.deltMedNAVTidspunkt && (
        <BildeTekstLinje
          imgUrl={NavLogoImage}
          tekst={`Planen ble delt med NAV ${toDateMedMaanedNavn(
            godkjentPlan.deltMedNAVTidspunkt
          )}`}
        />
      )}
      {godkjentPlan.deltMedFastlege &&
        godkjentPlan.deltMedFastlegeTidspunkt && (
          <BildeTekstLinje
            imgUrl={MedicalBoxImage}
            tekst={`Planen ble delt med fastlegen ${toDateMedMaanedNavn(
              godkjentPlan.deltMedFastlegeTidspunkt
            )}`}
          />
        )}
    </>
  );
};
