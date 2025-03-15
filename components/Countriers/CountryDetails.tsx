import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./../Skeleton/Loader";

interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital?: string[];
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
}

const CountryDetails = ({ countries }: { countries: Country[] }) => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const foundCountry = countries.find((c) => c.cca3 === cca3);
      setCountry(foundCountry || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [cca3, countries]);

  if (loading) return <Loader />;

  if (!country) {
    return <p className="text-center mt-6 text-red-500 font-semibold">Country not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#5f27cd] font-medium hover:underline">
          ⬅ Back to Home
        </Link>

        {/* Country Flag */}
        <div className="flex flex-col md:flex-row mt-6 gap-6">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full md:w-1/2 h-60 object-cover rounded-lg shadow-md"
          />

          {/* Country Details */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">{country.name.common}</h2>
            <p className="text-gray-600 mb-2"><strong>Official Name:</strong> {country.name.official}</p>
            <p className="text-gray-600 mb-2"><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p className="text-gray-600 mb-2"><strong>Region:</strong> {country.region}</p>
            <p className="text-gray-600 mb-2"><strong>Subregion:</strong> {country.subregion}</p>
            <p className="text-gray-600 mb-2"><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            <p className="text-gray-600 mb-2"><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
            <p className="text-gray-600"><strong>Currencies:</strong> {Object.values(country.currencies || {}).map((c) => c.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
