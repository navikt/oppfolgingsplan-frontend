import {
  OrganisasjonsinformasjonDTO,
  SykmeldingDTO,
} from "../../../schema/sykmeldingSchema";
import { ORGANISASJONSINFORMASJON } from "../constants";

export function createOrganisasjonsinformasjonDTO(
  props?: Partial<OrganisasjonsinformasjonDTO>
): OrganisasjonsinformasjonDTO {
  return {
    orgnummer: ORGANISASJONSINFORMASJON.orgnummer,
    orgNavn: ORGANISASJONSINFORMASJON.orgNavn,
    ...props,
  };
}
export function createSykmeldingDTO(
  props?: Partial<SykmeldingDTO>
): SykmeldingDTO {
  return {
    id: "123",
    fnr: "12345678902",
    sykmeldingsperioder: [],
    organisasjonsinformasjon: createOrganisasjonsinformasjonDTO(),
    ...props,
  };
}
