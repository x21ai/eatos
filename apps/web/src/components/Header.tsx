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
} from "lucide-react";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileTab("products");
      setOpenGroup("Operations");
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("https://status.eatos.com/api/v2/status.json");
        if (res.ok) {
          const data = await res.json();
          const indicator = data?.status?.indicator;
          if (indicator === "none") setStatusColor("text-green-500");
          else if (indicator === "minor") setStatusColor("text-yellow-500");
          else if (indicator === "major" || indicator === "critical")
            setStatusColor("text-red-500");
          else setStatusColor("text-green-500");
        }
      } catch (e) {
        setStatusColor("text-green-500");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const path = window.location.pathname;
      const lightPages = [
        "/accept-payments",
        "/pricing",
        "/contact-sales",
        "/shop",
        "/partners",
        "/login",
        "/get-started",
        "/about",
        "/careers",
        "/privacy",
        "/terms",
        "/customers",
        "/book-demo",


      ];
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
      if (window.innerWidth >= 1280) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isHidden) return null;

  const navTextClass = `text-[14px] xl:text-[15px] font-medium tracking-[-0.01em]`;
  const navLinkClass = `${navTextClass} hover:opacity-70 transition-opacity whitespace-nowrap`;

  const productLinks = [
    {
      href: "/point-of-sale",
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
      href: "/hardware",
      title: "Hardware",
      description: "Terminals & accessories",
      Icon: ShoppingBag,
      iconWrap: "bg-gray-100 text-gray-600",
    },
    {
      href: "/products/kitchen-display-system",
      title: "Kitchen Display",
      description: "Real-time kitchen flow",
      Icon: LayoutGrid,
      iconWrap: "bg-emerald-100 text-emerald-700",
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
      href: "/products/customer-facing-display",
      title: "Customer Display",
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
      title: "Tableside",
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
      href: "/products/autonomous-delivery",
      title: "Autonomous Delivery",
      description: "Service, reimagined",
      Icon: Truck,
      iconWrap: "bg-slate-100 text-slate-700",
    },
  ];

  const solutionLinks = [
    {
      href: "/solutions/quick-service",
      title: "Quick Service",
      description: "Built for speed and volume",
      Icon: Zap,
      iconWrap: "bg-orange-100 text-orange-600",
    },
    {
      href: "/solutions/full-service",
      title: "Full Service",
      description: "Table-to-kitchen flow",
      Icon: Utensils,
      iconWrap: "bg-indigo-100 text-indigo-600",
    },
    {
      href: "/solutions/fine-dining",
      title: "Fine Dining",
      description: "Elegance meets efficiency",
      Icon: Star,
      iconWrap: "bg-purple-100 text-purple-600",
    },
    {
      href: "/solutions/cafe",
      title: "Café & Coffee Shop",
      description: "Handle rushes effortlessly",
      Icon: Coffee,
      iconWrap: "bg-amber-100 text-amber-600",
    },
    {
      href: "/solutions/bar",
      title: "Bar & Nightclub",
      description: "Fast tabs, real-time inventory",
      Icon: Wine,
      iconWrap: "bg-rose-100 text-rose-600",
    },
    {
      href: "/solutions/food-truck",
      title: "Food Truck",
      description: "Mobile. Powerful. Reliable.",
      Icon: Truck,
      iconWrap: "bg-green-100 text-green-600",
    },
    {
      href: "/solutions/ghost-kitchen",
      title: "Ghost Kitchen",
      description: "Delivery-first operations",
      Icon: Package,
      iconWrap: "bg-slate-100 text-slate-600",
    },
    {
      href: "/solutions/multi-location",
      title: "Multi-Location",
      description: "One platform, every location",
      Icon: Building2,
      iconWrap: "bg-blue-100 text-blue-600",
    },
    {
      href: "/solutions/franchise",
      title: "Franchise",
      description: "Built for franchise success",
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? "bg-white border-b border-gray-100 py-3"
          : isScrolled
            ? isDarkPage
              ? "bg-black/50 backdrop-blur-xl border-b border-white/5 py-3"
              : "bg-white/80 backdrop-blur-xl border-b border-black/5 py-3"
            : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-10 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="/"
          className={`flex-shrink-0 flex items-center gap-2 ${mobileMenuOpen ? "text-black" : isDarkPage ? "text-white" : "text-black"} relative z-10`}
        >
          <img
            src={
              isDarkPage
                ? "https://ucarecdn.com/03d261bb-af6b-4183-a35c-afdbb7e1a2b7/-/format/auto/"
                : "https://ucarecdn.com/4352d127-4bf5-42cf-a022-3110926687de/-/format/auto/"
            }
            alt="eatOS"
            className={`hidden xl:block h-[44px] w-auto transition-all duration-300 ${isDarkPage ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" : ""}`}
          />
          {/* Mobile / tablet mark */}
          <img
            src={
              isDarkPage && !mobileMenuOpen
                ? mobileLogoWhite.url
                : mobileLogoBlack.url
            }
            alt="eatOS"
            className={`xl:hidden h-[34px] w-auto transition-all duration-300 ${isDarkPage && !mobileMenuOpen ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" : ""}`}
          />
        </a>

        {/* Desktop Nav (visible at xl / 1280px and wider) */}
        <nav
          className={`hidden xl:flex items-center gap-8 2xl:gap-10 flex-1 justify-center ${isDarkPage ? "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]" : "text-black"}`}
          aria-label="Primary"
        >
          {/* Restaurant Type Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 py-2 hover:opacity-70 transition-opacity ${navTextClass}`}
            >
              Restaurant Type
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[640px] transition-all duration-200 ${productsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}
            >
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-black normal-case tracking-normal">
                <div className="grid grid-cols-2 gap-2 max-h-[480px] overflow-y-auto pr-1">
                  {productLinks.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`${p.iconWrap} p-2 rounded-lg mt-0.5 flex-shrink-0`}
                      >
                        <p.Icon size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{p.title}</div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {p.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Looking for the full suite?
                  </div>
                  <a
                    href="/products"
                    className="text-sm font-semibold text-black hover:opacity-70 transition-opacity"
                  >
                    View all products →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 py-2 hover:opacity-70 transition-opacity ${navTextClass}`}
            >
              Solutions
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[460px] transition-all duration-200 ${solutionsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}
            >
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-black normal-case tracking-normal">
                <div className="grid grid-cols-2 gap-2">
                  {solutionLinks.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`${s.iconWrap} p-2 rounded-lg mt-0.5 flex-shrink-0`}
                      >
                        <s.Icon size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{s.title}</div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {s.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Find your restaurant type
                  </div>
                  <a
                    href="/solutions"
                    className="text-sm font-semibold text-black hover:opacity-70 transition-opacity"
                  >
                    View all solutions →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a href="/platform" className={navLinkClass}>
            Platform
          </a>
          <a href="/pricing" className={navLinkClass}>
            Pricing
          </a>
          <a href="/enterprise" className={navLinkClass}>
            Enterprise
          </a>
        </nav>

        {/* Right Side (visible at xl and wider) */}
        <div
          className={`hidden xl:flex items-center gap-3 2xl:gap-4 flex-shrink-0 ${isDarkPage ? "text-white" : "text-black"}`}
        >
          {/* Icon group */}
          <div className="flex items-center gap-4 2xl:gap-5">
            <NavIcon
              href="https://dashboard.eatos.com/#/account/login"
              icon={LayoutGrid}
              label="Dashboard"
            />
            <NavIcon
              href="https://support.eatos.com/en-us/"
              icon={LifeBuoy}
              label="Support"
            />
            <NavIcon
              href="https://status.eatos.com/en/"
              icon={Activity}
              label="System Status"
              colorClass={statusColor}
            />
          </div>

          {/* Divider */}
          <div
            className={`h-4 w-px ${isDarkPage ? "bg-white/20" : "bg-black/10"}`}
          />

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="https://shop.eatos.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-1.5 rounded-full text-[13px] xl:text-[14px] font-semibold hover:scale-105 transition-all whitespace-nowrap
                ${
                  isDarkPage
                    ? "bg-white text-black border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-black text-white border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                }`}
            >
              Shop
            </a>
            <a
              href="/get-started"
              className={`px-4 py-1.5 rounded-full text-[13px] xl:text-[14px] font-semibold hover:scale-105 transition-all whitespace-nowrap
                ${
                  isDarkPage
                    ? "bg-white text-black border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-black text-white border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                }`}
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Hamburger (visible below xl, under 1280px) */}
        <button
          className={`xl:hidden flex-shrink-0 ${mobileMenuOpen ? "text-black" : isDarkPage ? "text-white" : "text-black"} relative z-10 p-1`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile and Tablet Menu: slides down below xl */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl flex flex-col h-[calc(100vh-70px)] text-black">
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
                  {t === "products" ? "Restaurant Type" : "Solutions"}
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
              All restaurant types <span aria-hidden="true">→</span>
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
                  href: "/point-of-sale",
                  Icon: Monitor,
                  label: "Point of Sale",
                  color: "text-orange-500",
                },
                {
                  href: "/products/kitchen-display-system",
                  Icon: LayoutGrid,
                  label: "Kitchen Display",
                  color: "text-emerald-600",
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
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium hover:bg-gray-50"
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
                  label: "Tableside",
                  color: "text-fuchsia-600",
                },
                {
                  href: "/products/apponlineorderingdelivery",
                  Icon: Store,
                  label: "Online Ordering",
                  color: "text-lime-600",
                },
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium hover:bg-gray-50"
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
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium hover:bg-gray-50"
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
                  href: "/hardware",
                  Icon: ShoppingBag,
                  label: "Hardware",
                  color: "text-gray-500",
                },
              ].map(({ href, Icon, label, color }) => (
                <a
                  key={href}
                  href={href}
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium hover:bg-gray-50"
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
              All solutions <span aria-hidden="true">→</span>
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
                { href: "/enterprise", label: "Enterprise" },
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
                  label: "Login",
                  external: true,
                },
                {
                  href: "https://support.eatos.com/en-us/",
                  Icon: LifeBuoy,
                  label: "Support",
                  external: true,
                },
                {
                  href: "https://status.eatos.com/en/",
                  Icon: Activity,
                  label: "Status",
                  external: true,
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
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href="https://shop.eatos.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 text-black text-center py-3 rounded-full font-semibold text-[15px] hover:bg-gray-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </a>
              <a
                href="/get-started"
                className="bg-black text-white text-center py-3 rounded-full font-semibold text-[15px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
