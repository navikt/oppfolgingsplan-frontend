import MedicalBoxImage from "../../blocks/images/medical-box.svg";
import NavLogoImage from "../../blocks/images/nav-logo.svg";
import { toDateMedMaanedNavn } from "../../../utils/dateUtils";
import { BildeTekstLinje } from "../BildeTekstLinje";
import { GodkjentPlanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  godkjentPlan: GodkjentPlanDTO;
}

export const GodkjentPlanDeltBekreftelse = ({ godkjentPlan }: Props) => {
  return (
    <>
      {godkjentPlan.deltMedNAV && godkjentPlan.deltMedNAVTidspunkt && (
        <BildeTekstLinje
          imgUrl={NavLogoImage}
          tekst={`Planen ble delt med NAV ${toDateMedMaanedNavn(
            godkjentPlan.deltMedNAVTidspunkt,
          )}`}
        />
      )}
      {godkjentPlan.deltMedFastlege &&
        godkjentPlan.deltMedFastlegeTidspunkt && (
          <BildeTekstLinje
            imgUrl={MedicalBoxImage}
            tekst={`Planen ble delt med fastlegen ${toDateMedMaanedNavn(
              godkjentPlan.deltMedFastlegeTidspunkt,
            )}`}
          />
        )}
    </>
  );
};
