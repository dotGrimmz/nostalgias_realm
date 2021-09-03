/*!



*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/react-demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages

import Layout from './Layout/Layout';
import LandingPage from './LandingPage/LandingPage';
import CatalogPage from "CatalogPage/CatalogPage";
import ContextImplementation from '../src/context/ContextImplementation';
import CatalogItemPage from './CatalogItemPage/CatalogItemPage.jsx';
import CheckoutPage from './CheckoutPage/CheckoutPage.jsx';
import PaymentReviewPage from './PaymentReviewPage/PaymentReviewPage.jsx';
import ContactUsPage from "ContactUsPage/ContactUsPage";
import { SnackbarProvider } from 'notistack';


import '@fontsource/roboto';


// others
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


ReactDOM.render(
  <Elements stripe={promise}>

    <SnackbarProvider>
      <ContextImplementation>

        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                path="/home"
                render={(props) => <LandingPage {...props} />}
              />
              <Route
                path="/item/:id"
                render={(props) => <CatalogItemPage {...props} />}
              />
              <Route
                path="/checkout"
                render={(props) => <CheckoutPage {...props} />}
              />
              <Route
                path="/paymentreview"
                render={(props) => <PaymentReviewPage {...props} />}
              />
               <Route
                path="/catelog/:category/:level"
                render={(props) => <CatalogPage {...props} />}
              />
               <Route
                path="/contact"
                render={(props) => <ContactUsPage {...props} />}
              />
              <Redirect to="/home" />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ContextImplementation>
    </SnackbarProvider>
  </Elements>

  ,
  document.getElementById("root")
);
