import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./../../components/Skeleton/CountrySkeleton";

export interface Country {
    cca3: string;
    name: {
        common: string;
    };
    flags: {
        svg: string;
    };
    population: number;
    region: string;
    capital?: string[];
}

interface PropsType {
    countries: Country[];
    search: string;
    setSearch: (search: string) => void;
    region: string;
    setRegion: (region: string) => void;
}

const Home = ({ countries, search, setSearch, region, setRegion }: PropsType) => {
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 12;

    const filteredCountries = countries?.filter(
        (country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase()) &&
            (region ? country.region === region : true)
    );

    // Pagination Logic
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <h1 className="text-4xl font-bold text-center mb-6">World Explorer</h1>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
                <input
                    type="text"
                    placeholder="Search country..."
                    className="border border-gray-200 p-3 rounded w-72 shadow-md"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                />
                <select
                    className="border border-gray-200 p-3 rounded shadow-md"
                    onChange={(e) => {
                        setRegion(e.target.value);
                        setCurrentPage(1); // Reset to first page on filter change
                    }}
                >
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            {countries.length === 0 ? (
                <Skeleton />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                        {currentCountries.map((country) => (
                            <Link
                                key={country.cca3}
                                to={`/country/${country.cca3}`}
                                className="border border-gray-200 p-4 rounded bg-white shadow-lg hover:shadow-xl transition-all"
                            >
                                <img
                                    src={country.flags.svg}
                                    alt={country.name.common}
                                    className="w-full h-40 object-cover rounded"
                                />
                                <h2 className="text-xl font-semibold mt-3">{country.name.common}</h2>
                                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                                <p><strong>Region:</strong> {country.region}</p>
                                <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 gap-4">
                            <button
                                className="px-4 py-2 bg-[#5f27cd] cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed text-white"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </button>
                            <span className="text-lg font-semibold">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="px-4 py-2 bg-[#5f27cd] cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed text-white"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
