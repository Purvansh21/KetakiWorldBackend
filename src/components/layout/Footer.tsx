import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">MyPartner<span className="text-partner-400">KetakiWorld</span></h3>
            <p className="text-slate-300 mb-4">
              Transforming business travel for companies worldwide with our innovative B2B solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Press</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Resource Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Partners</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white">Security</a></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay updated</h4>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <form className="flex flex-col gap-2">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-r-none bg-slate-800 border-slate-700 text-white" 
                />
                <Button type="submit" className="rounded-l-none bg-wonder-600 hover:bg-wonder-700">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} MyPartnerKetakiWorld. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
