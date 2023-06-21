import React from "react";
import Image from "next/image";
import { BodyShort } from "@navikt/ds-react";

interface Props {
  imgUrl: string;
  tekst: string | React.ReactNode;
}

export const BildeTekstLinje = ({ imgUrl, tekst }: Props) => {
  return (
    <div className="flex flex-row mb-4 items-start">
      <div className="w-6">
        <Image alt={""} src={imgUrl} />
      </div>
      <BodyShort className="ml-4">{tekst}</BodyShort>
    </div>
  );
};
