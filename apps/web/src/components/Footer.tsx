// @ts-nocheck
'use client';

import { ArrowRight, Globe, MessageCircle, MessageSquareText, Phone } from 'lucide-react';
import mobileLogoWhite from './marketing/assets/brand/logo-mobile-white.png.asset.json';

function XIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );
}

function VimeoIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7.5c1.2-1.4 2.6-2.4 3.7-2.4 1.3 0 1.8 1 2 2.4.3 2 .6 4.6 1.2 6.2.4 1.1.9 1.6 1.4 1.6.9 0 2.6-2 3-4 .3-1.7-.4-3-1.9-2.6.9-3 3.7-4.4 5.6-3.6 1.6.7 2.2 2.8 1.4 5.4-1.1 3.7-4.8 8.4-8.2 8.4-2.2 0-3.5-2-4.4-5.3-.5-1.8-.9-3.7-1.4-4.7-.3-.6-.7-.7-1.3-.3z" />
    </svg>
  );
}

function MessengerIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3c5 0 9 3.7 9 8.4 0 4.6-4 8.4-9 8.4a10 10 0 0 1-2.7-.4L5 21l.8-3.3A8.1 8.1 0 0 1 3 11.4C3 6.7 7 3 12 3z" />
      <path d="M7.5 14.2l2.9-3.1 2.3 1.8 2.2-2.4-2.4 4.1-2.3-1.8-1.9 2z" />
    </svg>
  );
}


function BrochureIcon({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 3v5h5" />
      <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7z" />
      <path d="M12 12v6" />
      <path d="M9.5 15.5 12 18l2.5-2.5" />
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
  { label: 'Facebook', ariaLabel: 'eatOS on Facebook (opens in a new tab)', href: 'https://www.facebook.com/myeatos', Icon: FacebookIcon },
  { label: 'X', ariaLabel: 'eatOS on X (opens in a new tab)', href: 'https://x.com/myeatos', Icon: XIcon },
  { label: 'Instagram', ariaLabel: 'eatOS on Instagram (opens in a new tab)', href: 'https://www.instagram.com/myeatos', Icon: InstagramIcon },
  { label: 'LinkedIn', ariaLabel: 'eatOS on LinkedIn (opens in a new tab)', href: 'https://www.linkedin.com/company/myeatos', Icon: LinkedinIcon },
  { label: 'Vimeo', ariaLabel: 'eatOS on Vimeo (opens in a new tab)', href: 'https://vimeo.com/myeatos', Icon: VimeoIcon },
  { label: 'YouTube', ariaLabel: 'eatOS on YouTube (opens in a new tab)', href: 'https://www.youtube.com/@myeatos', Icon: YoutubeIcon },
  { label: 'Brochures', ariaLabel: 'Download eatOS product brochures', href: '/brochures', Icon: BrochureIcon, internal: true },
];

// Structured office records. Line breaks are never authored by hand: the
// formatter below turns each record into the same multi-line block so city,
// state and ZIP always stay together on one line.
const OFFICES = [
  {
    stateCode: 'CA',
    street: '20289 Stevens Creek Blvd',
    suite: 'PH 1019',
    city: 'Cupertino',
    state: 'California',
    zip: '95014',
  },
  {
    stateCode: 'FL',
    street: '1111 Brickell Ave',
    suite: 'FL 10',
    city: 'Miami',
    state: 'Florida',
    zip: '33131',
  },
  {
    stateCode: 'CA',
    street: '750 N. San Vicente Blvd',
    suite: 'Ste 800',
    city: 'Los Angeles',
    state: 'California',
    zip: '90048',
  },
  {
    stateCode: 'TX',
    street: '21755 Interstate 45, Bldg 1',
    suite: 'Ste 107',
    city: 'Spring',
    state: 'Texas',
    zip: '77388',
  },
];

// Single source of truth for address rendering across the site.
export function formatOfficeAddress(office) {
  const { stateCode, street, suite, city, state, zip } = office;
  return {
    heading: `${city}, ${stateCode}`,
    streetLine: [street, suite].filter(Boolean).join(' '),
    localityLine: `${city}, ${state} - ${zip}.`,
  };
}



const LINK_GROUPS = [
  {
    title: 'Products',
    href: '/platform',
    links: [
      { label: 'Point of Sale', href: '/pointofsale' },
      { label: 'Kitchen Display', href: '/products/kitchen-display-system' },
      { label: 'Self-Service Kiosk', href: '/products/self-service-kiosk' },
      { label: 'Handheld', href: '/products/point-of-purchase' },
      { label: 'Guest Facing Display', href: '/products/guest-facing-display' },
      { label: 'Inventory', href: '/products/simplified-inventory-management' },
      { label: 'Workforce', href: '/products/workforce-management' },
      { label: 'Payments', href: '/accept-payments' },
    ],
  },

  {
    title: 'Grow',
    href: '/grow',
    links: [
      { label: 'Analytics', href: '/products/reporting-analytics' },
      { label: 'Loyalty', href: '/products/loyalty' },
      { label: 'Gift Cards', href: '/products/giftcards' },
      { label: 'Marketing', href: '/products/automated-marketing' },
      { label: 'Order at Table', href: '/products/tableside-order-and-pay' },
      { label: 'Online Ordering', href: '/products/apponlineorderingdelivery' },
      { label: 'Intelligence', href: '/ai' },
      { label: 'Hardware', href: '/products/hardware' },
      { label: 'edgeOS', href: '/offline-point-of-sale' },
    ],
  },
  {
    title: 'Concepts',
    href: '/solutions',
    links: [

      { label: 'Quick Service', href: '/quick-service' },
      { label: 'Full Service', href: '/full-service' },
      { label: 'Fast Casual', href: '/fast-casual' },
      { label: 'Pizzeria', href: '/pizzeria' },
      { label: 'Café', href: '/cafe-pos' },
      { label: 'Bar & Nightclub', href: '/bar-and-brewery' },
      { label: 'Food Truck', href: '/food-truck' },
      { label: 'Ghost Kitchen', href: '/ghost-kitchens' },
      { label: 'Catering', href: '/catering' },
      { label: 'Enterprise', href: '/enterprise-pos' },
    ],
  },
  {
    title: 'Company',
    href: '/company',
    links: [

      { label: 'About Us', href: '/about-eatos' },
      { label: 'Careers', href: '/work-with-us' },
      { label: 'Partners', href: '/partners' },
      { label: 'Customers', href: '/customers' },
      { label: 'Contact Sales', href: '/contact' },
      { label: 'Report Fraud', href: '/report-fraud' },
      { label: 'Newsroom', href: '/news' },
      { label: 'Comparison', href: '/comparison' },
      { label: 'Reseller', href: '/reseller' },
    ],
  },
  {
    title: 'Resources',
    href: '/resources',
    links: [

      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'Brochures', href: '/brochures' },
      { label: 'Media Kit', href: '/media-kit' },
      { label: 'Book a Demo', href: '/bookademo' },
      { label: 'Help Center', href: '/support' },
      { label: 'Status', href: '/system-status' },
      { label: 'Dashboard', href: 'https://dashboard.eatos.com/', external: true },
    ],
  },
];

