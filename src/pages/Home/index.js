import React from 'react';
import Header from "../../components/header";
import StickyHeadTable from '../Table';
const HomePage = (props) => {
    return (
        <div>
            <Header></Header>
            Home
            <StickyHeadTable></StickyHeadTable>
        </div>
    );
}

export default HomePage;