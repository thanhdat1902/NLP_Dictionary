import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import SearchPage from "./pages/Search";
import PageNotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={ <PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
