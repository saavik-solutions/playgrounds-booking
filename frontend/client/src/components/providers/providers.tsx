"use client"
import store from '@/redux/store';

import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
;

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
};

export default Provider;
