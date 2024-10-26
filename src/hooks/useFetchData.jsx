import { useEffect, useState } from 'react';

const useFetchData = (country) => {
  const [result, setResult] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (country) {
      fetchDataFromApi();
    } else {
      fetchDataFromLocalStorage();
    }
  }, []);

  const fetchDataFromApi = () => {
    let url = 'https://restcountries.com/v3.1/all';
    setIsLoading(true);

    if (country) {
      url = `https://restcountries.com/v3.1/name/${country}`;
    }
    fetch(url)
      .then((res) =>
        res.json().then((data) => {
          if (country) {
            setResult(data[0]);
          } else {
            setResult(data);
            setFilteredCountries(data);
            localStorage.setItem('countries', JSON.stringify(data));
          }
        })
      )
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  const fetchDataFromLocalStorage = () => {
    let data = JSON.parse(localStorage.getItem('countries'));
    if (data) {
      setResult(data);
      setFilteredCountries(data);
    } else {
      fetchDataFromApi();
    }
  };

  return {
    result,
    filteredCountries,
    setFilteredCountries,
    isLoading,
    isError,
  };
};
export default useFetchData;
