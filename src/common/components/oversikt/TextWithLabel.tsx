import { BodyShort } from "@navikt/ds-react";

interface Props {
  text: string | undefined | null;
  label: string;
  spacing?: boolean;
}
export const TextWithLabel = ({ text, label, spacing = false }: Props) => {
  if (text) {
    return <BodyShort spacing={spacing}>{`${label} ${text}`}</BodyShort>;
  }
  return null;
};
