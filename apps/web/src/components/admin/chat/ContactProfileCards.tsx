'use client';

import type { ComponentType, ReactNode } from 'react';
import {
  Bell, BriefcaseBusiness, Building2, CalendarDays, ChevronDown, CircleHelp, Clock3,
  Flag, Globe2, GraduationCap, House, Mail, MapPin, Phone, Smile, Tag, UserRound, Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { contactProfile, type ChatContact } from './contact-data';

type Icon = ComponentType<{ className?: string }>;

export function ProfileCard({ title, children, action, className }: { title: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return <section className={cn('overflow-hidden rounded-lg border bg-background', className)}>
    <header className="flex min-h-13 items-center gap-3 border-b px-4 py-3"><CircleHelp className="size-4 shrink-0 text-muted-foreground" /><h2 className="min-w-0 flex-1 text-sm font-bold">{title}</h2>{action}</header>
    {children}
  </section>;
}

export function ProfileRow({ icon: Icon, label, value, children }: { icon: Icon; label: string; value?: string; children?: ReactNode }) {
  return <div className="grid min-h-11 grid-cols-[minmax(7.5rem,0.9fr)_minmax(0,1.15fr)] items-center gap-3 text-sm">
    <div className="flex min-w-0 items-center gap-3 text-muted-foreground"><Icon className="size-4 shrink-0" /><span className="truncate">{label}</span></div>
    <div className={cn('min-w-0 truncate font-medium', !value && !children && 'text-muted-foreground')}>{children ?? value ?? `Enter ${label}...`}</div>
  </div>;
}

export function ContactInformationCard({ contact }: { contact: ChatContact }) {
  const profile = contactProfile(contact);
  return <ProfileCard title={`Contact Information for ${contact.name.split(' ')[0] || 'Contact'}`}>
    <div className="px-4 py-2">
      <ProfileRow icon={UserRound} label="Name" value={contact.name} />
      <ProfileRow icon={Mail} label="Email" value={contact.email} />
      <ProfileRow icon={Phone} label="Phone"><span className="inline-flex max-w-full items-center gap-2 rounded-lg border bg-muted/35 px-3 py-2"><span>{contact.flag}</span><span className="truncate">{contact.phone || 'Enter Phone...'}</span></span></ProfileRow>
      <ProfileRow icon={House} label="Address" value={profile.address} />
      <ProfileRow icon={Globe2} label="Website" value={profile.website} />
      <ProfileRow icon={CalendarDays} label="Creation date" value={profile.createdAt} />
      <ProfileRow icon={Clock3} label="Last update" value={contact.lastActivity} />
      <ProfileRow icon={Smile} label="Gender"><span className="flex items-center justify-between rounded-lg border bg-muted/25 px-3 py-2 text-muted-foreground">{profile.gender || 'Select a gender'}<ChevronDown className="size-4" /></span></ProfileRow>
      <ProfileRow icon={Bell} label="Notifications"><span className="flex items-center justify-between rounded-lg border bg-muted/25 px-3 py-2">{profile.notifications ? 'Enabled' : 'Disabled'}<ChevronDown className="size-4 text-muted-foreground" /></span></ProfileRow>
    </div>
  </ProfileCard>;
}

export function SegmentsCard({ contact }: { contact: ChatContact }) {
  return <ProfileCard title={`Segments for ${contact.name.split(' ')[0] || 'Contact'}`}>
    <div className="space-y-3 p-4">
      <div className="flex min-h-7 flex-wrap gap-2">{contact.segments.length ? contact.segments.map((segment) => <span key={segment} className="rounded-md border border-chart-5/40 bg-chart-5/10 px-2 py-1 text-xs font-semibold text-chart-5">{segment}</span>) : <span className="text-sm text-muted-foreground">No segments</span>}</div>
      <Button variant="outline" className="h-10 w-full justify-start rounded-lg text-muted-foreground"><Tag />Segment contact...</Button>
    </div>
  </ProfileCard>;
}

export function CompanyCard({ contact }: { contact: ChatContact }) {
  const profile = contactProfile(contact);
  return <ProfileCard title={`Company ${contact.name.split(' ')[0] || 'Contact'} Works For`}>
    <div className="px-4 py-2">
      <ProfileRow icon={Building2} label="Company" value={contact.company} />
      <ProfileRow icon={GraduationCap} label="Job Title" value={profile.jobTitle} />
      <ProfileRow icon={BriefcaseBusiness} label="Job Role" value={profile.jobRole} />
      <ProfileRow icon={Globe2} label="Website Domain" value={profile.websiteDomain} />
      <ProfileRow icon={House} label="City" value={profile.city} />
      <ProfileRow icon={Flag} label="Country"><span className="flex items-center justify-between rounded-lg border bg-muted/25 px-3 py-2 text-muted-foreground">{profile.country || 'Enter Country...'}<ChevronDown className="size-4" /></span></ProfileRow>
      <ProfileRow icon={Users} label="Employees" value={profile.employees} />
    </div>
  </ProfileCard>;
}

export function LocationSummary({ contact }: { contact: ChatContact }) {
  const profile = contactProfile(contact);
  return <div className="space-y-3 p-4 text-sm">
    <div className="flex justify-between gap-4"><span className="text-muted-foreground">City, Country</span><strong className="text-right">{profile.city}, {profile.country}</strong></div>
    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Local Time</span><strong>{profile.localTime}</strong></div>
    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Spoken Languages</span><strong>🇺🇸</strong></div>
  </div>;
}