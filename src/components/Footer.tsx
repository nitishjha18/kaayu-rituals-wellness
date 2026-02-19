import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    {/* Main Footer */}
    <div className="bg-kaayu-primary py-20">
      <div className="kaayu-container grid grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="font-heading text-2xl font-bold text-white tracking-wider mb-3">
            KAAYU<span className="text-kaayu-accent">.</span>
          </div>
          <p className="text-white/70 text-sm font-body leading-relaxed mb-6">
            Modern Ayurvedic Rituals for Everyday Balance
          </p>
          <div className="flex gap-3 mb-6">
            {['FB', 'IG'].map(s => (
              <a key={s} href="#" className="w-9 h-9 rounded-full border border-kaayu-accent flex items-center justify-center text-kaayu-accent text-xs font-bold hover:bg-kaayu-accent hover:text-white hover:scale-110 transition-all">
                {s}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            {['Visa', 'MC', 'UPI', 'Rupay'].map(p => (
              <span key={p} className="text-white/50 text-[10px] border border-white/20 rounded px-2 py-1 font-body">{p}</span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-kaayu-accent text-xs font-bold uppercase tracking-widest mb-6 font-body">Quick Links</h4>
          {[
            { label: 'Home', to: '/' },
            { label: 'About Us', to: '/about' },
            { label: 'Track Orders', to: '#' },
            { label: 'Contact', to: '/contact' }
          ].map(link => (
            <Link key={link.label} to={link.to}
              className="block text-white/80 text-sm font-body mb-3 hover:text-kaayu-accent hover:pl-1 transition-all">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-kaayu-accent text-xs font-bold uppercase tracking-widest mb-6 font-body">Policies</h4>
          {['Terms & Conditions', 'Privacy Policy', 'Shipping Policy', 'Refund Policy'].map(p => (
            <a key={p} href="#" className="block text-white/80 text-sm font-body mb-3 hover:text-kaayu-accent hover:pl-1 transition-all">
              {p}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-kaayu-accent text-xs font-bold uppercase tracking-widest mb-6 font-body">Contact Us</h4>
          <div className="space-y-3">
            {[
              { icon: '📍', text: '26 New Arya Nagar, Meerut Rd, Ghaziabad UP 201301' },
              { icon: '📞', text: '+91 120-4182651' },
              { icon: '✉', text: 'hello@kaayurituals.com' },
              { icon: '🏭', text: 'FSSAI: 12725998000792' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 text-white/80 text-sm font-body">
                <span className="text-kaayu-accent shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-kaayu-primary border-t border-kaayu-accent/30 py-6">
      <div className="kaayu-container flex items-center justify-between">
        <span className="text-white/50 text-xs font-body">© 2026 Kaayu Rituals Private Limited. All Rights Reserved.</span>
        <span className="text-white/50 text-xs font-body">🌿 Crafted with care in India</span>
      </div>
    </div>
  </footer>
);

export default Footer;
