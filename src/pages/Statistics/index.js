import React from "react";
import StatisticsForm from "../../components/statisticsForm";
import StatisticsTable from "../../components/statisticsTable";
import Footer from "../../components/footer";
import Header from "../../components/header";
import DataUtils from "../../utils/utils";
const StatisticsPage = ({ statsEN, statsVN }) => {
  const [rowsStats, setRowsStats] = React.useState([]);
  const getSearchPayload = async (language, keyword, sortBy) => {
    if (language === "VN") {
      const searchList = await DataUtils.searchStats(keyword, sortBy, statsVN);
      setRowsStats(searchList);
      console.log(searchList);
    } else {
      const searchList = await DataUtils.searchStats(keyword, sortBy, statsEN);
      setRowsStats(searchList);
    }
  };
  return (
    <div style={{position:'relative', minHeight: 'calc(100vh - 150px)'}}>
      <div style={{display: 'flex', alignItems: 'center' ,paddingRight: "30px", minHeight: 700}}>
        <StatisticsTable rowsStats={rowsStats}></StatisticsTable>
        <StatisticsForm getSearchPayload={getSearchPayload}></StatisticsForm>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default StatisticsPage;
