import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

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
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default MyApp;
