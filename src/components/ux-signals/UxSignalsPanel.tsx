import useUxSignals from "../../hooks/useUxSignals";

const UxSignalsPanel = () => {
  useUxSignals(true);

  return (
    <div
      data-uxsignals-embed="panel-hs78z2ahch"
      style={{ marginBottom: "2rem" }}
    />
  );
};

export default UxSignalsPanel;
