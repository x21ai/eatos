INSERT INTO public.collections (slug, title, description_html, image, position) VALUES
  ('other-accessories', 'Accessories', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/Printers.png?v=1735305783', 0),
  ('applications', 'Apps', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/Applications.png?v=1648459640', 1),
  ('bundles', 'Bundles', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/probundle.png?v=1735306163', 2),
  ('guest-facing-display', 'Guest Facing Display', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/CFD.png?v=1735305757', 3),
  ('kitchen-display-systems', 'Kitchen Display Systems', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/kds.png?v=1723104360', 4),
  ('point-of-purchase', 'Point of Purchase', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/Point_of_Purchase.png?v=1738243831', 5),
  ('point-of-sale', 'Point of Sale', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/POS.png?v=1735306421', 6),
  ('self-service-kiosk', 'Self Service Kiosk', '', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/collections/Self_Service_Kiosk.png?v=1735306286', 7)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (slug, title, vendor, product_type, tags, description_html, price_amount, compare_at_amount, currency, available, status, published_at, updated_at) VALUES
  ('magnetic-stripe-reader-gift-cards', 'Magnetic Stripe Reader (Gift Cards)', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '', 59, NULL, 'USD', true, 'published', '2025-02-03T09:07:25-05:00', '2026-08-29T07:43:11-04:00'),
  ('star-thermal-143-iv', 'Star Thermal 143 IV', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '', 329, NULL, 'USD', true, 'published', '2025-02-03T08:55:40-05:00', '2026-08-29T07:43:11-04:00'),
  ('wall-mount-for-15-kitchen-display-system', 'Wall Mount for 15” Kitchen Display System', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '', 99, NULL, 'USD', true, 'published', '2025-02-03T08:29:47-05:00', '2026-08-29T07:43:11-04:00'),
  ('hd-persona-fingerprint-reader', 'HD Persona Fingerprint Reader', 'myeatOS', NULL, ARRAY[]::text[], '<p>HP Persona Fingerprint Reader *Non Returnable*</p>', 99, NULL, 'USD', true, 'published', '2025-02-03T08:16:01-05:00', '2026-08-29T07:43:11-04:00'),
  ('smart-terminal-7-4', 'Smart Terminal 7”+4”', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '<p><meta charset="utf-8"><meta charset="utf-8">Built In Printer, Guest Facing Display WiFi. Cellular Data Plan Sold Separately<br></p>', 39, NULL, 'USD', true, 'published', '2025-01-30T09:38:12-05:00', '2026-08-29T07:43:11-04:00'),
  ('adyen-s1f2', 'Adyen S1F2', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '<p><meta charset="utf-8">Built In Printer, Guest Facing Display WiFi. Cellular Data Plan Included</p>', 399, NULL, 'USD', true, 'published', '2025-01-30T08:37:33-05:00', '2026-08-29T07:43:11-04:00'),
  ('epson-thermal-kitchen-printer', 'Epson Thermal Kitchen Printer', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '', 299, NULL, 'USD', true, 'published', '2025-01-24T11:01:43-05:00', '2026-08-29T07:43:11-04:00'),
  ('workforceos-license', 'WorkforceOS License', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p><meta charset="utf-8">20 EE included</p>', 20, NULL, 'USD', true, 'published', '2025-01-24T05:46:43-05:00', '2026-08-29T07:43:11-04:00'),
  ('inventoryos-license', 'InventoryOS  License', 'myeatOS', NULL, ARRAY[]::text[], '<p><meta charset="utf-8">InventoryOS License - Monthly</p>', 99, NULL, 'USD', true, 'published', '2025-01-24T05:15:46-05:00', '2026-08-29T07:43:11-04:00'),
  ('loyalty-program-license', 'Loyalty Program License', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], 'eatOS Monthly Software License', 50, NULL, 'USD', true, 'published', '2025-01-24T05:13:18-05:00', '2026-08-29T07:43:11-04:00'),
  ('point-of-purchase-license', 'Point of Purchase License', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p>eatOS Monthly Software License</p>
<p>Hardware Required : <meta charset="utf-8">Choose Poynt 950 Flex, Poynt Smart Terminal or Adyen S1F2</p>', 50, NULL, 'USD', true, 'published', '2025-01-24T05:11:01-05:00', '2026-08-29T07:43:11-04:00'),
  ('custom-bundle', 'Custom Bundle', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<div>
<meta charset="utf-8">
<p dir="ltr"><span>All in One Point-of-Sale with CFD<br>(15” + 10” with Built in Printer - Sunmi T2)</span></p>
<p dir="ltr"><span>Card Reader (Ingenico Lane 3000)</span></p>
<p dir="ltr"><span>Menu Build (Remote)</span></p>
<p dir="ltr"><span>Menu Review (Remote)</span></p>
<p dir="ltr"><span>Remote Installation and Training (8hrs)</span></p>
<p dir="ltr"><span>Point-of-Sale Software License</span></p>
<b id="docs-internal-guid-1e3c5219-7fff-5457-0d52-0cffd0be9adf"></b>
</div>
<ul></ul>', 569, NULL, 'USD', true, 'published', '2025-01-03T09:01:19-05:00', '2026-08-29T07:43:11-04:00'),
  ('product-customizer-item-customizations', 'Item Customizations', 'eatOS - Restaurants Made Simple', 'SHOPSTORM_HIDDEN_PRODUCT', ARRAY[]::text[], '<p>*** This is a hidden product used by Product Customizer. Please do not modify or delete! ***</p>
      <p>In order to add priced options to the cart, this product must be <strong>Visible </strong>in the
      Online Store and set to <strong>Don''t Track Inventory</strong>.
      <span style="color: #ff0000;">Modifying these settings may prevent your shoppers from checking out.</span></p>
      <p>You may safely update the default <em>Title</em> and <em>Image</em> to better suit your shop.</p>
      <p>For questions, please <span style="color: #0000ff;">
      <a href="https://intercom.help/product-customizer/" target="_blank" style="color: #0000ff;">contact us</a>
      </span>.</p>', 0.01, NULL, 'USD', true, 'published', '2024-12-30T04:20:56-05:00', '2026-08-29T07:43:11-04:00'),
  ('sunmi-k2-mini-kiosk-with-card-reader', 'Sunmi - K2 Mini - Self Service Kiosk', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '', 1899, NULL, 'USD', true, 'published', '2024-08-09T09:43:44-04:00', '2026-08-29T07:43:11-04:00'),
  ('sunmi-t2s-lite', 'Sunmi-T2 Lite: 15" Point of Sale', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '<p><meta charset="utf-8">15” Countertop Station No Guest Display Starting from $0.00</p>', 0, NULL, 'USD', true, 'published', '2024-08-09T09:41:41-04:00', '2026-08-29T07:43:11-04:00'),
  ('sunmi-t2-15-10-point-of-sale', 'Sunmi-T2: 15" Point of Sale with 10" Guest Facing Display', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '<p><meta charset="utf-8">All In One Stand Alone Point of Sale - Starting from $0.00</p>', 200, NULL, 'USD', true, 'published', '2024-08-09T09:40:50-04:00', '2026-08-29T07:43:11-04:00'),
  ('poynt-newland-n910', 'Poynt - Newland N910 - Handheld', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '', 0, NULL, 'USD', true, 'published', '2024-08-09T09:30:01-04:00', '2026-08-29T07:43:11-04:00'),
  ('guest-facing-display-t2', 'Sunmi T2 Lite 15"', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '<p><meta charset="utf-8">The Kitchen Display System is the perfect way to bring your kitchen team into a new era of front-of-house systems.</p>
<!---->', 799, NULL, 'USD', true, 'published', '2024-08-09T09:25:48-04:00', '2026-08-29T07:43:11-04:00'),
  ('monthly-subscription-gift-card', 'Gift Card Program License', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p>License for eatOS'' Gift card generating program <meta charset="utf-8">(Physical Cards Sold Separately).</p>
<p><meta charset="utf-8">Hardware Required : Point of Sale ( Sunmi T2 Lite 15”) + Point of Sale License. Gift Card is not sold as a stand alone. </p>', 25, NULL, 'USD', true, 'published', '2024-08-07T09:22:49-04:00', '2026-08-29T07:43:11-04:00'),
  ('food-truck-bundle', 'Food Truck & Caterer Bundle', 'eatOS - Restaurants Made Simple', NULL, ARRAY[]::text[], '<p dir="ltr"><meta charset="utf-8">Choice of the following Device:</p>
<p dir="ltr"><meta charset="utf-8">1. Poynt N950, <br>2. Poynt Smart Terminal, <br>3. Adyen S1F2</p>
<p dir="ltr"><meta charset="utf-8">Built-In Printer</p>
<p dir="ltr"><meta charset="utf-8">Free Remote Assistance</p>
<p dir="ltr"><meta charset="utf-8">Free Menu Build</p>
<p dir="ltr"><meta charset="utf-8">Wi-Fi and Optional Cellular Data Plan Available</p>
<!---->', 0, NULL, 'USD', true, 'published', '2024-08-07T04:19:19-04:00', '2026-08-29T07:43:11-04:00'),
  ('quick-service-bundle', 'Quick Service Bundle', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<div>
<meta charset="utf-8">
<p dir="ltr"><meta charset="utf-8">15” Station with 10” Guest Facing Display <br>with Built-In Printer</p>
<p dir="ltr"><meta charset="utf-8">Credit Card Reader</p>
<p dir="ltr"><meta charset="utf-8">Free Remote Assistance</p>
<p dir="ltr"><meta charset="utf-8">Free Menu Build</p>
</div>
<ul></ul>', 0, 0, 'USD', true, 'published', '2024-08-06T12:06:16-04:00', '2026-08-29T07:43:11-04:00'),
  ('fine-dining-bundle', 'Full Service Bundle', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<div>
<meta charset="utf-8">
<p dir="ltr"><meta charset="utf-8">15” Station with 10” Guest Facing Display <br>with Built-In Printer</p>
<p dir="ltr"><meta charset="utf-8">15” Kitchen Display with Stand</p>
<p dir="ltr"><meta charset="utf-8">Credit Card Reader</p>
<p dir="ltr"><meta charset="utf-8">Free Menu Build</p>
<p dir="ltr"><meta charset="utf-8">Free Remote Assistance</p>
</div>
<ul></ul>', 548, NULL, 'USD', true, 'published', '2024-08-06T09:24:05-04:00', '2026-08-29T07:43:11-04:00'),
  ('menu-setup-2', 'Menu Setup', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '', 250, NULL, 'USD', true, 'published', '2022-05-11T13:23:59-04:00', '2026-08-29T07:43:11-04:00'),
  ('remote-network-setup', 'Remote Network Setup', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '', 500, NULL, 'USD', true, 'published', '2022-05-11T13:23:57-04:00', '2026-08-29T07:43:11-04:00'),
  ('online-ordering-license', 'Online Ordering License', 'myeatOS', NULL, ARRAY[]::text[], '<p>Online Ordering License - Monthly Subscription</p>
<p><meta charset="utf-8">Order OS (No Commission Online Ordering includes QR pay at table) <br></p>
<p>Hardware Required : Point of Sale (T2 Lite 15”) + Point of Sale License. Online Ordering is not sold as a stand alone. </p>', 50, NULL, 'USD', true, 'published', '2022-03-31T07:58:24-04:00', '2026-08-29T07:43:11-04:00'),
  ('call-for-demo-quote', 'Team Essentials', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<br>', 0, NULL, 'USD', true, 'published', '2021-09-23T09:28:41-04:00', '2026-08-29T07:43:11-04:00'),
  ('eatos-bundle-monthly-software', 'Point of Sale License', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p>eatOS Monthly Software License<br></p>
<p>Hardware Required : Point of Sale (Sunmi <meta charset="utf-8">T2 Lite 15”)</p>', 59, NULL, 'USD', true, 'published', '2021-09-01T22:22:46-04:00', '2026-08-29T07:43:11-04:00'),
  ('star-2-yr-std-swap-a-star-warranty-ext-impact', 'Star 2 YR Std - Swap a Star Warranty Ext. - Impact  (US Only)', 'myeatOS', NULL, ARRAY[]::text[], '<p>Star Standard 2 Year Warranty Ext. for Impact Printer Next Business Day Replacement Device - Total of 2 Years (Standard)</p>', 52.5, NULL, 'USD', true, 'published', '2021-08-31T06:48:45-04:00', '2026-08-29T07:43:11-04:00'),
  ('ubiquiti-access-point-pro', 'Ubiquiti Long Range Access Point', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<style type="text/css"><!--
td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}
--></style>
<p><span data-sheets-userformat=''{"2":4482,"4":{"1":2,"2":16773836},"10":2,"11":4,"15":"Arial"}'' data-sheets-value=''{"1":2,"2":"Ubiquiti Access Point Pro"}''>Ubiquiti Access Point Pro</span><br></p>', 159, NULL, 'USD', true, 'published', '2021-08-25T05:03:09-04:00', '2026-08-29T07:43:11-04:00'),
  ('star-micronics-tsp654-usb', 'Star Micronics TSP654 USB', 'myeatOS', NULL, ARRAY[]::text[], '<style type="text/css"><!--
td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}
--></style>
<p><span>Always leading, and always innovating, Star Micronics'' TSP654II high-speed thermal receipt printer is offered with a variety of interface options. Updated to further enhance one of Star''s most popular printers, the TSP654II boasts a lightning-fast print speed of 60 RPM (receipts per minute) and features an improved guillotine auto-cutter, and easy "Drop-In and Print" paper loading.</span></p>', 269, NULL, 'USD', true, 'published', '2021-08-25T04:42:00-04:00', '2026-08-29T07:43:11-04:00'),
  ('star-micronics-tsp654-lan', 'Star Micronics TSP654 LAN', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<style type="text/css"><!--
td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}
--></style>
<p><span>Always leading, and always innovating, Star Micronics'' TSP654II high-speed thermal receipt printer is offered with a variety of interface options. Updated to further enhance one of Star''s most popular printers, the TSP654II boasts a lightning-fast print speed of 60 RPM (receipts per minute) and features an improved guillotine auto-cutter, and easy "Drop-In and Print" paper loading.</span></p>', 289, NULL, 'USD', true, 'published', '2021-08-25T04:40:37-04:00', '2026-08-29T07:43:11-04:00'),
  ('apg-cash-drawer-heavy-duty', 'Cash Drawer - Heavy Duty', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p><span>Cash Drawer - Heavy Duty</span></p>', 139, NULL, 'USD', true, 'published', '2021-08-25T04:09:43-04:00', '2026-08-29T07:43:11-04:00'),
  ('epson-tm-m30ii-nt-thermal-usb-lan', 'Epson TM-M30II-NT Thermal - USB/LAN', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p><meta charset="utf-8">Epson C31CE95022 Series TM-M30 Thermal Receipt Printer, Autocutter, USB, Ethernet, Energy Star, Black</p>', 299, NULL, 'USD', true, 'published', '2021-08-25T04:04:36-04:00', '2026-08-29T07:43:11-04:00'),
  ('epson-tm-t20iii-thermal-usb', 'Epson TM-T20III Thermal - USB', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p><span>The TM-T20II is an affordable POS receipt printer with fast print speeds and economical features. The combination of its fast print speeds, high reliability and economical operation, make this Energy Star-qualified printer a must-have for small retail and specialty stores, hospitality venues and grocery stores.</span></p>', 169, NULL, 'USD', true, 'published', '2021-08-25T04:02:07-04:00', '2026-08-29T07:43:11-04:00'),
  ('epson-tm-u220b-dot-matrix-lan', 'Epson TM-U220B - DOT Matrix - LAN', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p><span>The TM-U220 printers are designed to be compatible with existing systems built around a TM-U210. These systems can be upgraded simply by dropping in a TM-U220. Moreover, since the external dimensions are nearly identical, there is no need to change the installation environment. The transition to the new model is as smooth as can be.</span></p>', 289, NULL, 'USD', true, 'published', '2021-08-25T04:00:33-04:00', '2026-08-29T07:43:11-04:00'),
  ('printer-ribbon-epson', 'Epson Replacement Ribbon TMU220 (Black and Red 12-Pack)', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '12 Pack Black Red Ribbon Ink Cartridge', 19.99, NULL, 'USD', true, 'published', '2021-08-25T02:31:14-04:00', '2026-08-29T07:43:11-04:00'),
  ('register-rolls-impact-printer-1', 'Register Rolls - Impact Printer', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<style type="text/css"><!--
td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}
--></style>
<span data-sheets-userformat=''{"2":4480,"10":2,"11":4,"15":"Arial"}'' data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;2- Ply Bond  Carbonless 3\&quot;X90'' 50ct&quot;}">2- Ply Bond Carbonless 3"X90'' 50ct</span>', 59, NULL, 'USD', true, 'published', '2021-08-23T10:20:52-04:00', '2026-08-29T07:43:11-04:00'),
  ('register-rolls-for-thermal-printer', 'Register Rolls - for Thermal Printer', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], 'Thermal Paper 3 1/8" x 230'' 44MM 50ct', 99, NULL, 'USD', true, 'published', '2021-08-23T10:09:03-04:00', '2026-08-29T07:43:11-04:00'),
  ('printer-ribbon-star', 'Star Replacement Ribbon SP700 (Black and Red, 12-Pack)', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '12 Pack Black Red Ribbon Ink Cartridge', 19.99, NULL, 'USD', true, 'published', '2021-08-20T09:39:13-04:00', '2026-08-29T07:43:11-04:00'),
  ('register-rolls-impact-printer', 'Register Rolls - Impact Printer', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '1- Ply Bond 3"x165'' 50ct', 59, NULL, 'USD', true, 'published', '2021-08-20T09:38:10-04:00', '2026-08-29T07:43:11-04:00'),
  ('networking-1', 'Networking', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p>Networking Configuration - Remote</p>
<p><span style="font-size: 12px;">Disclaimer: Additional fees for larger deployments requiring added time or services may be applicable as necessary.</span></p>', 700, NULL, 'USD', true, 'published', '2021-08-20T09:31:28-04:00', '2026-08-29T07:43:11-04:00'),
  ('hardware-installation-1', 'Hardware Installation', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], 'On-Site Hardware Installation', 0, NULL, 'USD', true, 'published', '2021-08-20T09:21:40-04:00', '2026-08-29T07:43:11-04:00'),
  ('ubiquity-lte-failover-data-plan-sold-separately', 'Ubiquiti LTE Failover (Data Plan Sold Separately)', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], 'Unifi Redundant WAN over LTE Failover/Backup', 229, NULL, 'USD', true, 'published', '2021-08-20T09:07:05-04:00', '2026-08-29T07:43:11-04:00'),
  ('ubiquity-8-port-poe-60w-switch', 'Ubiquiti 8 port POE 60w Switch', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], 'Ubiquiti 8 Port w/ PoE - 60W', 129, NULL, 'USD', true, 'published', '2021-08-20T09:00:30-04:00', '2026-08-29T07:43:11-04:00'),
  ('etos-star-micronics-sp742-lan', 'Star Micronics SP742 LAN', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<p>Impact Kitchen Printer</p>
<p><span>Built specifically to work in environments where heat and humidity can erode the type on the kitchen order, the SP742 is an ideal </span>kitchen printing solution<span>. This fast, two-color printer offers crisp, easy to read type for quick viewing, clamshell design for easy paper loading and an embedded power supply for space efficiency.</span></p>', 349, NULL, 'USD', true, 'published', '2021-08-20T08:42:35-04:00', '2026-08-29T07:43:11-04:00'),
  ('eatos-star-micronics-tsp654ii-sticky-printer-lan', 'Star Micronics TSP654II Sticky Printer LAN', 'eatOS - Restaurant management made simple', NULL, ARRAY[]::text[], '<span>The TSP654IISK liner-free label printer is designed to work with liner-free labeling applications and is ideal for creating food labels and more. Repositionable thermal labels can stick to virtually any surface, and can be removed easily and reapplied leaving behind no residue. The liner-free labels are an alternative to using silicone-lined labels or tape. New to the TSP654IISK is the addition of the Taken Sensor, which enables the printer to hold print jobs until the first print job is taken. </span>', 339, NULL, 'USD', true, 'published', '2021-08-20T08:23:32-04:00', '2026-08-29T07:43:11-04:00'),
  ('kds-license', 'Kitchen Display System License', 'myeatOS', NULL, ARRAY[]::text[], '<p>Kitchen Display System Single License - Monthly Subscription</p>
<p>Hardware Required : Point of Sale (Sunmi T2 Lite 15”) + Point of Sale License. Kitchen Display System is not sold as a stand alone.</p>', 25, NULL, 'USD', true, 'published', '2021-06-21T06:03:54-04:00', '2026-08-29T07:43:11-04:00'),
  ('kiosk-license', 'Self Service Kiosk License', 'myeatOS', NULL, ARRAY[]::text[], '<p>Self Service Kiosk Single License - Monthly</p>
<p>Hardware Required : K2 Android 13 Countertops Sunmi Kiosk </p>', 99, NULL, 'USD', true, 'published', '2021-06-21T06:03:53-04:00', '2026-08-29T07:43:11-04:00'),
  ('edge-server-monthly', 'Edge Server - Monthly', 'myeatOS', NULL, ARRAY[]::text[], '<p>Local Raspberry Pi Edge Server </p>', 50, NULL, 'USD', true, 'published', '2021-06-21T06:03:51-04:00', '2026-08-29T07:43:11-04:00'),
  ('eatos-custom-gift-cards', 'eatOS: Custom Gift Cards', 'eatOS - Restaurant management made simple', 'Giftcard', ARRAY[]::text[], '', 0.79, NULL, 'USD', true, 'published', '2021-01-15T00:45:33-05:00', '2026-08-29T07:43:11-04:00'),
  ('firewall', 'Firewall', 'myeatOS', NULL, ARRAY[]::text[], '<p>eatOS Firewall Setup</p>', 800, NULL, 'USD', true, 'published', '2020-08-18T16:18:33-04:00', '2026-08-29T07:43:11-04:00'),
  ('hardware-install', 'Hardware Install', 'myeatOS', NULL, ARRAY[]::text[], '<p>eatOS On-Site Hardware Install and Setup</p>', 500, NULL, 'USD', true, 'published', '2020-08-18T16:18:32-04:00', '2026-08-29T07:43:11-04:00')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_images (product_slug, url, alt, width, height, position) VALUES
  ('magnetic-stripe-reader-gift-cards', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/msr.png?v=1738591539', 'Magnetic Stripe Reader (Gift Cards)', 800, 600, 0),
  ('star-thermal-143-iv', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/tsp100.png?v=1738590764', 'Star Thermal 143 IV', 800, 600, 0),
  ('wall-mount-for-15-kitchen-display-system', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/wallmount.png?v=1738589350', 'Wall Mount for 15” Kitchen Display System', 800, 600, 0),
  ('hd-persona-fingerprint-reader', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/fingerprintreader.png?v=1738588580', 'HD Persona Fingerprint Reader', 800, 600, 0),
  ('epson-thermal-kitchen-printer', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/printer70_a9e8cfd1-c01a-479a-bdbb-b89cb2b24d29.png?v=1737734321', 'Epson Thermal Kitchen Printer', 172, 150, 0),
  ('workforceos-license', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Workforce_OS.jpg?v=1737726823', 'WorkforceOS License', 800, 600, 0),
  ('inventoryos-license', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Inventory_OS.jpg?v=1737726537', 'InventoryOS  License', 800, 600, 0),
  ('loyalty-program-license', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Loyalty_Program.jpg?v=1737726625', 'Loyalty Program License', 800, 600, 0),
  ('point-of-purchase-license', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/POP.jpg?v=1737726790', 'Point of Purchase License', 800, 600, 0),
  ('custom-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/cusbun.png?v=1736173124', 'Custom Bundle', 800, 600, 0),
  ('custom-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/QuickService_1_1.png?v=1736173124', 'Custom Bundle', 800, 600, 1),
  ('custom-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/qs2.png?v=1736173124', 'Custom Bundle', 800, 600, 2),
  ('custom-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/qs3.png?v=1736173124', 'Custom Bundle', 800, 600, 3),
  ('custom-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Printer_2_2706503d-e626-4b91-ab92-d728d047462a.png?v=1736173124', 'Custom Bundle', 800, 600, 4),
  ('custom-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/add.png?v=1736173124', 'Custom Bundle', 800, 600, 5),
  ('product-customizer-item-customizations', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/dashboard-logo-f9d0b2ed304842f26af30d4440dc9be4695dee70d2c77732fea5ce97c143337e.png?v=1735550460', 'Item Customizations', 158, 158, 0),
  ('sunmi-k2-mini-kiosk-with-card-reader', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Sunmi-K2mini-Kiosk.png?v=1723134812', 'Sunmi - K2 Mini - Self Service Kiosk', 1570, 2798, 0),
  ('sunmi-k2-mini-kiosk-with-card-reader', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Sunmi_-_K2_Mini_-_Self_Service_Kiosk_7c4083a3-e8aa-403b-ab8f-58a8407ca7ea.png?v=1723221992', 'Sunmi - K2 Mini - Self Service Kiosk', 1200, 1200, 1),
  ('sunmi-t2s-lite', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/T2SLite-Standalone.png?v=1723134584', 'Sunmi-T2 Lite: 15" Point of Sale', 1779, 2107, 0),
  ('sunmi-t2-15-10-point-of-sale', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Sunmi_-_T2S_-_15Point_of_Sale_with_10Customer_Facing_Display_1.png?v=1723219915', 'Sunmi-T2: 15" Point of Sale with 10" Guest Facing Display', 1200, 1200, 0),
  ('poynt-newland-n910', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/poynt_n910_front.png?v=1723217704', 'Poynt - Newland N910 - Handheld', 600, 600, 0),
  ('poynt-newland-n910', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/poynt_n910_angle.png?v=1723217704', 'Poynt - Newland N910 - Handheld', 600, 600, 1),
  ('guest-facing-display-t2', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Sunmi_-_T2S_Lite_Standalone_-_Point_of_Sale_1.png?v=1723220997', 'Sunmi T2 Lite 15"', 1200, 1200, 0),
  ('monthly-subscription-gift-card', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/GiftCard.png?v=1648045434', 'Gift Card Program License', 2000, 2000, 0),
  ('food-truck-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/pop_1200x1200_6b3be40a-851c-4eac-b717-a1e1f3447b4e.png?v=1723547864', 'Food Truck & Caterer Bundle', 1200, 1200, 0),
  ('food-truck-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/pop_1.png?v=1723041332', 'Food Truck & Caterer Bundle', 718, 718, 1),
  ('food-truck-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/poynt_smart_terminal_1200x1200_4849f035-233c-47a2-a802-05097c485b36.png?v=1723547864', 'Food Truck & Caterer Bundle', 1200, 1200, 2),
  ('quick-service-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/QuickService_1_1.png?v=1736173124', 'Quick Service Bundle', 800, 600, 0),
  ('quick-service-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/qs2.png?v=1736173124', 'Quick Service Bundle', 800, 600, 1),
  ('quick-service-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/qs3.png?v=1736173124', 'Quick Service Bundle', 800, 600, 2),
  ('quick-service-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Printer_2_2706503d-e626-4b91-ab92-d728d047462a.png?v=1736173124', 'Quick Service Bundle', 800, 600, 3),
  ('quick-service-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Casu_drawer.png?v=1736342416', 'Quick Service Bundle', 800, 600, 4),
  ('quick-service-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Add-on.png?v=1736342452', 'Quick Service Bundle', 800, 600, 5),
  ('fine-dining-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/fs1.png?v=1738150113', 'Full Service Bundle', 800, 600, 0),
  ('fine-dining-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/full2.png?v=1738150113', 'Full Service Bundle', 800, 600, 1),
  ('fine-dining-bundle', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/qs3_0209e1a1-2177-4fef-ae1e-77670973e8bb.png?v=1738150113', 'Full Service Bundle', 800, 600, 2),
  ('menu-setup-2', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/eOShopIconsver1.0_p_03Jan22ph-03_18d16ebd-6cf7-4235-9970-4e31cb9acbb0.png?v=1652289918', 'Menu Setup', 4167, 4167, 0),
  ('remote-network-setup', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/eOShopIconsver1.0_p_03Jan22ph-02_96b0997a-2d7e-41f5-b148-8d98c8473bbe.png?v=1652289905', 'Remote Network Setup', 4167, 4167, 0),
  ('online-ordering-license', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/OnlineOrdering.png?v=1724410628', 'Online Ordering License', 1999, 2000, 0),
  ('eatos-bundle-monthly-software', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/POS-1000x1000.png?v=1723472690', 'Point of Sale License', 1000, 1000, 0),
  ('ubiquiti-access-point-pro', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/UbiquitiAccessPointPro.png?v=1624949633', 'Ubiquiti Long Range Access Point', 400, 400, 0),
  ('star-micronics-tsp654-usb', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Star_Micronics_TSP654_USB.png?v=1723443476', 'Star Micronics TSP654 USB', 600, 600, 0),
  ('star-micronics-tsp654-lan', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Star_Micronics_TSP654_LAN.png?v=1723443535', 'Star Micronics TSP654 LAN', 600, 600, 0),
  ('apg-cash-drawer-heavy-duty', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/qs4.png?v=1736954707', 'Cash Drawer - Heavy Duty', 800, 600, 0),
  ('epson-tm-m30ii-nt-thermal-usb-lan', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/eOEPSON_TM-M30IINT_01ThermalUSB-LAN.png?v=1639493015', 'Epson TM-M30II-NT Thermal - USB/LAN', 600, 600, 0),
  ('epson-tm-t20iii-thermal-usb', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Epson_TM-T20III_Thermal_-_USB.png?v=1723443719', 'Epson TM-T20III Thermal - USB', 600, 600, 0),
  ('epson-tm-u220b-dot-matrix-lan', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Epson_TM-U220B_-_DOT_Matrix_-_LAN.png?v=1723443587', 'Epson TM-U220B - DOT Matrix - LAN', 600, 600, 0),
  ('printer-ribbon-epson', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/12PackBlackRedRibbonInkCartridgeepson.jpg?v=1629873054', 'Epson Replacement Ribbon TMU220 (Black and Red 12-Pack)', 2000, 2000, 0),
  ('register-rolls-impact-printer-1', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/3-1-4-x-90-83mm-x-27m-2-ply-carbonless-paper.jpg?v=1629872266', 'Register Rolls - Impact Printer', 460, 360, 0),
  ('register-rolls-for-thermal-printer', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/RegisterRolls3-18x230.jpg?v=1629871959', 'Register Rolls - for Thermal Printer', 1399, 1500, 0),
  ('printer-ribbon-star', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/12PackBlackRedRibbonInkCartridge.jpg?v=1629872836', 'Star Replacement Ribbon SP700 (Black and Red, 12-Pack)', 1500, 957, 0),
  ('register-rolls-impact-printer', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/1-PlyBond3x165.jpg?v=1629872338', 'Register Rolls - Impact Printer', 1500, 1500, 0),
  ('ubiquity-lte-failover-data-plan-sold-separately', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/UbiquityLTEFailover.png?v=1629877524', 'Ubiquiti LTE Failover (Data Plan Sold Separately)', 600, 600, 0),
  ('ubiquity-8-port-poe-60w-switch', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/Ubiquity8portPOE60wSwitch.png?v=1629872669', 'Ubiquiti 8 port POE 60w Switch', 600, 600, 0),
  ('etos-star-micronics-sp742-lan', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/eOSP742ImpactPrinter.png?v=1639493046', 'Star Micronics SP742 LAN', 477, 477, 0),
  ('eatos-star-micronics-tsp654ii-sticky-printer-lan', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Star_Micronics_TSP654II_Sticky_Printer_LAN.png?v=1723443376', 'Star Micronics TSP654II Sticky Printer LAN', 600, 600, 0),
  ('kds-license', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/KDS_85fe83aa-8171-4aca-a9eb-3f711f93d88f.png?v=1724410891', 'Kitchen Display System License', 1999, 2000, 0),
  ('kiosk-license', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/KIOSK.png?v=1724411339', 'Self Service Kiosk License', 1999, 2000, 0),
  ('eatos-custom-gift-cards', 'https://cdn.shopify.com/s/files/1/0461/6821/1605/products/eatos.jpg?v=1611123193', 'eatOS: Custom Gift Cards', 1162, 494, 0)
ON CONFLICT DO NOTHING;

INSERT INTO public.product_variants (id, product_slug, title, sku, price_amount, compare_at_amount, currency, available, requires_shipping, options, image_url) VALUES
  ('40919538172053', 'magnetic-stripe-reader-gift-cards', 'Default Title', NULL, 59, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('45746903089301', 'star-thermal-143-iv', 'Default Title', NULL, 329, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('45746885755029', 'wall-mount-for-15-kitchen-display-system', 'Default Title', NULL, 99, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407408509077', 'hd-persona-fingerprint-reader', 'Default Title', 'eOS257', 99, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('45737831661717', 'smart-terminal-7-4', 'Buy Now', NULL, 49, NULL, 'USD', true, true, ARRAY['Buy Now']::text[], NULL),
  ('45737931309205', 'smart-terminal-7-4', 'Pay As You Go', NULL, 39, NULL, 'USD', true, true, ARRAY['Pay As You Go']::text[], NULL),
  ('45737828941973', 'adyen-s1f2', 'Buy Now', NULL, 399, NULL, 'USD', true, true, ARRAY['Buy Now']::text[], NULL),
  ('45714467815573', 'epson-thermal-kitchen-printer', 'Default Title', 'C31CJ95022', 299, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('45713965482133', 'workforceos-license', 'Default Title', NULL, 20, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('45713951359125', 'inventoryos-license', 'Default Title', 'eOS125', 99, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('45713949917333', 'loyalty-program-license', 'Default Title', NULL, 50, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('45713947394197', 'point-of-purchase-license', 'Default Title', NULL, 50, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('45660475916437', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660480536725', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480569493', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480602261', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase','None']::text[], NULL),
  ('45660475949205', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660480635029', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480667797', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480700565', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','None']::text[], NULL),
  ('45660475981973', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660480733333', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480766101', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480798869', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase','None']::text[], NULL),
  ('45660476014741', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660480831637', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480864405', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480897173', 'custom-bundle', 'Buy Now / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Buy Now','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','None']::text[], NULL),
  ('45660476047509', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660480929941', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480962709', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660480995477', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase','None']::text[], NULL),
  ('45660476080277', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660481028245', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660481061013', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660481093781', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T2) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','None']::text[], NULL),
  ('45660476113045', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660481126549', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660481159317', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660481192085', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase','None']::text[], NULL),
  ('45660476145813', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite)']::text[], NULL),
  ('45660481224853', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660481257621', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','Kitchen Display System (Sunmi T2 Lite) + Self Service Kiosk (Sunmi K2 Mini)']::text[], NULL),
  ('45660481290389', 'custom-bundle', 'Pay As You Go / Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite) / None', NULL, 569, NULL, 'USD', true, true, ARRAY['Pay As You Go','Point of Sale (Sunmi T3) + Point of Purchase + Guest Facing Display (Sunmi T2 Lite)','None']::text[], NULL),
  ('45647468658837', 'product-customizer-item-customizations', 'Default Title', NULL, 0.01, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('45310984978581', 'sunmi-k2-mini-kiosk-with-card-reader', 'Full Standing Kiosk', NULL, 2099, NULL, 'USD', true, true, ARRAY['Full Standing Kiosk']::text[], NULL),
  ('45310985011349', 'sunmi-k2-mini-kiosk-with-card-reader', 'Counter Top Kiosk', NULL, 1899, NULL, 'USD', true, true, ARRAY['Counter Top Kiosk']::text[], NULL),
  ('45310983798933', 'sunmi-t2s-lite', 'Buy Now', NULL, 799, NULL, 'USD', true, true, ARRAY['Buy Now']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/T2SLite-Standalone.png?v=1723134584'),
  ('45310983831701', 'sunmi-t2s-lite', 'Pay As You Go', NULL, 0, NULL, 'USD', true, true, ARRAY['Pay As You Go']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/T2SLite-Standalone.png?v=1723134584'),
  ('45310983405717', 'sunmi-t2-15-10-point-of-sale', 'Buy Now', NULL, 999, NULL, 'USD', true, true, ARRAY['Buy Now']::text[], NULL),
  ('45310983438485', 'sunmi-t2-15-10-point-of-sale', 'Pay As You Go', NULL, 200, NULL, 'USD', true, true, ARRAY['Pay As You Go']::text[], NULL),
  ('45310977507477', 'poynt-newland-n910', 'Buy Now', NULL, 29, NULL, 'USD', true, true, ARRAY['Buy Now']::text[], NULL),
  ('45310977540245', 'poynt-newland-n910', 'Pay As You Go', NULL, 0, NULL, 'USD', true, true, ARRAY['Pay As You Go']::text[], NULL),
  ('45310975180949', 'guest-facing-display-t2', 'Default Title', NULL, 799, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('42050993651861', 'monthly-subscription-gift-card', 'Default Title', NULL, 25, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('45304564285589', 'food-truck-bundle', 'Pay As You Go / Poynt N950 Flex Handheld', NULL, 0, NULL, 'USD', true, true, ARRAY['Pay As You Go','Poynt N950 Flex Handheld']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/pop_1.png?v=1723041332'),
  ('45304564318357', 'food-truck-bundle', 'Pay As You Go / Smart Terminal Dual Screen 7" + 4"', NULL, 39, NULL, 'USD', true, true, ARRAY['Pay As You Go','Smart Terminal Dual Screen 7" + 4"']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/poynt_smart_terminal_1200x1200_4849f035-233c-47a2-a802-05097c485b36.png?v=1723547864'),
  ('45737730932885', 'food-truck-bundle', 'Buy Now / Adyen S1F2', NULL, 499, NULL, 'USD', true, true, ARRAY['Buy Now','Adyen S1F2']::text[], NULL),
  ('45303281057941', 'quick-service-bundle', 'Buy Now / No thanks / I need Online Ordering (+$50/mo)', NULL, 1049, NULL, 'USD', true, true, ARRAY['Buy Now','No thanks','I need Online Ordering (+$50/mo)']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/QuickService_1_1.png?v=1736173124'),
  ('45737626566805', 'quick-service-bundle', 'Buy Now / No thanks / I don’t need Online Ordering', NULL, 999, NULL, 'USD', true, true, ARRAY['Buy Now','No thanks','I don’t need Online Ordering']::text[], NULL),
  ('45303281090709', 'quick-service-bundle', 'Buy Now / Cash Drawer (+$139) / I need Online Ordering (+$50/mo)', NULL, 1188, NULL, 'USD', true, true, ARRAY['Buy Now','Cash Drawer (+$139)','I need Online Ordering (+$50/mo)']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Casu_drawer.png?v=1736342416'),
  ('45737626599573', 'quick-service-bundle', 'Buy Now / Cash Drawer (+$139) / I don’t need Online Ordering', NULL, 1138, NULL, 'USD', true, true, ARRAY['Buy Now','Cash Drawer (+$139)','I don’t need Online Ordering']::text[], NULL),
  ('45303281123477', 'quick-service-bundle', 'Buy Now / Kitchen Thermal Printer (+$299) / I need Online Ordering (+$50/mo)', NULL, 1348, NULL, 'USD', true, true, ARRAY['Buy Now','Kitchen Thermal Printer (+$299)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737626632341', 'quick-service-bundle', 'Buy Now / Kitchen Thermal Printer (+$299) / I don’t need Online Ordering', NULL, 1298, NULL, 'USD', true, true, ARRAY['Buy Now','Kitchen Thermal Printer (+$299)','I don’t need Online Ordering']::text[], NULL),
  ('45303281156245', 'quick-service-bundle', 'Buy Now / Add Both (+$438) / I need Online Ordering (+$50/mo)', NULL, 1487, NULL, 'USD', true, true, ARRAY['Buy Now','Add Both (+$438)','I need Online Ordering (+$50/mo)']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Add-on.png?v=1736342452'),
  ('45737626665109', 'quick-service-bundle', 'Buy Now / Add Both (+$438) / I don’t need Online Ordering', NULL, 1437, NULL, 'USD', true, true, ARRAY['Buy Now','Add Both (+$438)','I don’t need Online Ordering']::text[], NULL),
  ('45302353985685', 'quick-service-bundle', 'Pay As You Go / No thanks / I need Online Ordering (+$50/mo)', NULL, 50, NULL, 'USD', true, true, ARRAY['Pay As You Go','No thanks','I need Online Ordering (+$50/mo)']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/QuickService_1_1.png?v=1736173124'),
  ('45737626697877', 'quick-service-bundle', 'Pay As You Go / No thanks / I don’t need Online Ordering', NULL, 0, NULL, 'USD', true, true, ARRAY['Pay As You Go','No thanks','I don’t need Online Ordering']::text[], NULL),
  ('45302354018453', 'quick-service-bundle', 'Pay As You Go / Cash Drawer (+$139) / I need Online Ordering (+$50/mo)', NULL, 189, NULL, 'USD', true, true, ARRAY['Pay As You Go','Cash Drawer (+$139)','I need Online Ordering (+$50/mo)']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Casu_drawer.png?v=1736342416'),
  ('45737626730645', 'quick-service-bundle', 'Pay As You Go / Cash Drawer (+$139) / I don’t need Online Ordering', NULL, 139, NULL, 'USD', true, true, ARRAY['Pay As You Go','Cash Drawer (+$139)','I don’t need Online Ordering']::text[], NULL),
  ('45302354051221', 'quick-service-bundle', 'Pay As You Go / Kitchen Thermal Printer (+$299) / I need Online Ordering (+$50/mo)', NULL, 349, 0, 'USD', true, true, ARRAY['Pay As You Go','Kitchen Thermal Printer (+$299)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737626763413', 'quick-service-bundle', 'Pay As You Go / Kitchen Thermal Printer (+$299) / I don’t need Online Ordering', NULL, 299, NULL, 'USD', true, true, ARRAY['Pay As You Go','Kitchen Thermal Printer (+$299)','I don’t need Online Ordering']::text[], NULL),
  ('45302354116757', 'quick-service-bundle', 'Pay As You Go / Add Both (+$438) / I need Online Ordering (+$50/mo)', NULL, 488, NULL, 'USD', true, true, ARRAY['Pay As You Go','Add Both (+$438)','I need Online Ordering (+$50/mo)']::text[], 'https://cdn.shopify.com/s/files/1/0461/6821/1605/files/Add-on.png?v=1736342452'),
  ('45737626796181', 'quick-service-bundle', 'Pay As You Go / Add Both (+$438) / I don’t need Online Ordering', NULL, 438, NULL, 'USD', true, true, ARRAY['Pay As You Go','Add Both (+$438)','I don’t need Online Ordering']::text[], NULL),
  ('45300830994581', 'fine-dining-bundle', 'Buy Now / No thanks / I need Online Ordering (+$50/mo)', NULL, 1549, NULL, 'USD', true, true, ARRAY['Buy Now','No thanks','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679519893', 'fine-dining-bundle', 'Buy Now / No thanks / I don’t need Online Ordering', NULL, 1499, NULL, 'USD', true, true, ARRAY['Buy Now','No thanks','I don’t need Online Ordering']::text[], NULL),
  ('45300811792533', 'fine-dining-bundle', 'Buy Now / Cash Drawer (+$139) / I need Online Ordering (+$50/mo)', NULL, 1688, NULL, 'USD', true, true, ARRAY['Buy Now','Cash Drawer (+$139)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679552661', 'fine-dining-bundle', 'Buy Now / Cash Drawer (+$139) / I don’t need Online Ordering', NULL, 1638, NULL, 'USD', true, true, ARRAY['Buy Now','Cash Drawer (+$139)','I don’t need Online Ordering']::text[], NULL),
  ('45300811759765', 'fine-dining-bundle', 'Buy Now / Kitchen Thermal Printer (+$299) / I need Online Ordering (+$50/mo)', NULL, 1848, NULL, 'USD', true, true, ARRAY['Buy Now','Kitchen Thermal Printer (+$299)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679585429', 'fine-dining-bundle', 'Buy Now / Kitchen Thermal Printer (+$299) / I don’t need Online Ordering', NULL, 1798, NULL, 'USD', true, true, ARRAY['Buy Now','Kitchen Thermal Printer (+$299)','I don’t need Online Ordering']::text[], NULL),
  ('45300847968405', 'fine-dining-bundle', 'Buy Now / Add Both (+$438) / I need Online Ordering (+$50/mo)', NULL, 1987, NULL, 'USD', true, true, ARRAY['Buy Now','Add Both (+$438)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679618197', 'fine-dining-bundle', 'Buy Now / Add Both (+$438) / I don’t need Online Ordering', NULL, 1937, NULL, 'USD', true, true, ARRAY['Buy Now','Add Both (+$438)','I don’t need Online Ordering']::text[], NULL),
  ('45300831027349', 'fine-dining-bundle', 'Pay As You Go / No thanks / I need Online Ordering (+$50/mo)', NULL, 598, NULL, 'USD', true, true, ARRAY['Pay As You Go','No thanks','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679650965', 'fine-dining-bundle', 'Pay As You Go / No thanks / I don’t need Online Ordering', NULL, 548, NULL, 'USD', true, true, ARRAY['Pay As You Go','No thanks','I don’t need Online Ordering']::text[], NULL),
  ('45300811858069', 'fine-dining-bundle', 'Pay As You Go / Cash Drawer (+$139) / I need Online Ordering (+$50/mo)', NULL, 737, NULL, 'USD', true, true, ARRAY['Pay As You Go','Cash Drawer (+$139)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679683733', 'fine-dining-bundle', 'Pay As You Go / Cash Drawer (+$139) / I don’t need Online Ordering', NULL, 687, NULL, 'USD', true, true, ARRAY['Pay As You Go','Cash Drawer (+$139)','I don’t need Online Ordering']::text[], NULL),
  ('45300811825301', 'fine-dining-bundle', 'Pay As You Go / Kitchen Thermal Printer (+$299) / I need Online Ordering (+$50/mo)', NULL, 897, NULL, 'USD', true, true, ARRAY['Pay As You Go','Kitchen Thermal Printer (+$299)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679716501', 'fine-dining-bundle', 'Pay As You Go / Kitchen Thermal Printer (+$299) / I don’t need Online Ordering', NULL, 847, NULL, 'USD', true, true, ARRAY['Pay As You Go','Kitchen Thermal Printer (+$299)','I don’t need Online Ordering']::text[], NULL),
  ('45300848001173', 'fine-dining-bundle', 'Pay As You Go / Add Both (+$438) / I need Online Ordering (+$50/mo)', NULL, 1036, NULL, 'USD', true, true, ARRAY['Pay As You Go','Add Both (+$438)','I need Online Ordering (+$50/mo)']::text[], NULL),
  ('45737679749269', 'fine-dining-bundle', 'Pay As You Go / Add Both (+$438) / I don’t need Online Ordering', NULL, 986, NULL, 'USD', true, true, ARRAY['Pay As You Go','Add Both (+$438)','I don’t need Online Ordering']::text[], NULL),
  ('42285395542165', 'menu-setup-2', 'Default Title', NULL, 250, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('42285395509397', 'remote-network-setup', 'Default Title', NULL, 500, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('42105463832725', 'online-ordering-license', 'Default Title', NULL, 50, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('41168982114453', 'call-for-demo-quote', 'Default Title', 'eOSTE', 0, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('41014554820757', 'eatos-bundle-monthly-software', 'Default Title', NULL, 59, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('40407426007189', 'star-2-yr-std-swap-a-star-warranty-ext-impact', 'Default Title', '37967050', 52.5, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407422763157', 'ubiquiti-access-point-pro', 'Default Title', NULL, 159, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407427711125', 'star-micronics-tsp654-usb', 'Default Title', 'eOSTS654U', 269, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407427645589', 'star-micronics-tsp654-lan', 'Default Title', 'eOSTS654L', 289, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407424467093', 'apg-cash-drawer-heavy-duty', 'Default Title', 'eOSCD1HD', 139, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407425515669', 'epson-tm-m30ii-nt-thermal-usb-lan', 'Default Title', 'C31CJ95022', 299, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407425450133', 'epson-tm-t20iii-thermal-usb', 'Default Title', 'C31CH51001', 169, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407425417365', 'epson-tm-u220b-dot-matrix-lan', 'Default Title', 'eOSEP220BN', 289, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919834165397', 'printer-ribbon-epson', 'Default Title', NULL, 19.99, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40943072280725', 'register-rolls-impact-printer-1', 'Default Title', NULL, 59, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919780458645', 'register-rolls-for-thermal-printer', 'Default Title', NULL, 99, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919813259413', 'printer-ribbon-star', 'Default Title', NULL, 19.99, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919793107093', 'register-rolls-impact-printer', 'Default Title', NULL, 59, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919729537173', 'networking-1', 'Default Title', NULL, 700, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919626678421', 'hardware-installation-1', 'Default Title', NULL, 0, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919453171861', 'ubiquity-lte-failover-data-plan-sold-separately', 'Default Title', NULL, 229, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919385276565', 'ubiquity-8-port-poe-60w-switch', 'Default Title', NULL, 129, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919262953621', 'etos-star-micronics-sp742-lan', 'Default Title', '39336532', 349, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40919167697045', 'eatos-star-micronics-tsp654ii-sticky-printer-lan', 'Default Title', '37967760', 339, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407420010645', 'kds-license', 'Default Title', 'eOS123', 25, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('40407419912341', 'kiosk-license', 'Default Title', 'eOS125', 99, NULL, 'USD', true, false, ARRAY['Default Title']::text[], NULL),
  ('40407419715733', 'edge-server-monthly', 'Default Title', 'eOS129', 50, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('44007217889429', 'eatos-custom-gift-cards', 'Default Title', NULL, 0.79, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('35805434183829', 'firewall', 'Default Title', 'eOFIR', 800, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL),
  ('35805434118293', 'hardware-install', 'Default Title', 'eOHRDINST', 500, NULL, 'USD', true, true, ARRAY['Default Title']::text[], NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_products (collection_slug, product_slug, position) VALUES
  ('other-accessories', 'hd-persona-fingerprint-reader', 0),
  ('other-accessories', 'wall-mount-for-15-kitchen-display-system', 1),
  ('other-accessories', 'star-thermal-143-iv', 2),
  ('other-accessories', 'magnetic-stripe-reader-gift-cards', 3),
  ('other-accessories', 'epson-tm-m30ii-nt-thermal-usb-lan', 4),
  ('other-accessories', 'epson-tm-u220b-dot-matrix-lan', 5),
  ('other-accessories', 'etos-star-micronics-sp742-lan', 6),
  ('other-accessories', 'printer-ribbon-epson', 7),
  ('other-accessories', 'printer-ribbon-star', 8),
  ('other-accessories', 'epson-tm-t20iii-thermal-usb', 9),
  ('other-accessories', 'eatos-star-micronics-tsp654ii-sticky-printer-lan', 10),
  ('other-accessories', 'star-micronics-tsp654-lan', 11),
  ('other-accessories', 'star-micronics-tsp654-usb', 12),
  ('other-accessories', 'ubiquity-lte-failover-data-plan-sold-separately', 13),
  ('other-accessories', 'ubiquiti-access-point-pro', 14),
  ('other-accessories', 'ubiquity-8-port-poe-60w-switch', 15),
  ('other-accessories', 'apg-cash-drawer-heavy-duty', 16),
  ('applications', 'eatos-bundle-monthly-software', 0),
  ('applications', 'online-ordering-license', 1),
  ('applications', 'kds-license', 2),
  ('applications', 'kiosk-license', 3),
  ('applications', 'monthly-subscription-gift-card', 4),
  ('applications', 'point-of-purchase-license', 5),
  ('applications', 'loyalty-program-license', 6),
  ('applications', 'workforceos-license', 7),
  ('applications', 'inventoryos-license', 8),
  ('bundles', 'quick-service-bundle', 0),
  ('bundles', 'fine-dining-bundle', 1),
  ('bundles', 'food-truck-bundle', 2),
  ('bundles', 'custom-bundle', 3),
  ('guest-facing-display', 'guest-facing-display-t2', 0),
  ('kitchen-display-systems', 'guest-facing-display-t2', 0),
  ('point-of-purchase', 'poynt-newland-n910', 0),
  ('point-of-purchase', 'smart-terminal-7-4', 1),
  ('point-of-purchase', 'adyen-s1f2', 2),
  ('point-of-sale', 'sunmi-t2-15-10-point-of-sale', 0),
  ('point-of-sale', 'sunmi-t2s-lite', 1),
  ('self-service-kiosk', 'sunmi-k2-mini-kiosk-with-card-reader', 0)
ON CONFLICT DO NOTHING;
