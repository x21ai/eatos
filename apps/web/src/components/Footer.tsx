// @ts-nocheck
'use client';

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  FileText,
  BookOpen,
  CalendarCheck,
  HelpCircle,
} from 'lucide-react';

// Brand icons removed from lucide-react v1.x, replaced with inline SVGs
function TwitterIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function FacebookIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

// Social channels: handle is @myeatOS across all platforms
const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/myeatos',
    Icon: FacebookIcon,
  },
  { label: 'X / Twitter', href: 'https://twitter.com/myeatos', Icon: TwitterIcon },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/myeatos',
    Icon: InstagramIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/eatos',
    Icon: LinkedinIcon,
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@myeatos', Icon: YoutubeIcon },
];

const OFFICES = [
  {
    city: 'San Francesco',
    address: '20289 Stevens Creek Blvd, PH 1019',
    state: 'Cupertino, CA 95014',
  },
  {
    city: 'Miami',
    address: '1111 Brickell Ave, FL 10',
    state: 'Miami, FL 33131',
  },
  {
    city: 'Los Angeles',
    address: '750 N. San Vicente Blvd, Ste 800',
    state: 'Los Angeles, CA 90048',
  },
  {
    city: 'Houston',
    address: '21755 Interstate 45, Bldg 1 Ste 107',
    state: 'Spring, TX 77388',
  },
];

const CONTACT_CHANNELS = [
  {
    label: 'Call Us',
    detail: '+1 (844) 563-2867',
    href: 'tel:+18445632867',
    Icon: Phone,
  },
  {
    label: 'Email Us',
    detail: 'cs@eatos.com',
    href: 'mailto:cs@eatos.com',
    Icon: Mail,
  },
  {
    label: 'WhatsApp',
    detail: 'Chat on WhatsApp',
    href: 'https://wa.me/18445632867',
    Icon: MessageCircle,
  },
  {
    label: 'Help Center',
    detail: 'Browse articles',
    href: 'https://support.eatos.com/en-us/',
    Icon: HelpCircle,
  },
];

