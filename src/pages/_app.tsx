import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import styled, {createGlobalStyle} from "styled-components";

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
  background-color: var(--navds-global-color-gray-100);
`;

const InnerContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const minutesToMillis = (minutes: number) => {
    return 1000 * 60 * minutes;
};

function MyApp({Component, pageProps}: AppProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                cacheTime: minutesToMillis(60),
                staleTime: minutesToMillis(30),
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            {/*{isAudienceSykmeldt ? (*/}
            {/*    <BreadcrumbsAppenderSM />*/}
            {/*) : (*/}
            {/*    <BreadcrumbsAppenderAG />*/}
            {/*)}*/}
            <ContentWrapperStyled>
                {/*<NotificationBar />*/}
                <InnerContentWrapperStyled>
                    <Component {...pageProps} />
                </InnerContentWrapperStyled>
            </ContentWrapperStyled>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default MyApp;
