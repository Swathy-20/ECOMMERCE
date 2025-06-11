import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 px-6 md:px-16 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h1 className="text-white text-xl font-bold mb-2">ShopNest</h1>
          <p className="text-sm">
            A new way to explore products and stories. Built for creators and customers.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">Categories</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-neutral-700 pt-6 text-sm text-neutral-400 text-center">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
};

