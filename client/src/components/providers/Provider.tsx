import React, { ReactNode } from 'react';
import { AuthProvider } from '../../contexts/AuthContext'; // Import the AuthProvider

interface ProvidersProps {
  children: ReactNode; // Explicitly define 'children' type
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default Providers;
