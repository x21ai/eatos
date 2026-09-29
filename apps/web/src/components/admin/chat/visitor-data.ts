export type LiveVisitor = {
  id: string;
  name: string;
  page: string;
  country: string;
  flag: string;
  activity: 'online' | 'away';
  tone: 'violet' | 'mint' | 'blue' | 'gold' | 'coral';
  mapX: number;
  mapY: number;
  browser: string;
  city: string;
};

export const liveVisitors: LiveVisitor[] = [
  { id: 'visitor563384', name: 'visitor563384', page: 'Hugo', country: 'India', flag: '🇮🇳', activity: 'online', tone: 'violet', mapX: 69, mapY: 49, browser: 'Chrome on Windows', city: 'Mumbai' },
  { id: 'visitor563383', name: 'visitor563383', page: 'The Restaurant Management System | eatOS', country: 'Canada', flag: '🇨🇦', activity: 'online', tone: 'mint', mapX: 21, mapY: 31, browser: 'Safari on macOS', city: 'Toronto' },
  { id: 'visitor563382', name: 'visitor563382', page: 'The Restaurant Management System | eatOS', country: 'Canada', flag: '🇨🇦', activity: 'away', tone: 'violet', mapX: 47, mapY: 35, browser: 'Chrome on Android', city: 'Vancouver' },
  { id: 'visitor563381', name: 'visitor563381', page: 'Partner Program | eatOS', country: 'China', flag: '🇨🇳', activity: 'away', tone: 'blue', mapX: 83, mapY: 43, browser: 'Edge on Windows', city: 'Shanghai' },
  { id: 'visitor563359', name: 'visitor563359', page: 'eatOS Support Helpdesk', country: 'United States', flag: '🇺🇸', activity: 'away', tone: 'gold', mapX: 15, mapY: 40, browser: 'Chrome on iPhone', city: 'New York' },
  { id: 'visitor563347', name: 'visitor563347', page: 'Dashboard', country: 'United Kingdom', flag: '🇬🇧', activity: 'away', tone: 'coral', mapX: 43, mapY: 32, browser: 'Firefox on Linux', city: 'London' },
];

export function findLiveVisitor(id?: string) {
  return liveVisitors.find((visitor) => visitor.id === id) ?? liveVisitors[0];
}
