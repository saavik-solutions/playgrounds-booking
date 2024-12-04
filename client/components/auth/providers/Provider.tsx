
// Import the AuthProvider

import { AuthProvider } from "@/contexts/AuthContext";

interface ProvidersProps {
  children: React.ReactNode; 
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>

        {children}

    </AuthProvider>
  );
};

export default Providers;
