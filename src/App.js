import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import SearchPage from "./pages/Search";
import PageNotFound from "./pages/NotFound";
import {useEffect, useState} from 'react';
import DataUtils from './utils/utils.js';
function App() {
  const [rowsVN, setRowsVN] = useState([]);
  const [rowsEN, setRowsEN] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      let tmp = await DataUtils.getListVNSentence();
      let tmp2 = await DataUtils.getListENSentence();
      setRowsVN(tmp);
      setRowsEN(tmp2);
    }
    fetchData();
}, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage rowsVN={rowsVN} rowsEN={rowsEN}/>} />
        <Route path="/search" element={<SearchPage rowsVN={rowsVN} rowsEN={rowsEN}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={ <PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
