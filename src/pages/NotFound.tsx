import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-bold text-partner-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Button onClick={() => navigate('/dashboard')}>Go to Dashboard Home</Button>
    </div>
  );
};

export default NotFound;
