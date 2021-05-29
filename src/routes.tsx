import React from 'react';
import PrivateRoutes from './privateRoutes';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './views/pages/Login';
import Home from './views/pages/Home';
import Client from './views/pages/Client';
import Pro from './views/pages/Pro';
import Teste from './views/pages/Teste';
import Config from './views/pages/Config';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/teste" component={Teste} />
        <PrivateRoutes path="/client" component={Client} />
        <PrivateRoutes path="/pro" component={Pro} />
        <PrivateRoutes path="/config" component={Config} />
        <PrivateRoutes path="/Home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;