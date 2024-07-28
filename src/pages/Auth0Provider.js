import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import index from '../index';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-an4h3iea72pdgq3t.uk.auth0.com"
    clientId="TFGZh1cX2WM6yZ51aK8a5eGm2z2wETTU"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <index />
  </Auth0Provider>,
);