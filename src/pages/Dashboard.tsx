import { useState } from 'react';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="dashboard-container flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
          <Logo size="small" />
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
            <Button variant="outline" onClick={handleSignOut} disabled={isSigningOut}>
              {isSigningOut ? 'Signing Out...' : 'Sign Out'}
            </Button>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 