export default function Footer({ variant = 'light' }) {
  const isDark = variant === 'dark';

  const bgClass = isDark ? 'bg-black border-white/5' : 'bg-white border-gray-100';
  const headingClass = isDark
    ? 'text-[11px] font-bold tracking-widest text-gray-300 uppercase'
    : 'text-[11px] font-bold tracking-widest text-[#1d1d1f] uppercase';
  const linkClass = isDark
    ? 'text-[14px] leading-6 text-gray-400 transition-colors duration-200 hover:text-white hover:underline underline-offset-4 decoration-white/40'
    : 'text-[14px] leading-6 text-[#424245] transition-colors duration-200 hover:text-black hover:underline underline-offset-4 decoration-black/30';
  const descClass = isDark
    ? 'text-[14px] leading-6 text-gray-500'
    : 'text-[14px] leading-6 text-[#6e6e73]';
  const socialClass = isDark
    ? 'text-gray-500 hover:text-white transition-colors'
    : 'text-[#6e6e73] hover:text-black transition-colors';
  const bottomBorder = isDark ? 'border-white/5' : 'border-gray-200';
  const bottomText = isDark ? 'text-gray-600 text-[12px]' : 'text-[#6e6e73] text-[12px]';
  const bottomLink = isDark
    ? 'hover:text-white transition-colors'
    : 'hover:text-black transition-colors';
  const divider = isDark ? 'border-white/5' : 'border-gray-100';
  const contactCard = isDark
    ? 'bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 flex items-start gap-3'
    : 'bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-3 flex items-start gap-3';
  const iconColor = isDark ? 'text-gray-400' : 'text-[#6e6e73]';
  const addrLabel = isDark
    ? 'text-[12px] font-semibold text-gray-400'
    : 'text-[12px] font-semibold text-[#1d1d1f]';
  const addrText = isDark ? 'text-[12px] text-gray-600' : 'text-[12px] text-[#6e6e73]';

  const logoSrc = isDark
    ? 'https://ucarecdn.com/03d261bb-af6b-4183-a35c-afdbb7e1a2b7/-/format/auto/'
    : 'https://ucarecdn.com/4352d127-4bf5-42cf-a022-3110926687de/-/format/auto/';

  return (
    <footer className={`${bgClass} border-t pt-16 pb-8`}>
      <div className="site-container">
        {/* ── Top: brand / offices  +  contact channels ── */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 pb-12 border-b ${divider} mb-12`}>
          {/* Left: logo · description · social · offices */}
          <div>
            <a href="/" className="inline-block mb-5">
              <img src={logoSrc} alt="eatOS" className="h-9 w-auto" />
            </a>
            <p className={`${descClass} max-w-sm mb-6`}>
              The operating system for the modern restaurant, built for the way hospitality actually
              works.
            </p>

            <div className="flex items-center gap-4 mb-8">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={socialClass}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFICES.map(({ city, address, state }) => (
                <div key={city} className="flex items-start gap-2">
                  <MapPin size={13} className={`${iconColor} mt-0.5 flex-shrink-0`} />
                  <div>
                    <div className={addrLabel}>{city}</div>
                    <div className={addrText}>{address}</div>
                    <div className={addrText}>{state}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact channels + CTAs */}
          <div>
            <h4 className={`${headingClass} mb-5`}>Get in touch</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {CONTACT_CHANNELS.map(({ label, detail, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className={contactCard}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Icon size={16} className={`${iconColor} mt-0.5 flex-shrink-0`} />
                  <div>
                    <div
                      className={`text-[12px] font-semibold ${isDark ? 'text-gray-300' : 'text-[#1d1d1f]'}`}
                    >
                      {label}
                    </div>
                    <div className={`text-[12px] ${isDark ? 'text-gray-500' : 'text-[#6e6e73]'}`}>
                      {detail}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/book-demo"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                <CalendarCheck size={13} /> Book a Demo
              </a>
              <a
                href="/contact-sales"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold border transition-all ${isDark ? 'border-white/20 text-gray-300 hover:border-white/40' : 'border-gray-300 text-[#424245] hover:border-gray-500'}`}
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {/* Platform */}
          <div>
            <h4 className={`${headingClass} mb-5`}>Platform</h4>
            <ul className="space-y-3">
              {[
                { label: 'Point of Sale', href: '/point-of-sale' },
                { label: 'Payments', href: '/accept-payments' },
                { label: 'Intelligence', href: '/ai' },
                { label: 'Hardware', href: '/hardware' },
                { label: 'Tap to Pay', href: '/tap-to-pay' },
                { label: 'Platform', href: '/platform' },
                { label: 'Enterprise', href: '/enterprise' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className={`${headingClass} mb-5`}>Products</h4>
            <ul className="space-y-3">
              {[
                {
                  label: 'Kitchen Display',
                  href: '/products/kitchen-display-system',
                },
                {
                  label: 'Self-Service Kiosk',
                  href: '/products/self-service-kiosk',
                },
                { label: 'Handheld', href: '/products/point-of-purchase' },
                {
                  label: 'Customer Display',
                  href: '/products/customer-facing-display',
                },
                {
                  label: 'Online Ordering',
                  href: '/products/apponlineorderingdelivery',
                },
                {
                  label: 'Inventory',
                  href: '/products/simplified-inventory-management',
                },
                { label: 'Workforce', href: '/products/workforce-management' },
                { label: 'Analytics', href: '/products/reporting-analytics' },
                { label: 'Loyalty', href: '/products/loyalty' },
                { label: 'Gift Cards', href: '/products/giftcards' },
                { label: 'Marketing', href: '/products/automated-marketing' },
                {
                  label: 'Tableside',
                  href: '/products/tableside-order-and-pay',
                },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className={`${headingClass} mb-5`}>Solutions</h4>
            <ul className="space-y-3">
              {[
                { label: 'Quick Service', href: '/solutions/quick-service' },
                { label: 'Full Service', href: '/solutions/full-service' },
                { label: 'Fast Casual', href: '/solutions/fast-casual' },
                { label: 'Café', href: '/solutions/cafe' },
                { label: 'Bar & Nightclub', href: '/solutions/bar' },
                { label: 'Food Truck', href: '/solutions/food-truck' },
                { label: 'Ghost Kitchen', href: '/solutions/ghost-kitchen' },
                { label: 'Catering', href: '/solutions/catering' },
                { label: 'Enterprise', href: '/solutions/enterprise' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`${headingClass} mb-5`}>Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Partners', href: '/partners' },
                { label: 'Customers', href: '/customers' },
                { label: 'Contact Sales', href: '/contact-sales' },
                { label: 'Report Fraud', href: '/report-fraud' },
                { label: 'Newsroom', href: '/blog' },
                { label: 'Comparison', href: '/comparison' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`${headingClass} mb-5`}>Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '/blog' },
                { label: 'Brochures', href: '/brochures' },
                { label: 'Book a Demo', href: '/book-demo' },
                { label: 'Get Started', href: '/get-started' },
                {
                  label: 'Help Center',
                  href: 'https://support.eatos.com/en-us/',
                  external: true,
                },
                {
                  label: 'Status',
                  href: 'https://status.eatos.com/en/',
                  external: true,
                },
                {
                  label: 'Dashboard',
                  href: 'https://dashboard.eatos.com/',
                  external: true,
                },
              ].map(({ label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={linkClass}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`${headingClass} mb-5`}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/products" className={`${linkClass} flex items-center gap-2`}>
                  <FileText size={13} className="flex-shrink-0" /> Product Overview
                </a>
              </li>
              <li>
                <a href="/pricing" className={`${linkClass} flex items-center gap-2`}>
                  <FileText size={13} className="flex-shrink-0" /> Pricing Guide
                </a>
              </li>
              <li>
                <a href="/enterprise" className={`${linkClass} flex items-center gap-2`}>
                  <BookOpen size={13} className="flex-shrink-0" /> Enterprise
                </a>
              </li>
              <li>
                <a href="/hardware" className={`${linkClass} flex items-center gap-2`}>
                  <BookOpen size={13} className="flex-shrink-0" /> Hardware Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Legal strip ── */}
        <div
          className={`border-t ${bottomBorder} pt-6 flex flex-col md:flex-row justify-between items-center gap-4 ${bottomText}`}
        >
          <p suppressHydrationWarning>
            &copy; 2026 <strong>eatOS POS Inc.</strong> All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="/privacy" className={bottomLink}>
              Privacy Policy
            </a>
            <a href="/terms" className={bottomLink}>
              Terms of Service
            </a>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('eatos_cookie_consent');
                  window.dispatchEvent(new Event('openCookieBanner'));
                }
              }}
              className={`${bottomLink} bg-transparent border-0 cursor-pointer p-0 text-[12px]`}
            >
              Cookie Settings
            </button>
          </div>
          <p className="flex items-center gap-1">🌍 United States · EN</p>
        </div>
      </div>
    </footer>
  );
}
