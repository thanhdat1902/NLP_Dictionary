import React from "react";
import StatisticsForm from "../../components/statisticsForm";
import StatisticsTable from "../../components/statisticsTable";
import Footer from "../../components/footer";
import Header from "../../components/header";
import DataUtils from "../../utils/utils";
const StatisticsPage = ({statsEN, statsVN}) => {
    const [rowsStats, setRowsStats] = React.useState([]);
    const getSearchPayload = async (language, keyword, sortBy) => {
        if (language === 'VN')
        {
            const searchList = await DataUtils.searchStats(keyword, sortBy, statsVN);
            console.log(searchList);
            setRowsStats(searchList);
        }
        else 
        {
            const searchList = await DataUtils.searchStats(keyword, sortBy, statsEN);
            console.log(searchList);
            setRowsStats(searchList);
        }
    }
    return (
        <div>
        <Header></Header>
        <StatisticsTable rowsStats = {rowsStats}></StatisticsTable>
        <StatisticsForm getSearchPayload={getSearchPayload}></StatisticsForm>
        <Footer></Footer>
        </div>
    );
}

export default StatisticsPage;