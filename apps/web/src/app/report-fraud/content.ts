import accountDetailsAsset from './assets/Account-Details.png.asset.json';
import phishingAsset from './assets/Recognize-And-Report-Phishing-Scames.png.asset.json';
import definitionAsset from './assets/What-is-Phishing.jpg.asset.json';
import sensitiveAsset from './assets/Protect-Sensitive-Information.png.asset.json';
import suspiciousAsset from './assets/Suspicious_Email.jpg.asset.json';
import heroAsset from './assets/eO-book-a-demo-ver-1.1p-17-jan-22-ph-scaled_cp.jpg.asset.json';

export const hero = {
  eyebrow: 'Trust & Safety',
  title: 'Report fraud or suspicious activity',
  description:
    'If you notice anything that looks like fraud, phishing or account misuse, tell us. Every report is reviewed by the eatOS fraud prevention team.',
  primaryCta: { label: 'Report an incident', href: '#report' },
  secondaryCta: { label: 'Email fraud@eatos.com', href: 'mailto:fraud@eatos.com' },
  image: heroAsset.url,
  imageLabel: 'Two restaurant operators reviewing eatOS on a laptop',
};

export const safetyRules = [
  {
    title: 'Never share your credentials',
    body: 'Your eatOS username and password belong to you alone. If you believe they have leaked, reset your password immediately.',
  },
  {
    title: 'We never ask by email or text',
    body: 'eatOS will never request your password, social security number, bank account or card details over email, phone or text message.',
  },
  {
    title: 'Type the address yourself',
    body: 'Instead of clicking a link in a message, retype the web address in your browser and confirm it is a secure eatOS domain.',
  },
];

export const spotlights = [
  {
    id: 'account-details',
    eyebrow: 'Account details',
    title: 'Someone claiming to be eatOS?',
    body: 'If you suspect someone is fraudulently claiming to be eatOS, let us know. Email fraud@eatos.com to report the incident, reporting fake or bogus emails helps us in the fight against criminal activity.',
    note: 'Never share your eatOS account username and password. We will never ask for these details, and they are only meant for you to use. If you believe they have leaked, reset your password right away.',
    image: accountDetailsAsset.url,
    imageLabel: 'Account profile open on a mobile phone',
    pad: false,
  },
  {
    id: 'phishing-scams',
    eyebrow: 'Phishing scams',
    title: 'Recognize and report phishing',
    body: 'If you receive a suspicious email that mentions eatOS, forward it to fraud@eatos.com. Please do not add any other information to the email you forward, the appropriate team will investigate and take action if needed.',
    image: phishingAsset.url,
    imageLabel: 'Person holding a payment card in front of a laptop',
  },
  {
    id: 'what-is-phishing',
    eyebrow: 'Definition',
    title: 'What is phishing?',
    body: 'Phishing is an attempt by a fraudulent actor to collect personal or financial information over email, phone or text message. Fraudsters typically acquire this information by requesting it over the phone, or by sending unsolicited emails or messages that direct recipients to enter personal information into fake websites posing as real ones.',
    note: 'Learn more about protecting yourself from scams on the eatOS blog.',
    image: definitionAsset.url,
    imageLabel: 'Security breach warning on a laptop screen',
  },
  {
    id: 'sensitive-information',
    eyebrow: 'Sensitive information',
    title: 'Protect sensitive information',
    body: 'Keep in mind that eatOS will never ask you to send sensitive information such as your username, password, social security number, bank account or credit card details over email, phone or text message.',
    note: 'If you receive a suspicious message, do not reply, click links or open attachments. If you believe you have fallen victim to a phishing scam, change your email and eatOS account passwords immediately and report the incident to fraud@eatos.com.',
    image: sensitiveAsset.url,
    imageLabel: 'Illustration of a security shield above a tablet',
  },
  {
    id: 'suspicious-emails',
    eyebrow: 'Suspicious emails',
    title: 'Spot a spoofed website',
    body: 'Phishing emails often lead you to fake or spoofed websites in an attempt to steal your private, sensitive data. These can look unusual and not fit what you expect from a company, or they can appear very genuine, but end up having a suspicious URL in the web address bar.',
    note: 'If you believe you are on a spoofed website, do not enter any information. Copy the web address and paste it into an email message, then send it to fraud@eatos.com. Our security experts will examine the site and let you know if it is not safe.',
    image: suspiciousAsset.url,
    imageLabel: 'Blocked email warning over a laptop keyboard',
  },
];

export const report = {
  eyebrow: 'Detect digital fraud?',
  title: 'Report it here',
  description:
    'Online fraud is a growing threat, and your input can make a difference. If you have experienced or witnessed digital fraud, share the details with us. Your report helps us spot trends, stop future scams and protect others.',
  steps: [
    'We acknowledge your report and open a case with our fraud prevention team.',
    'A specialist reviews the details and may contact you for additional evidence.',
    'We take action on the accounts involved and confirm the outcome with you.',
  ],
  privacyNote: 'All provided information remains secure and is handled confidentially.',
};

export const helpChannels = [
  {
    title: 'Fraud hotline',
    body: 'Available 24/7 for urgent fraud reports and unauthorized transactions.',
    linkLabel: '+1 844 362 2867',
    href: 'tel:+18443622867',
  },
  {
    title: 'Email the security team',
    body: 'For non-urgent reports, forwarded phishing emails and spoofed website links.',
    linkLabel: 'fraud@eatos.com',
    href: 'mailto:fraud@eatos.com',
  },
];

export const closing = {
  title: 'Security is a shared responsibility',
  description:
    'Existing customer? Our support team is here to help 24/7 by phone, live chat, email and text.',
  primaryCta: { label: 'Visit Help Center', href: '/contact' },
  secondaryCta: { label: 'Contact support', href: '/contact' },
};