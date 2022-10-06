import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";

const Seplanen: NextPage = () => {
  return (
    <OppfolgingsplanPageSM page={Page.SEPLANEN}>hei</OppfolgingsplanPageSM>
  );
};

export default Seplanen;
