import { NextPage } from "next";
import React from "react";
import Side from "components/blocks/wrappers/Side";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";

const Home: NextPage = () => {
  return (
    <Side
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
      displayPersonvernInfo={true}
      displayVideo={true}
    >
      <div>Arbeidsgiver TODO</div>
    </Side>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
