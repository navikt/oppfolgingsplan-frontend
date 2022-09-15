import React, {ReactElement} from 'react';
import Head from 'next/head'
// import Brodsmuler from '../components/Brodsmuler';

interface SideProps {
    tittel: string;
    brodsmuler: any;
    children: ReactElement;
}

const Side = ({tittel, brodsmuler, children}: SideProps): ReactElement => {
    return (
        <>
            <Head>
                <title>{tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}</title>
            </Head>
            <div className={'side__innhold side__innhold--begrenset'}>
                {/*<Brodsmuler brodsmuler={brodsmuler}/>*/}
                {children}
            </div>
        </>
    );
};

export default Side;