const CONTACT_CHANNELS = [
  {
    label: 'WhatsApp',
    ariaLabel: 'Message eatOS on WhatsApp (opens in a new tab)',
    href: 'https://wa.me/18449732867',
    Icon: MessageCircle,
    external: true,
  },
  {
    label: 'Text Message',
    ariaLabel: 'Text eatOS at +1 (844) 563-2867',
    href: 'sms:+18449732867',
    Icon: MessageSquareText,
  },
  {
    label: 'Facebook Messenger',
    ariaLabel: 'Message eatOS on Facebook Messenger (opens in a new tab)',
    href: 'https://m.me/myeatos',
    Icon: MessengerIcon,
    external: true,
  },
  {
    label: 'Call',
    ariaLabel: 'Call eatOS at +1 (844) 563-2867',
    href: 'tel:+18449732867',
    Icon: Phone,
  },
];

// Shared focus treatment so keyboard users always see where they are.
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black';


export default function Footer() {
  const headingClass = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-white';
  const linkClass = `rounded-sm text-[13px] text-gray-300 transition-colors hover:text-white ${focusRing}`;
  const descClass = 'text-[15px] leading-relaxed text-gray-300';
  const socialClass = `flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-white/40 hover:text-white ${focusRing}`;
  const cardClass = 'group flex flex-col justify-between rounded-2xl border border-white/25 bg-white/5 p-8 transition-colors hover:border-white/25';
  const cardLabel = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300';
  const cardTitle = 'text-xl font-medium mt-2 text-white';
  const cardLink = 'mt-8 inline-flex items-center gap-2 font-medium text-white transition-all group-hover:gap-3';
  const officeLabel = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300';
  const officeCity = 'text-[13px] font-semibold text-white';
  const officeAddr = 'text-[12px] text-gray-300';

  const bottomText = 'text-[12px] text-gray-300';
  const bottomLink = 'text-[12px] text-gray-300 transition-colors hover:text-white';
  

  return (
    <footer className="bg-black border-t border-white/25 pt-20 pb-10">
      <div className="site-container">
        {/* Top band: brand + contact cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/25">
          <div className="lg:col-span-4">
            <a href="/" aria-label="eatOS home" className={`inline-block mb-6 rounded-sm ${focusRing}`}>
              <img src={mobileLogoWhite.url} alt="eatOS" className="h-9 w-auto" />
            </a>
            <p className={`${descClass} max-w-sm mb-8`}>
              The operating system for the modern restaurant, built for the way hospitality
              actually works.
            </p>
            <nav aria-label="eatOS social media" className="flex flex-wrap items-center gap-3">
              {SOCIAL_LINKS.map(({ label, ariaLabel, href, Icon, internal }) => (
                <a
                  key={label}
                  href={href}
                  {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={ariaLabel}
                  title={label}
                  className={socialClass}
                >
                  <Icon size={16} aria-hidden="true" focusable="false" />
                </a>
              ))}
            </nav>

          </div>


          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <a
                href="mailto:cs@eatos.com"
                aria-label="Email eatOS support at cs@eatos.com"
                className={`${cardClass} h-full ${focusRing}`}
              >
                <div>
                  <span className={cardLabel}>Support</span>
                  <h3 className={cardTitle}>Dedicated help, whenever service runs</h3>
                </div>
                <span className={cardLink}>
                  cs at eatOS.com
                  <ArrowRight size={16} aria-hidden="true" focusable="false" />
                </span>
              </a>

              {/* Sales card: demo link, dialable number and contact channels as siblings */}
              <div className={`${cardClass} h-full`}>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className={cardLabel}>Sales</span>
                    <h3 className={cardTitle}>
                      <a
                        href="/bookademo"
                        className={`rounded-sm transition-colors hover:text-white ${focusRing}`}
                      >
                        Book a personalized demo
                      </a>
                    </h3>
                  </div>
                  <a
                    href="tel:+18449732867"
                    aria-label="Call sales at +1 (844) 563-2867"
                    className={`${cardLink} rounded-sm ${focusRing}`}
                  >
                    +1 (844) 563-2867
                    <ArrowRight size={16} aria-hidden="true" focusable="false" />
                  </a>
                </div>

                <nav
                  aria-label="Contact eatOS sales"
                  className="mt-6 flex flex-wrap items-center gap-3 pt-2"
                >
                  {CONTACT_CHANNELS.map(({ label, ariaLabel, href, Icon, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={ariaLabel}
                      title={label}
                      className={socialClass}
                    >
                      <Icon size={16} aria-hidden="true" focusable="false" />
                    </a>
                  ))}
                </nav>
              </div>
            </div>

          </div>


        </div>

        <div className="pt-10 pb-14 border-b border-white/25">
          <div className={`${officeLabel} mb-5 sm:mb-6`}>Offices</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10">
            {OFFICES.map((office) => {
              const { heading, streetLine, localityLine } = formatOfficeAddress(office);
              return (
                <div key={heading}>
                  <div className={officeCity}>{heading}</div>
                  <div className={`${officeAddr} text-balance`}>{streetLine}</div>
                  <div className={`${officeAddr} whitespace-nowrap`}>{localityLine}</div>
                </div>
              );
            })}

          </div>
        </div>



        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-start md:justify-start items-start gap-10 py-16 lg:flex-nowrap lg:justify-between lg:gap-x-12"
        >
          {LINK_GROUPS.map(({ title, href: groupHref, links }) => {
            const groupId = `footer-group-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return (
              <div key={title} className="w-[calc(50%-1.25rem)] min-w-0 md:w-[calc(33.333%-1.667rem)] lg:w-auto lg:flex-1">
                <h4 id={groupId} className={`${headingClass} mb-6`}>
                  {groupHref ? (
                    <a href={groupHref} className={`rounded-sm transition-opacity hover:opacity-70 ${focusRing}`}>
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h4>

                <ul className="space-y-3.5" aria-labelledby={groupId}>
                  {links.map(({ label, href, external }) => (
                    <li key={`${title}-${label}`}>
                      <a
                        href={href}
                        className={linkClass}
                        aria-label={external ? `${label} (opens in a new tab)` : undefined}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="pt-10 border-t border-white/25">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className={`flex-1 ${bottomText}`}>
              <span suppressHydrationWarning>
                &copy; 2017 - 2026 <strong className="font-semibold">eatOS POS Inc.</strong> All rights reserved.
              </span>
            </div>

            <nav aria-label="Legal and privacy" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href="/privacy-policy" className={`${bottomLink} rounded-sm ${focusRing}`}>Privacy Policy</a>
              <a href="/terms-and-conditions" className={`${bottomLink} rounded-sm ${focusRing}`}>Terms of Service</a>
              <a href="/sms-policy" className={`${bottomLink} rounded-sm ${focusRing}`}>SMS Terms</a>
              <button
                type="button"
                aria-label="Open cookie preferences"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('openCookiePreferences'));
                  }
                }}

                className={`${bottomLink} rounded-sm bg-transparent border-0 cursor-pointer p-0 text-[12px] ${focusRing}`}
              >
                Cookie Settings
              </button>
            </nav>

            <span className="flex flex-1 items-center lg:justify-end gap-1.5 text-[12px] text-gray-300">
              <Globe size={13} aria-hidden="true" focusable="false" /> United States - EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
