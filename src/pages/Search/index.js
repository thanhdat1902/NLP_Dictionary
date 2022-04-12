import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SearchForm from "../../components/searchform";
import TableSearch from "../../components/searchTable";
import DataUtils from "../../utils/utils";

const SearchPage = ({rowsEN, rowsVN}) => {
    const [rowsSrc, setRowsSrc] = React.useState([]);
    const [rowsTar, setRowsTar] = React.useState([]);
    const [typeSearch, setTypeSearch] = React.useState('Match');
    const getSearchPayload = async (language, keyword, searchType) => {
        if(!searchType) {
            setRowsSrc([]);
            setRowsTar([]);
            return;
        }
        if(searchType === 'match') {
            const searchList = await DataUtils.searchByMatch(language, keyword, rowsVN, rowsEN);
            setTypeSearch('Match');
            setRowsSrc(searchList.Src);
            setRowsTar(searchList.Tar);

        } else {
            const searchList = await DataUtils.searchByPhrase(language, keyword, rowsVN, rowsEN);
            setTypeSearch('Phrase');
            setRowsSrc(searchList.Src);
            setRowsTar(searchList.Tar);
        }
    }
    return (
        <div style={{position: 'relative', minHeight: 'calc(100vh - 150px)'}}>
            <SearchForm getSearchPayload={getSearchPayload}></SearchForm>
            <TableSearch rowsSrc={rowsSrc} rowsTar={rowsTar} typeSearch={typeSearch}></TableSearch>
            <Footer key={rowsSrc.length}></Footer>
        </div>
    );
}

export default SearchPage;
