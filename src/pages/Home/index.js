import React from 'react';
import Header from "../../components/header";
import StickyHeadTable from '../../components/Table';
import Footer from "../../components/footer";
const HomePage = ({rowsEN, rowsVN}) => {
    return (
        <div>
            <StickyHeadTable rowsVN={rowsVN} rowsEN={rowsEN}></StickyHeadTable>
            <Footer></Footer>
        </div>
    );
}

export default HomePage;
