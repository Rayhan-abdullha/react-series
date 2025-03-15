import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from './../components/Countriers/CountryDetails';
import ErrorBoundary from "./../components/Error/ErrorBoundry";
import NotFound from './../components/Error/NotFound';
const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home countries={countries} search={search} setSearch={setSearch} region={region} setRegion={setRegion} />}
        />
          <Route path="/country/:cca3" element={<CountryDetails countries={countries} />} />
          <Route path="*" element={<NotFound/>} />
      </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;