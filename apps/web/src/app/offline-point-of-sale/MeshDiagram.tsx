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
    { Icon: Monitor, x: 120, y: 80, label: 'Point of Sale', labelPos: 'above', tint: 'text-sky-400 border-sky-400/40 bg-sky-500/10' },
    { Icon: ChefHat, x: 170, y: 250, label: 'Kitchen Display', labelPos: 'below', tint: 'text-amber-400 border-amber-400/40 bg-amber-500/10' },
    { Icon: TabletSmartphone, x: 380, y: 290, label: 'Kiosk', labelPos: 'below', tint: 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10' },
    { Icon: Smartphone, x: 640, y: 290, label: 'Handheld', labelPos: 'below', tint: 'text-violet-400 border-violet-400/40 bg-violet-500/10' },
    { Icon: CreditCard, x: 840, y: 240, label: 'Payments', labelPos: 'below', tint: 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10' },
    { Icon: Monitor, x: 880, y: 80, label: 'Guest Facing Display', labelPos: 'above', tint: 'text-rose-400 border-rose-400/40 bg-rose-500/10' },
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
    <>
    {/* Mobile: radial star, cloud in the center */}
    <div className="md:hidden relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3">
      <div className="relative mx-auto aspect-square w-full max-w-[340px]">
        {/* spokes */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {nodes.map((n, i) => {
            const a = (-90 + i * 60) * (Math.PI / 180);
            const x = 50 + 34 * Math.cos(a);
            const y = 50 + 34 * Math.sin(a);
            return (
              <g key={`ms-${i}`}>
                <line x1="50" y1="50" x2={x} y2={y} stroke="rgba(96,165,250,0.35)" strokeWidth="0.6" />
                <circle r="1.4" fill="#60a5fa">
                  <animateMotion
                    dur={`${2.4 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M 50 50 L ${x} ${y}`}
                  />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
          <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
        </svg>

        {/* center cloud */}
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/50 bg-sky-500/15 backdrop-blur"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-2xl bg-sky-400/20" />
            <Cloud size={26} className="relative text-sky-300" />
          </motion.div>
          <p className="absolute left-1/2 top-full w-max -translate-x-1/2 pt-1.5 text-center text-[9px] font-semibold tracking-widest text-sky-300">
            <span className="lowercase">eat</span>OS CLOUD
          </p>
        </div>


        {/* device nodes around the ring */}
        {nodes.map((n, i) => {
          const a = (-90 + i * 60) * (Math.PI / 180);
          const x = 50 + 34 * Math.cos(a);
          const y = 50 + 34 * Math.sin(a);
          const above = y < 50;
          return (
            <div
              key={`m-${n.label}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                className={`relative grid h-10 w-10 place-items-center rounded-xl border backdrop-blur ${n.tint}`}
              >
                <n.Icon size={18} />
                <span
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[8px] font-medium uppercase tracking-wider text-white/60 ${
                    above ? 'bottom-full mb-1' : 'top-full mt-1'
                  }`}
                >
                  {n.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>


    {/* Desktop / tablet: mesh diagram */}
    <div className="hidden md:block relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 md:p-8">
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
            className={`relative flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-2xl border backdrop-blur ${n.tint}`}
          >
            <n.Icon size={22} />
            <p
              className={`absolute left-1/2 -translate-x-1/2 hidden md:block whitespace-nowrap text-center text-[10px] font-medium uppercase tracking-wider text-white/50 ${
                n.labelPos === 'above' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
              }`}
            >
              {n.label}
            </p>
          </motion.div>
        </div>
      ))}

    </div>
    </>
  );
}
