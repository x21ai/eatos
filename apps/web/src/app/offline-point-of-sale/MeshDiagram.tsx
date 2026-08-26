// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import {
  Monitor,
  ChefHat,
  Smartphone,
  CreditCard,
  TabletSmartphone,
  Cloud,
} from 'lucide-react';

/**
 * Animated peer-to-peer mesh network diagram.
 * A central eatOS cloud node connected to venue devices,
 * with devices also linked to each other.
 */
export default function MeshDiagram() {
  // Node positions in a 1000x360 viewBox
  const center = { x: 500, y: 150 };
  const nodes = [
    { Icon: Monitor, x: 120, y: 70, label: 'Point of Sale', tint: 'text-sky-400 border-sky-400/40 bg-sky-500/10' },
    { Icon: ChefHat, x: 170, y: 250, label: 'Kitchen Display', tint: 'text-amber-400 border-amber-400/40 bg-amber-500/10' },
    { Icon: TabletSmartphone, x: 380, y: 300, label: 'Kiosk', tint: 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10' },
    { Icon: Smartphone, x: 640, y: 300, label: 'Handheld', tint: 'text-violet-400 border-violet-400/40 bg-violet-500/10' },
    { Icon: CreditCard, x: 840, y: 240, label: 'Payments', tint: 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10' },
    { Icon: Monitor, x: 880, y: 70, label: 'Customer Display', tint: 'text-rose-400 border-rose-400/40 bg-rose-500/10' },
  ];

  const links = [];
  nodes.forEach((n, i) => {
    links.push({ x1: center.x, y1: center.y, x2: n.x, y2: n.y, key: `c-${i}` });
    if (i > 0) {
      const prev = nodes[i - 1];
      links.push({ x1: prev.x, y1: prev.y, x2: n.x, y2: n.y, key: `p-${i}`, faint: true });
    }
  });
  // close the loop
  links.push({ x1: nodes[0].x, y1: nodes[0].y, x2: nodes[nodes.length - 1].x, y2: nodes[nodes.length - 1].y, key: 'loop', faint: true });

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 md:p-8">
      <svg
        viewBox="0 0 1000 360"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram of eatOS devices connected in a peer-to-peer mesh network"
      >
        {/* Links */}
        {links.map((l) => (
          <line
            key={l.key}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.faint ? 'rgba(255,255,255,0.08)' : 'rgba(96,165,250,0.35)'}
            strokeWidth={l.faint ? 1 : 1.5}
            strokeDasharray={l.faint ? '4 6' : undefined}
          />
        ))}

        {/* Pulses traveling from center to devices */}
        {nodes.map((n, i) => (
          <circle key={`pulse-${i}`} r="4" fill="#60a5fa">
            <animateMotion
              dur={`${2.4 + i * 0.3}s`}
              repeatCount="indefinite"
              path={`M ${center.x} ${center.y} L ${n.x} ${n.y}`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={`${2.4 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Center cloud node */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '41.6%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl border border-sky-400/50 bg-sky-500/15 backdrop-blur"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-3xl bg-sky-400/20" />
          <Cloud size={36} className="relative text-sky-300" />
        </motion.div>
        <p className="mt-2 text-center text-[11px] font-semibold tracking-widest text-sky-300">
          <span className="lowercase">eat</span>OS CLOUD
        </p>
      </div>

      {/* Device nodes */}
      {nodes.map((n, i) => (
        <div
          key={n.label}
          className="absolute"
          style={{
            left: `${(n.x / 1000) * 100}%`,
            top: `${(n.y / 360) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            className={`flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-2xl border backdrop-blur ${n.tint}`}
          >
            <n.Icon size={22} />
          </motion.div>
          <p className="mt-1.5 hidden md:block whitespace-nowrap text-center text-[10px] font-medium uppercase tracking-wider text-white/50">
            {n.label}
          </p>
        </div>
      ))}
    </div>
  );
}
