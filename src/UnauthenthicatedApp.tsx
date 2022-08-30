import React from 'react';
import { Route, Routes, RoutesProps } from 'react-router-dom';
import { Signin } from './signin/Signin/Signin.component';
import { Signup } from './signup/Signup/Signup.component';

const UnauthenthicatedApp = (props: RoutesProps) => (
  <Routes {...props}>
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<Signin />} />
  </Routes>
);

export {
  UnauthenthicatedApp,
};
