'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';

const demos = [
  { id: 'pos', label: 'Point of Sale', url: 'https://mobileposapp.lovable.app/' },
  { id: 'kds', label: 'KDS', url: 'https://kds6.lovable.app/kds/v3' },
  { id: 'kiosk', label: 'Kiosk', url: 'https://kiosk6.lovable.app/' },
  { id: 'cfd', label: 'CFD', url: 'https://cfd6.lovable.app/' },
  { id: 'dashboard', label: 'Dashboard', url: 'https://dashboard6c.lovable.app/' },
  { id: 'inventoryos', label: 'InventoryOS', url: 'https://inventoryos6.lovable.app/' },
];

export function LiveDemoSection() {
  const [activeTab, setActiveTab] = useState('pos');
  const activeDemo = demos.find((d) => d.id === activeTab);

  return (
    <section className="py-12 md:py-16 bg-black relative overflow-hidden w-full lg:w-[818px] mx-auto px-5 md:px-6 lg:px-0">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            How it Works
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Experience the full eatOS platform in your browser. Switch between products to see every feature in action and explore the complete workflow.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="-mx-5 mb-6 overflow-x-auto px-5 scrollbar-hidden sm:mx-0 sm:flex sm:justify-center sm:px-0">
            <TabsList className="bg-zinc-900/80 border border-white/10 p-1.5 md:p-2 rounded-xl flex w-max flex-nowrap max-w-full sm:w-auto">
              {demos.map((demo) => (
                <TabsTrigger
                  key={demo.id}
                  value={demo.id}
                  className="px-3.5 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium rounded-lg whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white transition-colors"
                >
                  {demo.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {demos.map((demo) => (
            <TabsContent
              key={demo.id}
              value={demo.id}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="relative w-full rounded-xl md:rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
                <div className="flex items-center justify-between gap-3 px-3 py-2.5 md:px-4 md:py-3 border-b border-white/10 bg-zinc-900/50">
                  <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="min-w-0 truncate text-xs md:text-sm text-gray-400 font-medium">
                    {demo.label}
                  </div>
                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex shrink-0 items-center gap-1.5 text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open
                  </a>
                </div>
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[460px]">
                  <iframe
                    key={demo.id}
                    src={demo.url}
                    title={demo.label}
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    allow="fullscreen"
                    loading="lazy"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
