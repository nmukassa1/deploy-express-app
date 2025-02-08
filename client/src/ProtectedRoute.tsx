import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import api from './lib/api';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { isSignedIn, isLoaded } = useAuth();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/'); // Redirect only when Clerk has finished loading
        }
        
        if (isSignedIn) {
            // Store user details in database. 
            // This is only for testing purposes. I would use either clerk webhook in dashboard or use clerk on backend to handle signup and signin
            api.post('/store-user')
        }
    }, [isSignedIn, isLoaded, navigate]);

    if (!isLoaded) {
        return <div>Loading...</div>; // Show loading screen while Clerk is still determining auth state
    }

    if (!isSignedIn) {
        return null; // Prevents rendering protected content before redirect happens
    }

    return <>{children}</>;
};

export default ProtectedRoute;