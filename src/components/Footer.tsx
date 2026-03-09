import React from 'react';
import { HelpCircle, Truck, FlaskConical, Heart, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 pt-16 pb-8 border-t border-charcoal-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src="/sereneva-logo.png"
              alt="Sereneva"
              className="h-14 w-auto object-contain bg-white rounded-lg p-2"
            />
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
              Quality peptides for your wellness journey. Lab-tested, high-purity formulations you can trust.
            </p>
          </div>



          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">Quick Links</h3>
            <a
              href="#"
              className="text-charcoal-300 hover:text-blush-400 transition-colors flex items-center gap-2 text-sm"
            >
              <FlaskConical className="w-4 h-4" />
              Products
            </a>
            <a
              href="/track-order"
              className="text-charcoal-300 hover:text-blush-400 transition-colors flex items-center gap-2 text-sm"
            >
              <Truck className="w-4 h-4" />
              Track Order
            </a>
            <a
              href="/faq"
              className="text-charcoal-300 hover:text-blush-400 transition-colors flex items-center gap-2 text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">Contact Us</h3>
            <div className="text-charcoal-300 flex items-center gap-2 text-sm flex-wrap max-w-[200px]">
              <Phone className="w-4 h-4 shrink-0" />
              <span>09983330683</span>
            </div>
            <div className="text-charcoal-300 flex items-start gap-2 text-sm max-w-[200px] md:text-left text-center">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Dasmariñas City, Cavite</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal-800 mb-6" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            Made with
            <Heart className="w-3 h-3 text-gray-400" fill="currentColor" />
            © {currentYear} Sereneva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
