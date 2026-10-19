import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
   <Auth0Provider 
    domain='paste your Auth0 domain here'
    clientId='paste your Auth0 client ID here'
    redirectUri={"http://localhost:3000/"}
    >
      <React.StrictMode>
         <SimpleReactLightbox>
            <App />
         </SimpleReactLightbox>
      </React.StrictMode>
      </Auth0Provider>,
   document.getElementById("root")
);
reportWebVitals();
