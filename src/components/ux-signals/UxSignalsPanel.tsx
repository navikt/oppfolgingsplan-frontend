import useUxSignals from "../../hooks/useUxSignals";

const panelId = "hs78z2ahch";
const enableDemoMode = false;

const UxSignalsPanel = () => {
  useUxSignals(true);

  return (
    <div
      data-uxsignals-embed={`panel-${panelId}`}
      data-uxsignals-mode={enableDemoMode ? "demo" : ""}
      style={{ marginBottom: "2rem" }}
    />
  );
};

export default UxSignalsPanel;
