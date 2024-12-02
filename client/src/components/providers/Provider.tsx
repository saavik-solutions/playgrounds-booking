
import { AuthProvider } from '../../contexts/AuthContext'; // Import the AuthProvider

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
