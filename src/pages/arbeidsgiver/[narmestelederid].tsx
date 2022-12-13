import { NextPage } from "next";
import React from "react";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import ArbeidsgiverSide from "../../components/blocks/wrappers/ArbeidsgiverSide";

const Home: NextPage = () => {
  return (
    <ArbeidsgiverSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
      displayPersonvernInfo={true}
      displayVideo={true}
    >
      <div>Arbeidsgiver TODO</div>
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
