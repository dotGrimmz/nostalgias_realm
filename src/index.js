/*!



*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/react-demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages

import Layout from './Layout/Layout';
import LandingPage from './LandingPage/LandingPage';
import ContextImplementation from '../src/context/ContextImplementation';
import CatalogItemPage from './CatalogItemPage/CatalogItemPage.jsx';
import { SnackbarProvider } from 'notistack';

import '@fontsource/roboto';


// others

ReactDOM.render(
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

            <Redirect to="/home" />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ContextImplementation>
  </SnackbarProvider>
  ,
  document.getElementById("root")
);
