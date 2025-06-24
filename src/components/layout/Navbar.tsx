import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { AuthDialog } from '@/components/ui/auth-dialog';

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItems = [
    { name: 'Partners', href: '/#partners' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
  ];

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-wonder-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <AuthDialog />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleNavbar}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">{isNavOpen ? 'Close menu' : 'Open menu'}</span>
              {isNavOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isNavOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-wonder-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsNavOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-3 space-y-3">
              <AuthDialog />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
