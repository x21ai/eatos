export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type Section = { id: string; title: string; blocks: Block[] };

export const effectiveDate = "December 29, 2025";

export const sections: Section[] = [
  {
    id: "information-we-collect",
    title: "1. What information we collect about you",
    blocks: [
      {
        type: "p",
        text: "We need to collect information about you to provide you with the Services or the support you request. The type of information we collect can vary depending on the country from which you access our Services. Additionally, you can choose to voluntarily provide information to us.",
      },
      {
        type: "p",
        text: "We collect information you provide when you apply or sign up for an eatOS account or other Services, go through our identity or account verification process, authenticate into your account, communicate with us, answer our surveys, upload content, or otherwise use the Services.",
      },
      { type: "h3", text: "Identification information" },
      {
        type: "p",
        text: "Your name; email address; mailing address; phone number; photograph; birthdate; passport, driver’s license, Aadhar, Taxpayer Identification, or other government-issued identification; or other historical, contact, and demographic information when you apply or sign up for an eatOS account or other Services, signature, and authentication credentials (for example, information you use to log in to your account), including IP address.",
      },
      {
        type: "p",
        text: "When you make a request to receive information about eatOS or our products we collect Identification Information that you provide to us because we have to respond to your request. We also use your Identification Information to send you surveys and get your feedback about our Services, so we can understand if the Services are helpful to you and evaluate the effectiveness of any updates we provide. This is legally justified as legitimate interest.",
      },
      {
        type: "p",
        text: "We use your Identification Information to personalise your use of our Services. For example, when you sign up for an eatOS account, we can associate certain information with your new account, such as information about other eatOS accounts you have had or currently have, and prior transactions you have made using our Services. We do this to improve your customer experience. This is legally justified as legitimate interest and/or contractual performance.",
      },
      { type: "h3", text: "Financial information" },
      {
        type: "p",
        text: "Information such as bank account, payment card numbers, credit reports, and other publicly available information.",
      },
      {
        type: "p",
        text: "We use your Identification Information and your Financial Information to go through our identity or account verification process and to enable you to authenticate into your account once it is created. We may share your Identification Information with identity verification vendors to verify information that we collect. This is a legal obligation — for example, “Know Your Customer” and AML compliance requirements are governed by, among other laws, the Bank Secrecy Act (1970) (USA) and the USA Patriot Act (2001) (USA).",
      },
      { type: "h3", text: "Tax information" },
      { type: "p", text: "Withholding allowances and tax filing status." },
      {
        type: "p",
        text: "When you use our Services to make, accept, request, or record payments, we collect information about when and where the transactions occur, the names of the transacting parties, a description of the transactions, the payment or transfer amounts, billing and shipping information, and the devices and payment methods used to complete the transactions.",
      },
      {
        type: "p",
        text: "We use your Identification Information to send information and support that you request, including to deliver technical notices, security alerts, and support and administrative messages to you. We also use it to resolve disputes, collect payments or fees, and provide assistance for problems with our Services or your eatOS account. eatOS does this to communicate with you to fulfill our obligations under the Terms of Service. This is legally justified as contractual performance.",
      },
      { type: "h3", text: "Other information you provide" },
      {
        type: "p",
        text: "Information that you voluntarily provide to us, including your survey responses; participation in contests, promotions, or other prospective seller marketing forms or devices; suggestions for improvements; referrals; or any other actions performed on the Services. When you provide feedback to us or answer our surveys, we collect information from this to improve our services and to develop new products and services. This is legally justified as legitimate interest.",
      },
      { type: "h3", text: "Information we collect from your use of our Services" },
      {
        type: "p",
        text: "We collect information about you and the devices you use to access the Services, such as your computer, mobile phone, or tablet. The information that we collect includes:",
      },
      {
        type: "ul",
        items: [
          "Precise geolocation information — the location of your device. We use your geolocation data to determine whether we can provide you with Services and to customise our Services to your location. This enables us to determine whether we can provide Services to you, and in what language, to comply with applicable payment processor and other regulatory requirements, and to combat fraud. This is legally justified as contract performance (for Services in territories where we are authorised to conduct our business) and as legal obligation (to comply with territorial restrictions).",
          "Device information — information about your device, including your hardware model, operating system and version, device name, unique device identifier, mobile network information, and information about the device’s interaction with our Services.",
          "Use information — information about how you use our Services, including your access time, log-in and log-out information, browser type and language, country and language setting on your device, IP address, the domain name of your internet service provider, other attributes about your browser, mobile device and operating system, any specific page you visit on our platform, content you view, features you use, the date and time of your visit to or use of the Services, your search terms, the website you visited before you used the Services, data about how you interact with our Services, and other clickstream data.",
          "Business information — information about products and services you sell (including inventory, pricing and other data) and other information you provide about you or your business (including appointment, staffing availability, employee, payroll and contact data), as well as information about your payment transactions.",
          "Employee information — information provided to a seller using our Services, for example information about employees whose employers use eatOS (including hours worked and other timecard data).",
          "Customer information — information you collect from your customers, including email address, phone number, payment information, or other information.",
        ],
      },
      {
        type: "p",
        text: "We collect your Business Information from the devices when you interact with our systems and from the information that is associated with the transaction as captured on our databases. eatOS collects this as it enables us to provide services you have requested, including inventory, eCommerce and payments processing (contract performance). This also enables us to protect the integrity of our Services and systems, and your, our, our customers’, or your customers’ rights or property (legitimate interest), and to do internal research, measure, track, and analyze trends and usage (legitimate interest).",
      },
      {
        type: "p",
        text: "We use your commercial information when you interact with our systems and when it is associated with a transaction. We combine this information with Identification Information as well as with risk signals. This enables us to debug and fix service errors (contract performance); investigate, detect, prevent, report or recover from fraud (legal obligation), misrepresentations, security breaches or incidents, and other potentially prohibited, malicious, or illegal activities; and otherwise help protect your account, including to dispute chargebacks on your behalf (legitimate interest).",
      },
      { type: "h3", text: "Information we collect from other sources" },
      {
        type: "ul",
        items: [
          "Identity verification — information from third-party verification services, credit bureaus, financial institutions, mailing list providers, and publicly available sources. In some circumstances, where lawful, this information may include your government-issued identification number.",
          "Background information — to the extent permitted by applicable laws, we may obtain background check reports from public records of criminal convictions and arrest records. We may use your information, including your full name, government-issued identification number, and date of birth, to obtain such reports. This also includes information about any person or corporation with whom you have had, currently have, or may have a financial relationship.",
          "Credit, compliance and fraud — information about you from third parties in connection with any credit investigation, credit eligibility, identity or account verification process, fraud detection process, or collection procedure, or as may otherwise be required by applicable law. This includes the receipt and exchange of account or credit-related information with any credit reporting agency or credit bureau, where lawful, and any person or corporation with whom you have had, currently have, or may have a financial relationship, including past, present, and future places of employment, financial institutions, and personal reporting agencies.",
        ],
      },
      { type: "h3", text: "Children’s information" },
      {
        type: "p",
        text: "Our Services are general audience services not directed at children under the age of 13. If we obtain actual knowledge that any information we collect has been provided by a child under the age of 13, we will promptly delete that information.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How we use your information",
    blocks: [
      {
        type: "p",
        text: "We may use information about you for a number of purposes, including:",
      },
      { type: "h3", text: "Providing, improving, and developing our Services" },
      {
        type: "ul",
        items: [
          "Determining whether the Services are available in your country;",
          "Processing or recording payment transactions or money transfers;",
          "Otherwise providing you with the eatOS products and features you choose to use;",
          "Displaying your historical transaction or appointment information;",
          "Providing, maintaining and improving our Services;",
          "Developing new products and services;",
          "Delivering the information and support you request, including technical notices, security alerts, and support and administrative messages, including to resolve disputes, collect fees, and provide assistance for problems with our Services or your eatOS account;",
          "Improving, personalizing, and facilitating your use of our Services;",
          "Measuring, tracking, and analyzing trends and usage in connection with your use or the performance of our Services;",
          "Working with identity verification providers to help us with fraud prevention and to assist us in meeting our AML, “know your customer”, background checking and other compliance requirements.",
        ],
      },
      { type: "h3", text: "Communicating with you about our Services" },
      {
        type: "ul",
        items: [
          "Sending you information we think you may find useful or which you have requested from us about our products and services;",
          "Conducting surveys and collecting feedback about our Services.",
        ],
      },
      { type: "h3", text: "Protecting our Services and maintaining a trusted environment" },
      {
        type: "ul",
        items: [
          "Investigating, detecting, preventing, or reporting fraud, misrepresentations, security breaches or incidents, and other potentially prohibited or illegal activities, or otherwise helping protect your account, including to dispute chargebacks on your behalf;",
          "Protecting our, our customers’, or your customers’ rights or property, or the security or integrity of our Services;",
          "Enforcing our Terms of Service or other applicable agreements or policies;",
          "Verifying your identity (e.g., through government-issued identification numbers);",
          "Complying with any applicable laws or regulations, or responding to lawful requests for information from the government or through legal process;",
          "Fulfilling any other purpose disclosed to you in connection with our Services;",
          "Contacting you to resolve disputes, collect fees, and provide assistance with our Services.",
        ],
      },
      { type: "h3", text: "Advertising and marketing" },
      {
        type: "ul",
        items: [
          "Marketing of our Services;",
          "Communicating with you about opportunities, products, services, contests, promotions, discounts, incentives, surveys, and rewards offered by us and select partners.",
        ],
      },
      {
        type: "p",
        text: "If we send you marketing emails, each email will contain instructions permitting you to opt out of receiving future marketing or other communications.",
      },
    ],
  },
  {
    id: "how-we-share",
    title: "3. How we share your information",
    blocks: [
      { type: "p", text: "We may share information about you as follows:" },
      { type: "h3", text: "With other users of our Services with whom you interact" },
      {
        type: "p",
        text: "With other users of our Services with whom you interact through your own use of our Services. For example, we may share information when you make or accept a payment, appointment, or money transfer using our Services.",
      },
      { type: "h3", text: "With third parties" },
      {
        type: "ul",
        items: [
          "With third parties to provide, maintain, and improve our Services, including service providers who access information about you to perform services on our behalf (e.g., fraud prevention, identity verification, and fee collection services), as well as financial institutions, payment networks, payment card associations, credit bureaus, partners providing services on eatOS’s behalf, and other entities in connection with the Services;",
          "With third parties that run advertising campaigns, contests, special offers, or other events or activities on our behalf or in connection with our Services.",
        ],
      },
      { type: "h3", text: "Business transfers and corporate changes" },
      {
        type: "ul",
        items: [
          "To a subsequent owner, co-owner, or operator of one or more of the Services; or",
          "In connection with (including during the negotiation or due diligence process of) a corporate merger, consolidation, or restructuring; the sale of substantially all of our stock and/or assets; financing, acquisition, divestiture, or dissolution of all or a portion of our business; or other corporate change.",
        ],
      },
      { type: "h3", text: "Safety and compliance with law" },
      {
        type: "p",
        text: "If we believe that disclosure is reasonably necessary: (i) to comply with any applicable law, regulation, legal process or governmental request (e.g., from tax authorities or law enforcement agencies); (ii) to enforce or comply with our General Terms or other applicable agreements or policies; (iii) to protect our or our customers’ rights or property, or the security or integrity of our Services; or (iv) to protect us, users of our Services or the public from harm, fraud, or potentially prohibited or illegal activities.",
      },
      { type: "h3", text: "With your consent" },
      {
        type: "ul",
        items: [
          "At your direction or as described at the time you agree to share;",
          "When you authorize a third party application or website to access your information.",
        ],
      },
      { type: "h3", text: "Aggregated and anonymized information" },
      {
        type: "p",
        text: "We also may share (within our group of companies or with third parties) aggregated and anonymized information that does not specifically identify you or any individual user of our Services.",
      },
    ],
  },
  {
    id: "retention",
    title: "4. How long we retain your information",
    blocks: [
      {
        type: "p",
        text: "We retain your information for the duration necessary to fulfill the purposes outlined in this privacy notice, encompassing the provision of our services, adherence to legal obligations, prevention of violations of our terms, mitigation of fraudulent activities, and safeguarding of our legal rights, property, and user base.",
      },
      {
        type: "p",
        text: "The duration of retention for your information is assessed on a case-by-case basis, contingent upon the nature and purpose of the collected and processed information. Information retention aligns with the necessity of maintaining our Services and supporting optional features utilized by you, as well as facilitating customer support. For instance, eatOS account data is essential for service delivery and is therefore retained for the duration of your eatOS account’s existence to ensure ongoing account maintenance. Similarly, usage data is retained for the lifetime of your account to facilitate service provision.",
      },
      { type: "h3", text: "Legal requirements" },
      {
        type: "p",
        text: "In certain cases, we are obligated to retain your information for legal reasons, even after account deactivation. We maintain your information where necessary:",
      },
      {
        type: "ul",
        items: [
          "To respond to legal requests or comply with applicable laws. This includes situations where we have a legal obligation to preserve your information, such as in response to valid legal requests like preservation orders or search warrants related to your account, even after account deletion;",
          "To address and resolve requests, disputes, or complaints;",
          "For litigation or regulatory matters, including preserving information relevant to legal claims, regulatory investigations, or legal proceedings concerning your information, or responding to regulatory complaints made by you or others;",
          "To ensure the safety, security, and integrity of our Services, as well as the protection of rights, property, and users. For example, we retain information necessary to investigate instances of service misuse, such as fraud.",
        ],
      },
      {
        type: "p",
        text: "We generally retain your information as long as reasonably necessary to provide you the Services or to comply with applicable law. However, even after you deactivate your account, we can retain copies of information about you and any transactions or Services in which you may have participated for a period of time that is consistent with applicable law, applicable statutes of limitations, or as we believe is reasonably necessary to comply with applicable law, regulation, legal process, or governmental request, to detect or prevent fraud, to collect fees owed, to resolve disputes, to address problems with our Services, to assist with investigations, to enforce our General Terms or other applicable agreements or policies, or to take any other actions consistent with applicable law.",
      },
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies and other similar technologies",
    blocks: [
      { type: "p", text: "We may use cookies to:" },
      {
        type: "ul",
        items: [
          "Remember that you have visited us or used the Services before. This allows us to identify the number of unique visitors we receive, so that we can provide enough capacity to accommodate all of our users;",
          "Customize elements of the promotional layout and/or content of our Services;",
          "Collect data about the way you interact with our Services (e.g., when you use certain features);",
          "Collect data to assess and improve our advertising campaigns, including sending information to our business partners;",
          "Allow our business partners (including third parties) to use these tracking technologies to track your behavior on our behalf on our platform (including when you use multiple devices) and on partner websites;",
          "Enable third parties to collect data about the way you interact across sites outside of our Services;",
          "Collect anonymous statistical information about how you use the Services (including the length of your web or application session) and the location from which you access the Services, so that we can improve the Services and learn which elements and functions of the Services are most popular with our users.",
        ],
      },
      {
        type: "p",
        text: "Some of the cookies used in the Services are set by us, and others are set by third parties who deliver services on our behalf. Most web and mobile device browsers are set to automatically accept cookies by default. However, you can change your browser settings to prevent automatic acceptance of cookies, or to notify you each time a cookie is set. You can also learn more about cookies by visiting allaboutcookies.org, which includes additional useful information on cookies and how to block cookies on different types of browsers and mobile devices.",
      },
      {
        type: "p",
        text: "Please note that by blocking or deleting cookies used in the Services, you may not be able to take full advantage of the Services. We also may collect information using web beacons — electronic images that may be used in our Services or emails. We use web beacons to deliver cookies, track the number of visits to our website and apps, understand usage and campaign effectiveness, and determine whether an email has been opened and acted upon.",
      },
    ],
  },
  {
    id: "advertising-analytics",
    title: "6. Third-party advertising and analytics",
    blocks: [
      {
        type: "p",
        text: "We can use third-party service providers to provide site metrics and other analytics services. These third parties can use cookies, web beacons, and other technologies to collect information, such as your IP address, identifiers associated with your device, other applications on your device, the browsers you use to access our Services, web pages viewed, time spent on web pages, links clicked, and conversion information (e.g., transactions entered into).",
      },
      {
        type: "p",
        text: "This information can be used by eatOS and third-party service providers on behalf of eatOS to analyze and track usage of our Services, determine the popularity of certain content, and better understand how you use our Services. The third-party service providers that we engage are bound by confidentiality obligations and other restrictions with respect to their use and collection of your information.",
      },
      {
        type: "p",
        text: "This privacy notice does not apply to, and we are not responsible for, third-party cookies, web beacons, or other tracking technologies, which are covered by such third parties’ privacy policies. We encourage you to check the privacy policies of these third parties to learn about their privacy practices. For more information about targeted advertising specifically, please visit aboutads.info/choices.",
      },
      {
        type: "p",
        text: "Examples of our third-party service providers include Google Analytics, which we use to understand how our Services perform and how you use them (see google.com/policies/privacy and tools.google.com/dlpage/gaoptout to opt out), and Instabug, Pipedrive, Realtime, Teamviewer, Mixpanel and UXCam, which we use to monitor errors that impact customers and report diagnostic data to us so we can improve our Services. These third-party service providers make use of cookies to implement their services.",
      },
    ],
  },
  {
    id: "your-choices",
    title: "7. Your choices",
    blocks: [
      { type: "h3", text: "Personal information" },
      {
        type: "p",
        text: "You may access, change, or correct information that you have provided by logging into your eatOS account at any time or by making a request to us using the contact details below, in which case we may need to verify your identity before granting access or otherwise changing or correcting your information. If you wish to deactivate your account, you can do so by emailing us using the contact details provided below.",
      },
      { type: "h3", text: "Location information" },
      {
        type: "p",
        text: "In order to provide certain Services, we may require access to location information, including precise geolocation information collected from your device. If you do not consent to collection of this information, certain Services will not function properly and you will not be able to use those Services. You can stop our collection of location information at any time by changing the preferences on your mobile device. If you do so, some of our mobile applications will no longer function. You also may stop our collection of location information by following the standard uninstall process to remove all eatOS mobile applications from your device.",
      },
      { type: "h3", text: "Promotional communications" },
      {
        type: "p",
        text: "You can opt out of receiving promotional messages from eatOS by following the instructions in those messages, by informing the caller that you would not like to receive future promotional calls, or by changing your notification settings by logging into your eatOS account.",
      },
    ],
  },
  {
    id: "security",
    title: "8. Security",
    blocks: [
      {
        type: "p",
        text: "We take reasonable measures, including administrative, technical, and physical safeguards, to protect your information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. Nevertheless, the internet is not a 100% secure environment, and we cannot guarantee absolute security of the transmission or storage of your information. We hold information about you both at our own premises and with the assistance of third-party service providers.",
      },
    ],
  },
  {
    id: "storage",
    title: "9. Storage and processing",
    blocks: [
      {
        type: "p",
        text: "We may, and we may use third-party service providers to, process and store your information in the United States and other countries.",
      },
    ],
  },
  {
    id: "changes",
    title: "10. Changes to this privacy notice",
    blocks: [
      {
        type: "p",
        text: "We may amend this privacy notice from time to time by posting a revised version and updating the effective date above. The revised version will be effective on the effective date listed. We will provide you with reasonable prior notice of material changes in how we use your information, including by email, if you have provided an email address. If you disagree with these changes, you may cancel your account at any time. Your continued use of our Services constitutes your consent to any amendment of this privacy notice.",
      },
    ],
  },
  {
    id: "country-disclosure",
    title: "11. Specific country disclosure",
    blocks: [
      { type: "h3", text: "California" },
      {
        type: "p",
        text: "Privacy laws that apply in certain places, like California, treat “businesses” and “service providers” differently. Under those laws, a business is the company that decides why and how to process personal information, while a service provider processes personal information on behalf of a business in order to provide services. When eatOS processes your customers’ data, we generally act as your service provider. In select cases, however, we may act as a business — for example, when we use your customers’ data to send your customers digital receipts directly from eatOS, or when we allow you to use Customer Directory or eatOS Marketing to contact your buyer using a masked email address that gets routed to them via eatOS.",
      },
      {
        type: "p",
        text: "Even though you use our services while acting as an employee, owner, director, officer, or contractor of a company, partnership, sole proprietorship, nonprofit, or government agency, if you live in California, California law gives you the right to ask if we disclose your personal information to third parties for their direct marketing purposes (we do not). It also gives you the right to ask if we sell your personal information to third parties (we do not sell your personal information and have not done so in the past), and if we did, you would have the right to opt out of such sales.",
      },
      { type: "h3", text: "The California Consumer Privacy Act and internet-based advertising" },
      {
        type: "p",
        text: "As described in this privacy notice, eatOS and third parties that provide advertising or other functionality on our behalf may use cookies, pixel tags, and other technology to help us advertise our products and services to you as informed by your interests. This approach is called interest-based advertising, which means we tailor our ads to you based on information that gives us a sense of what interests you, such as information collected from your activity on the web, including browsing or purchasing products on or through our websites or on third party websites, your activity on mobile sites and applications, or your responses to our marketing emails.",
      },
      {
        type: "p",
        text: "eatOS does not sell your data, has not in the past, and is committed not to do so in the future. While we do not believe eatOS’s interest-based advertising activities constitute a “sale” under the CCPA, we provide you with ways to control the cookies, similar technologies, and internet-based information you may share with us. You may opt out of cookies, other than those that are necessary to provide you with our Services, and you may visit eatOS’s Cookie Preferences Center to manage your cookie preferences at any time.",
      },
      {
        type: "p",
        text: "You can always restrict the placement of cookies on your computer or remove them from your browser by going to your browser settings — cookie settings can be managed in Chrome (including Chrome for Android and iOS), Firefox, Internet Explorer, Microsoft Edge, and Safari (including Safari for iOS). You can also opt out of receiving interest-based ads from third party advertisers who are members of the Network Advertising Initiative (NAI) or who follow the Digital Advertising Alliance’s (DAA) Self-Regulatory Principles for Online Behavioral Advertising by visiting the opt-out pages on the NAI and DAA websites.",
      },
      {
        type: "p",
        text: "Please note that cookie-based opt outs are applicable only to the browser and device you use when you opt out. If you wish to opt out across all devices, you must replicate your choices across each device, including your mobile device. In addition, if you clear or delete your cookies on that browser or device, you will need to reset your cookie opt out.",
      },
    ],
  },
  {
    id: "mobile-information",
    title: "12. Mobile information",
    blocks: [
      {
        type: "p",
        text: "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
      },
    ],
  },
  {
    id: "contact",
    title: "13. Contact",
    blocks: [
      {
        type: "p",
        text: "Please contact our Privacy Department with any questions or concerns regarding this privacy notice.",
      },
      {
        type: "p",
        text: "eatOS POS Inc., 10th Floor, 1111 Brickell Avenue, Miami, FL 33131, United States — email: privacy@eatOS.com",
      },
    ],
  },
];