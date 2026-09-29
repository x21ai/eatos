export type ContactTone = 'rose' | 'peach' | 'sage' | 'gold' | 'violet' | 'blue' | 'mint' | 'stone';

export type ChatContact = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone?: string;
  location: string;
  flag: string;
  company?: string;
  segments: string[];
  lastActivity: string;
  tone: ContactTone;
  address?: string;
  website?: string;
  createdAt?: string;
  gender?: string;
  notifications?: boolean;
  jobTitle?: string;
  jobRole?: string;
  websiteDomain?: string;
  city?: string;
  country?: string;
  employees?: string;
  localTime?: string;
  mapX?: number;
  mapY?: number;
};

export const initialContacts: ChatContact[] = [
  { id: 'account-manager-elston', name: 'Account Manager', initials: 'AM', email: 'elston.dsouza@eigital.com', location: 'Austin, United States', flag: '🇺🇸', segments: ['chat'], lastActivity: '17h', tone: 'rose' },
  { id: 'stuart-admin', name: 'Stuart Admin', initials: 'SA', email: 'stuart@longashespark.com', location: 'Hackney, United Kingdom', flag: '🇬🇧', segments: [], lastActivity: '23h', tone: 'peach' },
  { id: 'warren-dempsey', name: 'Warren Dempsey', initials: 'WD', email: 'lyn@lakelandleisuregroup.com', location: 'Hackney, United Kingdom', flag: '🇬🇧', company: 'Lakeland Leisure', segments: ['shopify'], lastActivity: 'Yesterday', tone: 'sage' },
  { id: 'account-manager-roydon', name: 'Account Manager', initials: 'AM', email: 'roydon@lcros.co.uk', location: 'Lancaster, United Kingdom', flag: '🇬🇧', segments: [], lastActivity: '27 Sep', tone: 'rose' },
  { id: 'samuel-cortez', name: 'Samuel Cortez', initials: 'SC', email: 'figaro@eatos.co', location: 'Norwalk, United States', flag: '🇺🇸', company: 'Figaro Kitchen', segments: [], lastActivity: '27 Sep', tone: 'gold' },
  { id: 'account-manager-joyce', name: 'Account Manager', initials: 'AM', email: 'joyce.lacap@eigital.com', location: 'Manila, Philippines', flag: '🇵🇭', segments: [], lastActivity: '25 Sep', tone: 'sage' },
  { id: 'ross-bobbin', name: 'Ross BobbinCafe', initials: 'RB', email: 'ross@lintontweeds.com', location: 'Middlesbrough, United Kingdom', flag: '🇬🇧', company: 'Bobbin Cafe', segments: [], lastActivity: '23 Sep', tone: 'violet' },
  { id: 'wazirabad-admin', name: 'Wazirabad Admin', initials: 'WW', email: 'wazirabad.wazirabad7@gmail.com', location: 'Logroño, Spain', flag: '🇪🇸', segments: [], lastActivity: '21 Sep', tone: 'blue' },
  { id: 'engrsmu', name: 'Engrsmu', initials: 'En', email: 'engrsmu@gmail.com', location: 'Mumbai, India', flag: '🇮🇳', segments: [], lastActivity: '17 Sep', tone: 'blue' },
  { id: 'arbabhussain414', name: 'Arbabhussain414', initials: 'Ar', email: 'arbabhussain414@gmail.com', location: 'Balkasar, Pakistan', flag: '🇵🇰', segments: [], lastActivity: '10 Sep', tone: 'peach' },
  { id: 'anne', name: 'Anne', initials: 'An', email: 'anne@celestiahygiene.com', location: 'Karachi, Pakistan', flag: '🇵🇰', company: 'Celestia Hygiene', segments: [], lastActivity: '1 Sep', tone: 'rose' },
  { id: 'super-admin', name: 'Super Admin', initials: 'SA', email: 'renierpaolo.sumagui@gmail.com', location: 'Dasmariñas, Philippines', flag: '🇵🇭', segments: [], lastActivity: '26 Aug', tone: 'violet' },
  { id: 'account-manager-warren', name: 'Account Manager', initials: 'AM', email: 'warren.dempsey@lcros.co.uk', location: 'Batson, United States', flag: '🇺🇸', segments: [], lastActivity: '26 Aug', tone: 'mint' },
  { id: 'francis-obera', name: 'Francis Mari Obera', initials: 'FM', email: 'atkinsonscoffee@lcros.co.uk', location: 'Ahmedabad, India', flag: '🇮🇳', company: 'Atkinsons Coffee', segments: [], lastActivity: '26 Aug', tone: 'mint' },
  { id: 'warren-dempsey-2', name: 'Warren Dempsey', initials: 'WD', email: 'francis.obera7@eigital.com', location: 'Makati City, Philippines', flag: '🇵🇭', segments: [], lastActivity: '26 Aug', tone: 'peach' },
  { id: 'linda-pham', name: 'Linda Pham', initials: 'LP', email: 'lindalepham@gmail.com', phone: '18326337187', location: 'Houston, United States', flag: '🇺🇸', segments: ['loyalty'], lastActivity: '26 Aug', tone: 'stone' },
];

export function findContact(contactId: string) {
  return initialContacts.find((contact) => contact.id === contactId);
}

export function contactProfile(contact: ChatContact) {
  const locationParts = contact.location.split(',').map((part) => part.trim());
  return {
    address: contact.address ?? '',
    website: contact.website ?? '',
    createdAt: contact.createdAt ?? 'Jul 2024',
    gender: contact.gender ?? '',
    notifications: contact.notifications ?? true,
    jobTitle: contact.jobTitle ?? '',
    jobRole: contact.jobRole ?? '',
    websiteDomain: contact.websiteDomain ?? '',
    city: contact.city ?? locationParts[0] ?? '',
    country: contact.country ?? locationParts.at(-1) ?? 'United States',
    employees: contact.employees ?? '',
    localTime: contact.localTime ?? '5:08pm UTC-4',
    mapX: contact.mapX ?? 72,
    mapY: contact.mapY ?? 48,
  };
}
