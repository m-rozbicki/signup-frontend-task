import React from 'react';
import { Route, Routes, RoutesProps } from 'react-router-dom';
import { Hello } from './hello/Hello.component';

const AuthenthicatedApp = (props: RoutesProps) => (
  <Routes {...props}>
    <Route path="*" element={<Hello />} />
  </Routes>
);

export {
  AuthenthicatedApp,
};
