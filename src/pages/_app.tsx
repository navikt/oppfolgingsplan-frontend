import "../styles/globals.css";
import type { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import { useAudience } from "@/common/hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "@/common/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "@/common/breadcrumbs/BreadcrumbsAppenderAG";

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const { isAudienceSykmeldt } = useAudience();

  return (
    <>
      <GlobalStyle />
      {isAudienceSykmeldt ? (
        <BreadcrumbsAppenderSM />
      ) : (
        <BreadcrumbsAppenderAG />
      )}
      <ContentWrapperStyled>
        {/*<NotificationBar />*/}
        <InnerContentWrapperStyled>
          <main role="main">
            <Component {...pageProps} />
          </main>
        </InnerContentWrapperStyled>
      </ContentWrapperStyled>
    </>
  );
}

export default MyApp;
