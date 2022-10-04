import React, {ReactElement, ReactNode} from 'react';
import Head from 'next/head'
import AppSpinner from "@/common/components/spinner/AppSpinner";

interface SideProps {
    isLoading: boolean;
    tittel: string;
    children: ReactNode;
}

const Side = ({isLoading, tittel, children}: SideProps): ReactElement => {
    if (isLoading) {
        return <AppSpinner/>
    }

    return (
        <>
            <Head>
                <title>{tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}</title>
            </Head>
            <div>
                {children}
            </div>
        </>
    );
};

export default Side;
