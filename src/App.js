import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import SearchPage from "./pages/Search";
import PageNotFound from "./pages/NotFound";
import {useEffect, useState} from 'react';
import DataUtils from './utils/utils.js';
import StatisticsPage from "./pages/Statistics";
import Header from "./components/header";
function App() {
  const [rowsVN, setRowsVN] = useState([]);
  const [rowsEN, setRowsEN] = useState([]);
  const [statsVN, setStatsVN] = useState([]);
  const [statsEN, setStatsEN] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let tmp = await DataUtils.getListVNSentence();
      let tmp2 = await DataUtils.getListENSentence();
      setRowsVN(tmp);
      setRowsEN(tmp2);

      let tmp3 = await DataUtils.getStatsDict('data/vn.json');
      tmp3 = await DataUtils.getStatsData(tmp3);
      setStatsVN(tmp3);

      let tmp4 = await DataUtils.getStatsDict('data/en.json');
      tmp4 = await DataUtils.getStatsData(tmp4);
      setStatsEN(tmp4);

    }
    fetchData();
}, []);
  return (
    <>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<HomePage rowsVN={rowsVN} rowsEN={rowsEN}/>} />
        <Route path="/search" element={<SearchPage rowsVN={rowsVN} rowsEN={rowsEN}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/statistics" element={<StatisticsPage statsEN = {statsEN} statsVN = {statsVN}/>} />
        <Route path="*" element={ <PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
