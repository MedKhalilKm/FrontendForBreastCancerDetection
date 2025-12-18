import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading text-xl font-semibold">OncoScan</span>
            </a>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Advancing breast cancer detection through artificial intelligence, 
              one scan at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {["Features", "How It Works", "Pricing", "Case Studies"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/60 hover:text-primary text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/60 hover:text-primary text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/60 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                hello@oncoscan.ai
              </li>
              <li className="flex items-center gap-3 text-background/60 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-3 text-background/60 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>123 Medical Drive<br />Boston, MA 02115</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2024 OncoScan. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/50 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/50 hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-background/50 hover:text-primary text-sm transition-colors">
              HIPAA Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
