import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Modal } from 'react-bootstrap';
import { faAngleDoubleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ListCurrency from './components/ListCurrency';
import HeroImage from './images/hero.jpg';
import './ConvertMoney.css';

const FIXER_API_KEY = process.env.REACT_APP_FIXER_API_KEY;
const FIXER_URL = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;


const ConvertMoney = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CAD');
  const [loading, setLoading] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setFormValidated(true);
    convert();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAmount(1);
    setFromCurrency('USD');
    setToCurrency('CAD');
    setFormValidated(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value.replace(/\D/, ''));
  };

  const convert = () => {
    setFormValidated(true);
    setLoading(true);

    axios.get(FIXER_URL)
      .then(res => {
        const cotacao = getQuotation(res.data);
        if (cotacao) {
          setConversionResult(`${amount} ${fromCurrency} = ${cotacao} ${toCurrency}`);
          setShowModal(true);
          setLoading(false);
          setError(false);
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  };

  const getQuotation = (quoteData) => {
    if (!quoteData || quoteData.success !== true) {
      return false;
    }
    const quotationOf = quoteData.rates[fromCurrency];
    const quotationFor = quoteData.rates[toCurrency];
    const quotation = (1 / quotationOf * quotationFor) * amount;
    return quotation.toFixed(2);
  };

  const showError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <div className="convert-money-container" data-testid="convert-money-container">
      <section className="hero-section">
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>Your Currency Converter</h1>
          <p>Convert money easily with this tool</p>
        </div>
      </section>
      <Alert variant="danger" show={error}>
        Error fetching conversion rate!
      </Alert>
      <form className={`convert-money-form ${formValidated ? 'was-validated' : ''}`} onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="number"
            className={`amount-input ${formValidated && !amount ? 'is-invalid' : ''}`}
            placeholder="0"
            value={amount}
            onChange={handleAmountChange}
            required
          />
          <select
            className={`currency-select ${formValidated && !fromCurrency ? 'is-invalid' : ''}`}
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            required
          >
            <ListCurrency displayDescriptions={true} />
          </select>
          <div className="icon-container">
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </div>
          <select
            className={`currency-select ${formValidated && !toCurrency ? 'is-invalid' : ''}`}
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            required
          >
            <ListCurrency displayDescriptions={true} />
          </select>
          <button type="submit" className="convert-button" disabled={loading}>
            {loading && <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '5px' }} />}
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </div>
      </form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conversion Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {conversionResult}
        </Modal.Body>
        <Modal.Footer>
          <button variant="success" type="button" className="btn btn-primary" onClick={handleCloseModal}>
            New Conversion
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConvertMoney;
