import Image from 'next/image';
import { contactProfile, type ChatContact } from './contact-data';
import worldMap from './assets/visitor-world-map.jpg';

export default function ContactMap({ contact, className = '' }: { contact: ChatContact; className?: string }) {
  const profile = contactProfile(contact);
  return <div className={`relative overflow-hidden bg-chart-1 ${className}`}>
    <Image src={worldMap} alt={`Map showing ${contact.name} near ${contact.location}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-75" />
    <span className="absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-primary-foreground/45 bg-primary-foreground shadow-lg" style={{ left: `${profile.mapX}%`, top: `${profile.mapY}%` }} />
  </div>;
}