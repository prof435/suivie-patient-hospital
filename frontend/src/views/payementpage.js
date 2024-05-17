import React from 'react';
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Envoyer le paiement au backend pour traitement
      console.log(result.paymentMethod);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Page de Paiement</h1>
      <p style={styles.paragraph}>Merci de procéder au paiement.</p>
      {/* Formulaire de paiement */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <CardElement style={styles.cardElement} />
        <button type="submit" style={styles.button} disabled={!stripe}>
          Payer
        </button>
      </form>
      <p style={styles.paragraph}>Différents moyens de paiement :</p>
      {/* Images des moyens de paiement */}
      <div style={styles.paymentMethods}>
        <img src="/visa.png" alt="Visa" style={styles.paymentMethodImage} />
        <img src="/mastercard.png" alt="Mastercard" style={styles.paymentMethodImage} />
        <img src="/paypal.png" alt="PayPal" style={styles.paymentMethodImage} />
        <img src="/orange-money.png" alt="Orange Money" style={styles.paymentMethodImage} />
        <img src="/mtn-money.png" alt="MTN Mobile Money" style={styles.paymentMethodImage} />
      </div>
      {/* Lien pour retourner à la consultation */}
      <Link to="/" style={styles.link}>Retour à la consultation</Link>
    </div>
  );
};

export default PaymentPage;

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  form: {
    marginBottom: '20px',
  },
  cardElement: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  paymentMethods: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  paymentMethodImage: {
    width: '50px',
    height: 'auto',
    marginRight: '10px',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
