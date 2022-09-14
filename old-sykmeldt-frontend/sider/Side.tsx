import React, {ReactElement} from 'react';
import Head from 'next/head'
import Brodsmuler from '../components/Brodsmuler';
import {Row} from "@/common/old-designsystem/nav-frontend-grid/grid";

interface SideProps {
    tittel: string;
    brodsmuler: never;
    children: ReactElement;
}

const Side = ({tittel, brodsmuler, children}: SideProps): ReactElement => {
    return (
        <>
            <Head>
                <title>{tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}</title>
            </Head>
            <div className={'side__innhold side__innhold--begrenset'}>
                <Brodsmuler brodsmuler={brodsmuler}/>
                <Row>{children}</Row>
            </div>
        </>
    );
};

export default Side;
