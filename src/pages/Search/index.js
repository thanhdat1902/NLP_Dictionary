import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SearchForm from "../../components/searchform"

const SearchPage = (props) => {
    return (
        <div>
            <Header></Header>
            <SearchForm></SearchForm>
            <Footer></Footer>
        </div>
    );
}

export default SearchPage;
