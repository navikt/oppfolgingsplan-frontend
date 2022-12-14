import React from "react";
import Head from "next/head";
import { Heading } from "@navikt/ds-react";

interface Props {
  title: string;
  heading: string;
}

export const PageHeading = ({ title, heading }: Props) => {
  return (
    <>
      <Head>
        <title>
          {title + (title.length > 0 ? " - www.nav.no" : "www.nav.no")}
        </title>
      </Head>

      <Heading spacing={true} size={"large"} level={"1"}>
        {heading}
      </Heading>
    </>
  );
};
