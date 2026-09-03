// @ts-nocheck
"use client";

import mobileLogoWhite from "./marketing/assets/brand/logo-mobile-white.png.asset.json";
import mobileLogoBlack from "./marketing/assets/brand/logo-mobile-black.png.asset.json";

import {
  Menu,
  X,
  ChevronDown,
  Monitor,
  CreditCard,
  Cpu,
  Wifi,
  ShoppingBag,
  LifeBuoy,
  Activity,
  LayoutDashboard,
  Store,
  Phone,
  LayoutGrid,
  Users,
  Star,
  Truck,
  Zap,
  Utensils,
  Wine,
  Coffee,
  Building2,
  Network,
  Package,
  Pizza,
  Mic,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { overallHeaderColor } from "@/app/system-status/systems";
import UtilityBar from "./UtilityBar";


// Apple-style mega menu: one full-bleed sheet docked under the header bar.
// The sheet always spans the viewport and centers its content inside the site
// container, so it can never drift right into the logo or the Book a Demo CTA.
// No max-height / overflow here on purpose: the panels must never show an inner
// scrollbar at any viewport size.
function MegaMenuPanel({
  open,
  label,
  items,
  footerLabel,
  footerHref,
  footerCta,
  onMouseEnter,
}: {
  open: boolean;
  label: string;
  items: Array<{
    href: string;
    title: string;
    description: string;
    Icon: React.ComponentType<{ size?: number }>;
    iconWrap: string;
  }>;
  footerLabel: string;
  footerHref: string;
  footerCta: string;
  onMouseEnter?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`hidden lg:block absolute top-full left-0 right-0 origin-top transition-all duration-300 ease-out ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      <div className="bg-white border-t border-gray-200 rounded-b-3xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] text-black normal-case tracking-normal">
        <div className="site-container py-8">
          <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 pt-2 [text-shadow:none]">
              {label}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-1">
              {items.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{ transitionDelay: open ? `${60 + i * 12}ms` : "0ms" }}
                  className={`flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300 ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  <div className={`${item.iconWrap} p-1.5 rounded-lg flex-shrink-0`}>
                    <item.Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[14px] leading-snug [text-shadow:none]">
                      {item.title}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-snug truncate [text-shadow:none]">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
            <div className="text-xs text-gray-500 [text-shadow:none]">{footerLabel}</div>
            <a
              href={footerHref}
              className="text-sm font-semibold text-black hover:opacity-70 transition-opacity [text-shadow:none]"
            >
              {footerCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isDarkPage, setIsDarkPage] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [statusColor, setStatusColor] = useState("text-green-500");
  const [mobileTab, setMobileTab] = useState("products");
  const [openGroup, setOpenGroup] = useState("Operations");
  const [currentPath, setCurrentPath] = useState("/");

  // Close the desktop mega menus on Escape.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setProductsOpen(false);
      setSolutionsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMegaMenus = useCallback(() => {
    setProductsOpen(false);
    setSolutionsOpen(false);
  }, []);




  const groupForPath = (path: string) => {
    if (
      [
        "/pointofsale",
        "/products/kitchen-display-system",
        "/products/simplified-inventory-management",
        "/products/workforce-management",
        "/products/point-of-purchase",
        "/products/reporting-analytics",
      ].some((p) => path === p || path.startsWith(p + "/"))
    )
      return "Operations";
    if (
      [
        "/products/self-service-kiosk",
        "/products/tableside-order-and-pay",
        "/products/apponlineorderingdelivery",
        "/products/guest-facing-display",
        "/products/autonomous-and-automated-delivery",
      ].some((p) => path === p || path.startsWith(p + "/"))
    )
      return "Guest Experience";
    if (
      [
        "/accept-payments",
        "/products/loyalty",
        "/products/automated-marketing",
        "/products/giftcards",
      ].some((p) => path === p || path.startsWith(p + "/"))
    )
      return "Growth & Payments";
    if (
      ["/ai", "/products/hardware", "/offline-point-of-sale"].some((p) => path === p || path.startsWith(p + "/"))
    )
      return "Intelligence & Hardware";
    return "Operations";
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      const path = window.location.pathname;
      setMobileTab(path.startsWith("/solutions") ? "solutions" : "products");
      setOpenGroup(groupForPath(path));
    } else {
      setMobileTab("products");
      setOpenGroup("Operations");
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    setStatusColor(overallHeaderColor());
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      const lightPages = ["/login"];


      const isLight = lightPages.some(
        (p) => path === p || path.startsWith(p + "/"),
      );
      setIsDarkPage(!isLight);

      const hiddenPaths = ["/admin/media"];
      const isHiddenPage =
        hiddenPaths.includes(path) ||
        (path.startsWith("/admin/blog/") && path !== "/admin/blog");
      setIsHidden(isHiddenPage);
    };

    checkTheme();

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handlePopState = () => checkTheme();
    window.addEventListener("popstate", handlePopState);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    history.pushState = function (...args) {
      const res = originalPushState.apply(this, args);
      checkTheme();
      return res;
    };
    history.replaceState = function (...args) {
      const res = originalReplaceState.apply(this, args);
      checkTheme();
      return res;
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  // Close mobile menu on resize to xl+
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isHidden) return null;

  const navTextClass = `text-[13px] xl:text-[15px] font-medium tracking-[-0.01em]`;
  const navLinkClass = `${navTextClass} hover:opacity-70 transition-opacity whitespace-nowrap`;

  const productLinks = [
    {
      href: "/pointofsale",
      title: "Point of Sale",
      description: "Manage tables, orders & kitchen",
      Icon: Monitor,
      iconWrap: "bg-orange-100 text-orange-600",
    },
    {
      href: "/accept-payments",
      title: "Payments",
      description: "Accept cards with instant payouts",
      Icon: CreditCard,
      iconWrap: "bg-blue-100 text-blue-600",
    },
    {
      href: "/ai",
      title: "Intelligence",
      description: "Automate operations with AI",
      Icon: Cpu,
      iconWrap: "bg-purple-100 text-purple-600",
    },
    {
      href: "/products/ai-enabled-ordering-automation",
      title: "AI-Enabled Ordering",
      description: "VoiceOS answers calls and takes orders",
      Icon: Mic,
      iconWrap: "bg-indigo-100 text-indigo-600",
    },
    {

      href: "/products/kitchen-display-system",
      title: "Kitchen Display",
      description: "Real-time kitchen flow",
      Icon: LayoutGrid,
      iconWrap: "bg-brand-soft text-brand",
    },
    {
      href: "/products/self-service-kiosk",
      title: "Self-Service Kiosk",
      description: "Lower lines, higher output",
      Icon: Monitor,
      iconWrap: "bg-zinc-100 text-zinc-700",
    },
    {
      href: "/products/point-of-purchase",
      title: "Handheld",
      description: "Take orders anywhere",
      Icon: Phone,
      iconWrap: "bg-indigo-100 text-indigo-700",
    },
    {
      href: "/products/guest-facing-display",
      title: "Guest Facing Display",
      description: "Clear checkout for guests",
      Icon: CreditCard,
      iconWrap: "bg-sky-100 text-sky-700",
    },
    {
      href: "/products/reporting-analytics",
      title: "Analytics",
      description: "Real-time reporting",
      Icon: LayoutDashboard,
      iconWrap: "bg-amber-100 text-amber-700",
    },
    {
      href: "/products/workforce-management",
      title: "Workforce",
      description: "Scheduling and attendance",
      Icon: Users,
      iconWrap: "bg-pink-100 text-pink-700",
    },
    {
      href: "/products/apponlineorderingdelivery",
      title: "Online Ordering",
      description: "Order ahead & delivery",
      Icon: Store,
      iconWrap: "bg-lime-100 text-lime-700",
    },
    {
      href: "/products/simplified-inventory-management",
      title: "Inventory",
      description: "Stay accurate in real time",
      Icon: LayoutGrid,
      iconWrap: "bg-teal-100 text-teal-700",
    },
    {
      href: "/products/automated-marketing",
      title: "Marketing",
      description: "Automated guest growth",
      Icon: Star,
      iconWrap: "bg-violet-100 text-violet-700",
    },
    {
      href: "/products/tableside-order-and-pay",
      title: "Order at Table",
      description: "Scan, order, pay",
      Icon: Phone,
      iconWrap: "bg-fuchsia-100 text-fuchsia-700",
    },
    {
      href: "/products/loyalty",
      title: "Loyalty",
      description: "Rewards and retention",
      Icon: Star,
      iconWrap: "bg-yellow-100 text-yellow-700",
    },
    {
      href: "/products/giftcards",
      title: "Gift Cards",
      description: "Sell more, year-round",
      Icon: CreditCard,
      iconWrap: "bg-rose-100 text-rose-700",
    },
    {
      href: "/products/autonomous-and-automated-delivery",
      title: "Autonomous Delivery",
      description: "Service, reimagined",
      Icon: Truck,
      iconWrap: "bg-slate-100 text-slate-700",
    },
    {
      href: "/products/hardware",
      title: "Hardware",
      description: "Terminals & accessories",
      Icon: ShoppingBag,
      iconWrap: "bg-gray-100 text-gray-600",
    },
  ];


  const solutionLinks = [
    {
      href: "/quick-service",
      title: "Quick Service",
      description: "Built for speed and volume",
      Icon: Zap,
      iconWrap: "bg-orange-100 text-orange-600",
    },
    {
      href: "/full-service",
      title: "Full Service",
      description: "Table-to-kitchen flow",
      Icon: Utensils,
      iconWrap: "bg-indigo-100 text-indigo-600",
    },
    {
      href: "/fast-casual",
      title: "Fast Casual",
      description: "Speed and accuracy at the counter",
      Icon: Star,
      iconWrap: "bg-purple-100 text-purple-600",
    },
    {
      href: "/pizzeria",
      title: "Pizzeria",
      description: "Custom pies, delivery and pickup",
      Icon: Pizza,
      iconWrap: "bg-red-100 text-red-600",
    },
    {
      href: "/cafe-pos",
      title: "Café & Coffee Shop",
      description: "Handle rushes effortlessly",
      Icon: Coffee,
      iconWrap: "bg-amber-100 text-amber-600",
    },
    {
      href: "/bar-and-brewery",
      title: "Bar & Nightclub",
      description: "Fast tabs, real-time inventory",
      Icon: Wine,
      iconWrap: "bg-rose-100 text-rose-600",
    },
    {
      href: "/food-truck",
      title: "Food Truck",
      description: "Mobile. Powerful. Reliable.",
      Icon: Truck,
      iconWrap: "bg-brand-soft text-brand",
    },
    {
      href: "/ghost-kitchens",
      title: "Ghost Kitchen",
      description: "Delivery-first operations",
      Icon: Package,
      iconWrap: "bg-slate-100 text-slate-600",
    },
    {
      href: "/catering",
      title: "Catering",
      description: "Large events and off site orders",
      Icon: Building2,
      iconWrap: "bg-blue-100 text-blue-600",
    },
    {
      href: "/enterprise-pos",
      title: "Enterprise",
      description: "Point of Sale built for enterprise scale",
      Icon: Network,
      iconWrap: "bg-violet-100 text-violet-600",
    },
  ];

  const NavIcon = ({ href, icon: Icon, label, colorClass = "" }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="group relative flex items-center justify-center hover:opacity-100 transition-opacity opacity-80"
      aria-label={label}
    >
      <Icon
        size={22}
        strokeWidth={1.5}
        className={`transition-colors duration-300 ${colorClass}`}
      />
      <span className="absolute top-full mt-2 px-2 py-1 text-xs font-medium bg-white/90 text-black rounded-md shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-black/5 transform translate-y-1 group-hover:translate-y-0 z-50">
        {label}
      </span>
    </a>
  );

  return (
    <header
      onMouseLeave={closeMegaMenus}

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? "bg-white border-b border-gray-100 pb-3"
          : isScrolled
            ? isDarkPage
              ? "bg-black/50 backdrop-blur-xl border-b border-white/5 pb-3"
              : "bg-white/80 backdrop-blur-xl border-b border-black/5 pb-3"
            : "bg-transparent pb-5"
      }`}
    >
      {/* Secondary utility navigation */}
      {!mobileMenuOpen && !isScrolled && (
        <UtilityBar statusColor={statusColor} />
      )}

      <div
        className={`site-container relative grid grid-cols-[auto_auto] justify-between lg:grid-cols-[auto_auto] items-center gap-4 ${
          isScrolled || mobileMenuOpen ? "pt-3" : "pt-5"
        }`}
      >

        {/* Logo */}
        <a
          href="/"
          className={`justify-self-start flex-shrink-0 flex items-center gap-2 ${mobileMenuOpen ? "text-black" : isDarkPage ? "text-white" : "text-black"} relative z-10`}
        >
          <img
            src={
              isDarkPage
                ? "https://ucarecdn.com/03d261bb-af6b-4183-a35c-afdbb7e1a2b7/-/format/auto/"
                : "https://ucarecdn.com/4352d127-4bf5-42cf-a022-3110926687de/-/format/auto/"
            }
            alt="eatOS"
            className={`hidden lg:block h-[44px] w-auto transition-all duration-300 ${isDarkPage ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" : ""}`}
          />
          {/* Mobile / tablet mark */}
          <img
            src={
              isDarkPage && !mobileMenuOpen
                ? mobileLogoWhite.url
                : mobileLogoBlack.url
            }
            alt="eatOS"
            className={`lg:hidden h-[34px] w-auto transition-all duration-300 ${isDarkPage && !mobileMenuOpen ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" : ""}`}
          />
        </a>

        {/* Desktop Nav (visible at xl / 1280px and wider) */}
        <nav
          className={`hidden lg:flex items-center gap-5 xl:gap-8 2xl:gap-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 justify-center whitespace-nowrap ${isDarkPage ? "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]" : "text-black"}`}
          aria-label="Primary"
        >
          {/* Platform trigger */}
          <div
            className="relative"
            onMouseEnter={() => {
              setProductsOpen(true);
              setSolutionsOpen(false);
            }}
          >
            <a
              href="/platform"
              aria-expanded={productsOpen}
              className={`flex items-center gap-1 py-2 hover:opacity-70 transition-opacity ${navTextClass}`}
            >
              Platform
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
              />
            </a>
          </div>

          {/* Concepts trigger */}
          <div
            className="relative"
            onMouseEnter={() => {
              setSolutionsOpen(true);
              setProductsOpen(false);
            }}
          >
            <a
              href="/solutions"
              aria-expanded={solutionsOpen}
              className={`flex items-center gap-1 py-2 hover:opacity-70 transition-opacity ${navTextClass}`}
            >
              Concepts
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
              />
            </a>
          </div>



          <a href="/pricing" className={navLinkClass}>
            Pricing
          </a>
        </nav>

        {/* Right Side (visible at xl and wider) */}
        <div
          className={`hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 justify-self-end flex-shrink-0 ${isDarkPage ? "text-white" : "text-black"}`}
        >
          {/* Dashboard, Support and Status now live in the top utility bar */}


          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="/bookademo"
              className={`px-4 py-1.5 rounded-full text-[13px] xl:text-[14px] font-semibold hover:scale-105 transition-all whitespace-nowrap
                ${
                  isDarkPage
                    ? "bg-white text-black border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-black text-white border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                }`}
            >
              Book a Demo
            </a>
          </div>
        </div>

        {/* Hamburger (visible below xl, under 1280px) */}
        <button
          className={`lg:hidden justify-self-end flex-shrink-0 ${mobileMenuOpen ? "text-black" : isDarkPage ? "text-white" : "text-black"} relative z-10 p-1`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dim the page while a mega menu is open */}
      <div
        aria-hidden="true"
        onMouseEnter={closeMegaMenus}
        className={`hidden lg:block absolute top-full left-0 right-0 h-screen bg-black/50 transition-opacity duration-300 ${
          (productsOpen || solutionsOpen) && !mobileMenuOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Desktop mega menu sheets: full-bleed, docked under the header bar */}
      <MegaMenuPanel
        open={productsOpen && !mobileMenuOpen}
        label="Platform"
        items={productLinks}
        footerLabel="Looking for the full suite?"
        footerHref="/products"
        footerCta="View all products →"
        onMouseEnter={() => setProductsOpen(true)}
      />
      <MegaMenuPanel
        open={solutionsOpen && !mobileMenuOpen}
        label="Concepts"
        items={solutionLinks}
        footerLabel="Find your concept"
        footerHref="/solutions"
        footerCta="View all concepts →"
        onMouseEnter={() => setSolutionsOpen(true)}
      />



      {/* Mobile and Tablet Menu: slides down below xl */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl flex flex-col h-[calc(100vh-70px)] text-black">
          {/* Tab switcher */}
          <div className="shrink-0 px-3 pt-3 pb-3 border-b border-gray-100">
            <div className="grid grid-cols-2 gap-1 rounded-full bg-gray-100 p-1">
              {["products", "solutions"].map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={mobileTab === t}
                  onClick={() => setMobileTab(t)}
                  className={`min-h-11 rounded-full text-[14px] font-semibold capitalize transition-colors ${
                    mobileTab === t
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  {t === "products" ? "Platform" : "Concepts"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hidden">
          <div className="p-3 flex flex-col gap-1.5">
            {mobileTab === "products" && (
            <>
            <a
              href="/products"
              className="flex min-h-11 items-center justify-between rounded-xl px-3 text-[14px] font-semibold hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              All products <span aria-hidden="true">→</span>
            </a>

            <div className="space-y-1">
              <button
                type="button"
                aria-expanded={openGroup === "Operations"}
                onClick={() =>
                  setOpenGroup(openGroup === "Operations" ? null : "Operations")
                }
                className="flex w-full min-h-11 items-center justify-between rounded-xl px-3 text-[12px] font-semibold uppercase tracking-wider text-gray-500 hover:bg-gray-50"
              >
                Operations
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openGroup === "Operations" ? "rotate-180" : ""}`}
                />
              </button>
              {openGroup === "Operations" && (
              <div className="space-y-0.5 pb-1">
              {[
                {
                  href: "/pointofsale",
                  Icon: Monitor,
                  label: "Point of Sale",
                  color: "text-orange-500",
                },
                {
                  href: "/products/kitchen-display-system",
                  Icon: LayoutGrid,
                  label: "Kitchen Display",
                  color: "text-brand",
                },
                {
                  href: "/products/simplified-inventory-management",
                  Icon: LayoutGrid,
                  label: "Inventory",
                  color: "text-teal-600",
                },
                {
                  href: "/products/workforce-management",
                  Icon: Users,
                  label: "Workforce",
                  color: "text-pink-600",
                },
                {
                  href: "/products/point-of-purchase",
                  Icon: Phone,
                  label: "Handheld",
                  color: "text-indigo-600",
                },
                {
                  href: "/products/reporting-analytics",
                  Icon: LayoutDashboard,
                  label: "Analytics",
                  color: "text-amber-600",
                },
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] hover:bg-gray-50 ${currentPath === href ? "font-bold text-gray-900 bg-gray-50" : "font-medium"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className={color} /> {label}
                </a>
              ))}
              </div>
              )}
            </div>

            <div className="space-y-1">
              <button
                type="button"
                aria-expanded={openGroup === "Guest Experience"}
                onClick={() =>
                  setOpenGroup(
                    openGroup === "Guest Experience" ? null : "Guest Experience",
                  )
                }
                className="flex w-full min-h-11 items-center justify-between rounded-xl px-3 text-[12px] font-semibold uppercase tracking-wider text-gray-500 hover:bg-gray-50"
              >
                Guest Experience
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openGroup === "Guest Experience" ? "rotate-180" : ""}`}
                />
              </button>
              {openGroup === "Guest Experience" && (
              <div className="space-y-0.5 pb-1">
              {[
                {
                  href: "/products/self-service-kiosk",
                  Icon: Monitor,
                  label: "Self-Service Kiosk",
                  color: "text-zinc-600",
                },
                {
                  href: "/products/tableside-order-and-pay",
                  Icon: Phone,
                  label: "Order at Table",
                  color: "text-fuchsia-600",
                },
                {
                  href: "/products/apponlineorderingdelivery",
                  Icon: Store,
                  label: "Online Ordering",
                  color: "text-lime-600",
                },
                {
                  href: "/products/guest-facing-display",
                  Icon: CreditCard,
                  label: "Guest Facing Display",
                  color: "text-sky-600",
                },
                {
                  href: "/products/autonomous-and-automated-delivery",
                  Icon: Truck,
                  label: "Autonomous Delivery",
                  color: "text-slate-600",
                },
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] hover:bg-gray-50 ${currentPath === href ? "font-bold text-gray-900 bg-gray-50" : "font-medium"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className={color} /> {label}
                </a>
              ))}
              </div>
              )}
            </div>

            <div className="space-y-1">
              <button
                type="button"
                aria-expanded={openGroup === "Growth & Payments"}
                onClick={() =>
                  setOpenGroup(
                    openGroup === "Growth & Payments"
                      ? null
                      : "Growth & Payments",
                  )
                }
                className="flex w-full min-h-11 items-center justify-between rounded-xl px-3 text-[12px] font-semibold uppercase tracking-wider text-gray-500 hover:bg-gray-50"
              >
                Growth &amp; Payments
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openGroup === "Growth & Payments" ? "rotate-180" : ""}`}
                />
              </button>
              {openGroup === "Growth & Payments" && (
              <div className="space-y-0.5 pb-1">
              {[
                {
                  href: "/accept-payments",
                  Icon: CreditCard,
                  label: "Payments",
                  color: "text-blue-500",
                },
                {
                  href: "/products/loyalty",
                  Icon: Star,
                  label: "Loyalty",
                  color: "text-yellow-600",
                },
                {
                  href: "/products/automated-marketing",
                  Icon: Star,
                  label: "Marketing",
                  color: "text-violet-600",
                },
                {
                  href: "/products/giftcards",
                  Icon: CreditCard,
                  label: "Gift Cards",
                  color: "text-rose-600",
                },
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] hover:bg-gray-50 ${currentPath === href ? "font-bold text-gray-900 bg-gray-50" : "font-medium"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className={color} /> {label}
                </a>
              ))}
              </div>
              )}
            </div>

            <div className="space-y-1">
              <button
                type="button"
                aria-expanded={openGroup === "Intelligence & Hardware"}
                onClick={() =>
                  setOpenGroup(
                    openGroup === "Intelligence & Hardware"
                      ? null
                      : "Intelligence & Hardware",
                  )
                }
                className="flex w-full min-h-11 items-center justify-between rounded-xl px-3 text-[12px] font-semibold uppercase tracking-wider text-gray-500 hover:bg-gray-50"
              >
                Intelligence &amp; Hardware
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openGroup === "Intelligence & Hardware" ? "rotate-180" : ""}`}
                />
              </button>
              {openGroup === "Intelligence & Hardware" && (
              <div className="space-y-0.5 pb-1">
              {[
                {
                  href: "/ai",
                  Icon: Cpu,
                  label: "Intelligence",
                  color: "text-purple-500",
                },
                {
                  href: "/products/ai-enabled-ordering-automation",
                  Icon: Mic,
                  label: "AI-Enabled Ordering",
                  color: "text-indigo-500",
                },
                {
                  href: "/products/hardware",
                  Icon: ShoppingBag,
                  label: "Hardware",
                  color: "text-gray-500",
                },
                {
                  href: "/offline-point-of-sale",
                  Icon: Wifi,
                  label: "Offline Connectivity",
                  color: "text-sky-500",
                },
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] hover:bg-gray-50 ${currentPath === href ? "font-bold text-gray-900 bg-gray-50" : "font-medium"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className={color} /> {label}
                </a>
              ))}
              </div>
              )}
            </div>
            </>
            )}

            {mobileTab === "solutions" && (
            <>
            <a
              href="/solutions"
              className="flex min-h-11 items-center justify-between rounded-xl px-3 text-[14px] font-semibold hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              All concepts <span aria-hidden="true">→</span>
            </a>

            <div className="flex flex-col gap-0.5">
              {solutionLinks.map((s) => {
                const iconColor = s.iconWrap.split(" ")[1];
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    className="flex min-h-11 items-center gap-3 rounded-xl px-3 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <s.Icon size={18} className={iconColor} />
                    <span className="text-[15px] font-medium">{s.title}</span>
                  </a>
                );
              })}
            </div>
            </>
            )}

            <div className="h-px bg-gray-100 my-1" />

            {/* Secondary links */}
            <div className="grid grid-cols-2 gap-1">
              {[
                { href: "/platform", label: "Platform" },
                { href: "/pricing", label: "Pricing" },
                { href: "/enterprise-pos", label: "Enterprise" },
                { href: "/customers", label: "Customers" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="flex min-h-11 items-center rounded-xl px-3 text-[15px] font-medium hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          </div>

          {/* Sticky action footer */}
          <div className="shrink-0 border-t border-gray-100 bg-white px-3 pt-2 pb-4">
            <div className="grid grid-cols-3 gap-1">
              {[
                {
                  href: "https://dashboard.eatos.com/#/account/login",
                  Icon: LayoutGrid,
                  label: "Sign In",
                  external: true,
                },
                {
                  href: "/support",
                  Icon: LifeBuoy,
                  label: "Support",
                },
                {
                  href: "/system-status",
                  Icon: Activity,
                  label: "Status",
                  external: false,
                  colorClass: statusColor,
                },
              ].map(({ href, Icon, label, external, colorClass }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl p-2 text-center hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={20} className={colorClass || "text-gray-600"} />
                  <span className="text-[11px] font-medium">{label}</span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-2">
              <a
                href="/bookademo"
                className="block w-full bg-black text-white text-center py-3 rounded-full font-semibold text-[15px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
