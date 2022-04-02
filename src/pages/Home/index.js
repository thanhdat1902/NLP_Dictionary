import React from 'react';
import Header from "../../components/header";
import StickyHeadTable from '../Table';
import Footer from "../../components/footer";
const HomePage = (props) => {
    return (
        <div>
            <Header></Header>
            Home
            <StickyHeadTable></StickyHeadTable>
            <Footer></Footer>
        </div>
    );
}

export default HomePage;
