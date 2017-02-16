import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostListing from './components/post_listing';
import Categories from './components/categories';
import Category from './components/category';
import UploadPage from './components/upload_page';
import TestComponent from './components/test_component';
import RegisterPage from './components/auth/register_page';
import LoginPage from './components/auth/login_page';
import Logout from './components/auth/logout';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostListing}/>
    <Route path='/categories' component={Categories} />
    <Route path='/categories/:category' component={Category} />
    <Route path='/upload' component={UploadPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/logout' component={Logout} />
    <Route path='/testarea' component={TestComponent} />
  </Route>
);
