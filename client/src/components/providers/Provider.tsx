import React, { ReactNode } from 'react';
import { AuthProvider } from '../../contexts/AuthContext'; // Import the AuthProvider
import { Theme } from "@radix-ui/themes";
interface ProvidersProps {
  children: ReactNode; // Explicitly define 'children' type
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Theme>
        {children}
      </Theme>
    </AuthProvider>
  );
};

export default Providers;
