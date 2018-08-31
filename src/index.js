import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { GOOGLE_ANALYTICS_ID } from './constants';

// Google Analytics loading
if (process.env.NODE_ENV === "production") {
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GOOGLE_ANALYTICS_ID);
} else {
  console.info("Not loading Google Analytics in " + process.env.NODE_ENV + " environment")
}

// Main render action
ReactDOM.render(<App />, document.getElementById('root'));
