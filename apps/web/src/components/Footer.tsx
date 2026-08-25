// @ts-nocheck
'use client';

import { ArrowRight, Globe } from 'lucide-react';
import mobileLogoWhite from './marketing/assets/brand/logo-mobile-white.png.asset.json';

function TwitterIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function FacebookIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}


// Social channels: handle is @myeatOS across all platforms
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/myeatos', Icon: FacebookIcon },
  { label: 'X / Twitter', href: 'https://twitter.com/myeatos', Icon: TwitterIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/myeatos', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/myeatos', Icon: LinkedinIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@myeatos', Icon: YoutubeIcon },
];

const OFFICES = [
  { city: 'Cupertino, CA', address: '20289 Stevens Creek Blvd PH 1019' },
  { city: 'Miami, FL', address: '1111 Brickell Ave FL 10' },
  { city: 'Los Angeles, CA', address: '750 N. San Vicente Blvd Ste 800' },
  { city: 'Houston, TX', address: '21755 Interstate 45, Bldg 1 Ste 107' },
];

const LINK_GROUPS = [
  {
    title: 'Platform',
    links: [
      { label: 'Point of Sale', href: '/point-of-sale' },
      { label: 'Payments', href: '/accept-payments' },
      { label: 'Intelligence', href: '/ai' },
      { label: 'Hardware', href: '/hardware' },
      { label: 'Tap to Pay', href: '/tap-to-pay' },
      { label: 'Platform', href: '/platform' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Kitchen Display', href: '/products/kitchen-display-system' },
      { label: 'Self-Service Kiosk', href: '/products/self-service-kiosk' },
      { label: 'Handheld', href: '/products/point-of-purchase' },
      { label: 'Customer Display', href: '/products/customer-facing-display' },
      { label: 'Online Ordering', href: '/products/apponlineorderingdelivery' },
      { label: 'Inventory', href: '/products/simplified-inventory-management' },
      { label: 'Workforce', href: '/products/workforce-management' },
    ],
  },
  {
    title: 'Grow',
    links: [
      { label: 'Analytics', href: '/products/reporting-analytics' },
      { label: 'Loyalty', href: '/products/loyalty' },
      { label: 'Gift Cards', href: '/products/giftcards' },
      { label: 'Marketing', href: '/products/automated-marketing' },
      { label: 'Tableside', href: '/products/tableside-order-and-pay' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Quick Service', href: '/solutions/quick-service' },
      { label: 'Full Service', href: '/solutions/full-service' },
      { label: 'Fast Casual', href: '/solutions/fast-casual' },
      { label: 'Café', href: '/solutions/cafe' },
      { label: 'Bar & Nightclub', href: '/solutions/bar' },
      { label: 'Food Truck', href: '/solutions/food-truck' },
      { label: 'Ghost Kitchen', href: '/solutions/ghost-kitchen' },
      { label: 'Catering', href: '/solutions/catering' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Customers', href: '/customers' },
      { label: 'Contact Sales', href: '/contact-sales' },
      { label: 'Report Fraud', href: '/report-fraud' },
      { label: 'Newsroom', href: '/blog' },
      { label: 'Comparison', href: '/comparison' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'Brochures', href: '/brochures' },
      { label: 'Book a Demo', href: '/book-demo' },
      { label: 'Get Started', href: '/get-started' },
      { label: 'Help Center', href: 'https://support.eatos.com/en-us/', external: true },
      { label: 'Status', href: 'https://status.eatos.com/en/', external: true },
      { label: 'Dashboard', href: 'https://dashboard.eatos.com/', external: true },
    ],
  },
];

export default function Footer() {
  const headingClass = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-white';
  const linkClass = 'text-[13px] text-gray-300 transition-colors hover:text-white';
  const descClass = 'text-[15px] leading-relaxed text-gray-300';
  const socialClass = 'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-white/40 hover:text-white';
  const cardClass = 'group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-white/25';
  const cardLabel = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300';
  const cardTitle = 'text-xl font-medium mt-2 text-white';
  const cardLink = 'mt-8 inline-flex items-center gap-2 font-medium text-white transition-all group-hover:gap-3';
  const officeLabel = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300';
  const officeCity = 'text-[13px] text-gray-300';
  const officeAddr = 'text-[12px] text-gray-300';
  const bottomText = 'text-[12px] text-gray-300';
  const bottomLink = 'text-gray-300 transition-colors hover:text-white';
  

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="site-container">
        {/* Top band: brand + contact cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-4">
            <a href="/" className="inline-block mb-6">
              <img src={mobileLogoWhite.url} alt="eatOS" className="h-9 w-auto" />
            </a>
            <p className={`${descClass} max-w-sm mb-8`}>
              The operating system for the modern restaurant, built for the way hospitality
              actually works.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={socialClass}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="mailto:cs@eatos.com" className={cardClass}>
              <div>
                <span className={cardLabel}>Support</span>
                <h3 className={cardTitle}>Dedicated help, whenever service runs</h3>
              </div>
              <span className={cardLink}>
                cs(at)eatos.com
                <ArrowRight size={16} />
              </span>
            </a>
            <a href="/book-demo" className={cardClass}>
              <div>
                <span className={cardLabel}>Sales</span>
                <h3 className={cardTitle}>Book a personalized demo</h3>
              </div>
              <span className={cardLink}>
                +1 (844) 563-2867
                <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-5 pt-10 pb-14 border-b border-white/10">
          <div className={officeLabel}>Offices</div>
          {OFFICES.map(({ city, address }) => (
            <div key={city}>
              <div className={officeCity}>{city}</div>
              <div className={officeAddr}>{address}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 py-16 items-start">
          {LINK_GROUPS.map(({ title, links }) => (
            <div key={title}>
              <h4 className={`${headingClass} mb-6`}>{title}</h4>
              <ul className="space-y-3.5">
                {links.map(({ label, href, external }) => (
                  <li key={`${title}-${label}`}>
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
          ))}
        </div>

        <div className="pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className={`flex-1 ${bottomText}`}>
              <span suppressHydrationWarning>
                &copy; 2017 - 2026 <strong className="font-semibold">eatOS POS Inc.</strong> All rights reserved.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href="/privacy" className={bottomLink}>Privacy Policy</a>
              <a href="/terms" className={bottomLink}>Terms of Service</a>
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

            <span className="flex flex-1 items-center lg:justify-end gap-1.5 text-[12px] text-gray-300">
              <Globe size={13} /> United States - EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
