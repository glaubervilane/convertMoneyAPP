// HistoricalRatesForm.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Modal } from 'react-bootstrap';
import '../ConvertMoney.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ListCurrency, { getSortedCurrencyList } from '../components/ListCurrency';

const HistoricalRatesForm = ({ showModal, handleCloseModal }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [historicalResult, setHistoricalResult] = useState(null);
  const [error, setError] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormValidated(true);
    fetchHistoricalRates();
  };

  const fetchHistoricalRates = async () => {
    const options = {
      method: 'GET',
      url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/timeseries',
      params: {
        start_date: startDate,
        end_date: endDate,
        from: fromCurrency,
        to: toCurrency,
      },
      headers: {
        'X-RapidAPI-Key': '64f5b12c36mshda8a86d5b241d8fp1c681fjsn6386ebacada1',
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const rates = response.data?.rates;

      if (rates) {
        // Extract available currencies from the response
        const availableCurrencies = [
          ...new Set(Object.keys(rates).flatMap(date => Object.keys(rates[date])))
        ];
        setCurrencies(availableCurrencies);

        const result = {};

        // Iterate through each date
        for (const date in rates) {
          // Convert the rates based on the selected "from" currency
          const rateFromCurrency = rates[date][fromCurrency];
          const rateToCurrency = rates[date][toCurrency];
          const convertedRate = 1 / rateFromCurrency * rateToCurrency;

          // Store the result for the date
          result[date] = {
            [fromCurrency]: 1,
            [toCurrency]: convertedRate.toFixed(6), // Adjust the precision as needed
          };
        }

        setHistoricalResult(result);
        setError(false);
      } else {
        showError();
      }
    } catch (error) {
      showError();
    } finally {
      setLoading(false);
    }
  };

  const showError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="custom-title">Historical Exchange Rates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className={`historical-rates-form ${formValidated ? 'was-validated' : ''} custom-form`} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start-date">Start Date</label>
              <input
                id="start-date"
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end-date">End Date</label>
              <input
                id="end-date"
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="from-currency">From</label>
              <select
                id="from-currency"
                className="form-control"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                required
              >
                {getSortedCurrencyList().map((currency) => (
                  <option value={currency.acronym} key={currency.acronym}>
                    {`${currency.acronym} - ${currency.description}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="to-currency">To</label>
              <select
                id="to-currency"
                className="form-control"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                required
              >
                {getSortedCurrencyList().map((currency) => (
                  <option value={currency.acronym} key={currency.acronym}>
                    {`${currency.acronym} - ${currency.description}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <br />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '5px' }} />}
                {loading ? 'Fetching...' : 'Fetch Rates'}
              </button>
            </div>
          </div>
        </form>

        <Alert variant="danger" show={error}>
          Error fetching historical rates!
        </Alert>
        {/* Display historical result here */}
        {historicalResult && (
          <div>
            {/* Render historical rates as needed */}
            <h5>Historical Exchange Rates</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>{fromCurrency}</th>
                  <th>{toCurrency}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(historicalResult).map(([date, rates]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{rates[fromCurrency]}</td>
                    <td>{rates[toCurrency]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default HistoricalRatesForm;
