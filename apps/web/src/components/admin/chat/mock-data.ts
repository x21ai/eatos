export type Message = {
  id: string;
  author: 'visitor' | 'agent' | 'note';
  body: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  email: string;
  location: string;
  country: string;
  flag: string;
  localTime: string;
  browser: string;
  ip: string;
  page: string;
  preview: string;
  date: string;
  inbox: 'main' | 'assigned' | 'automated' | 'spam';
  unread: boolean;
  resolved: boolean;
  assignee: string;
  messages: Message[];
};

export const initialConversations: Conversation[] = [
  {
    id: 'wazirabad', name: 'Wazirabad Wazirabad786', initials: 'WW', email: 'wazirabad.wazirabad786@gmail.com', location: 'Logroño, Spain', country: 'Spain', flag: '🇪🇸', localTime: '6:29 PM (UTC+2)', browser: 'Chrome 153 on Windows', ip: '88.7.137.40', page: 'https://eatos.com/', preview: 'You are most welcome!', date: '21 Sep', inbox: 'main', unread: true, resolved: false, assignee: 'eatOS Support Team',
    messages: [
      { id: 'm1', author: 'visitor', body: 'Hi, I need help choosing the right system for my restaurant.', time: '6:18 PM' },
      { id: 'm2', author: 'agent', body: 'Welcome to eatOS. Restaurants Made Simple. How may I assist you today?', time: '6:19 PM' },
      { id: 'm3', author: 'visitor', body: 'We have two locations and need Point of Sale, KDS, and online ordering.', time: '6:22 PM' },
      { id: 'm4', author: 'note', body: '@eatOS Support Team, visitor provided the location and product details.', time: '6:24 PM' },
      { id: 'm5', author: 'agent', body: 'Thank you for the details. I will have a specialist contact you shortly.', time: '6:26 PM' },
    ],
  },
  { id: 'stuart', name: 'Stuart Miller', initials: 'SM', email: 'stuart@example.com', location: 'Austin, United States', country: 'United States', flag: '🇺🇸', localTime: '11:29 AM (CDT)', browser: 'Safari on iPhone', ip: '104.28.81.12', page: 'https://eatos.com/products/point-of-sale', preview: 'Issue and contact details shared.', date: '14 Sep', inbox: 'assigned', unread: true, resolved: false, assignee: 'Jaspreet Singh', messages: [{ id: 's1', author: 'visitor', body: 'Can someone explain the payment pricing for two locations?', time: '11:14 AM' }, { id: 's2', author: 'agent', body: 'Absolutely. I can connect you with our payments team.', time: '11:17 AM' }] },
  { id: 'account', name: 'Account Manager', initials: 'AM', email: 'ops@harborgrill.com', location: 'Miami, United States', country: 'United States', flag: '🇺🇸', localTime: '12:29 PM (EDT)', browser: 'Chrome on macOS', ip: '172.64.12.8', page: 'https://eatos.com/support', preview: 'Test reply received.', date: '26 Sep', inbox: 'main', unread: false, resolved: true, assignee: 'eatOS Support Team', messages: [{ id: 'a1', author: 'visitor', body: 'The new terminal arrived. Everything is working now.', time: '12:10 PM' }, { id: 'a2', author: 'agent', body: 'Great news. Please let us know if you need anything else.', time: '12:12 PM' }] },
  { id: 'visitor', name: 'visitor560752', initials: 'V', email: 'visitor560752@example.com', location: 'Paris, France', country: 'France', flag: '🇫🇷', localTime: '7:29 PM (CEST)', browser: 'Firefox on Linux', ip: '51.15.23.10', page: 'https://eatos.com/book-demo', preview: 'Welcome to eatOS.', date: '23 Sep', inbox: 'automated', unread: false, resolved: true, assignee: 'Maya AI', messages: [{ id: 'v1', author: 'agent', body: 'Welcome to eatOS. What can I help you find?', time: '7:02 PM' }, { id: 'v2', author: 'visitor', body: 'I am looking for self-service kiosk information.', time: '7:03 PM' }] },
  { id: 'spam', name: 'Unknown visitor', initials: 'UV', email: 'unknown@example.net', location: 'Unknown', country: 'Unknown', flag: '🌐', localTime: 'Unknown', browser: 'Unknown browser', ip: '0.0.0.0', page: 'https://eatos.com/', preview: 'Promotional message detected.', date: '10 Sep', inbox: 'spam', unread: false, resolved: false, assignee: 'Unassigned', messages: [{ id: 'p1', author: 'visitor', body: 'Promotional message detected by inbox rules.', time: '8:44 AM' }] },
];