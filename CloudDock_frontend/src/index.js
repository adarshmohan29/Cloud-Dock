import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
   <Auth0Provider 
    domain='vedacr.us.auth0.com'
    clientId='bZqBhkrrnx8rJ6RL2CSIpP1ZQD1AyzdQ'
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
