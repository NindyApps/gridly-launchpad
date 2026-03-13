"use client";

import { useState, useEffect, useCallback, forwardRef, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import {
  Activity,
  Target,
  RefreshCw,
  Search,
  LayoutDashboard,
  Bell,
  Settings,
  Zap,
} from "lucide-react";

const COLORS = {
  bg: "#0A0A0A",
  bgCard: "#111111",
  accent: "#00C96A",
  accentLight: "#00E57A",
  text: "#F0F0F0",
  textMuted: "#606060",
  border: "#2A2A2A",
};

const INTENT_COLORS: Record<string, { bg: string; text: string }> = {
  HIGH: { bg: "rgba(248, 113, 113, 0.12)", text: "#F87171" },
  MEDIUM: { bg: "rgba(251, 191, 36, 0.12)", text: "#FBBF24" },
  LOW: { bg: "rgba(96, 96, 96, 0.15)", text: "#606060" },
};

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  Reddit: { bg: "rgba(255,69,0,0.15)", text: "#FF6B35" },
  HN: { bg: "rgba(255,132,0,0.15)", text: "#FF8400" },
};

interface Signal {
  id: number;
  platform: "Reddit" | "HN";
  source: string;
  snippet: string;
  intent: "HIGH" | "MEDIUM" | "LOW";
  time: string;
  synced: boolean;
}

const SIGNAL_POOL: Omit<Signal, "id" | "synced">[] = [
  { platform: "Reddit", source: "r/SaaS", snippet: "Looking for a tool that monitors Reddit for buying intent signals and pushes leads to HubSpot…", intent: "HIGH", time: "2m ago" },
  { platform: "HN", source: "Show HN", snippet: "We built an AI that scrapes forums for purchase intent — anyone tried something similar?", intent: "MEDIUM", time: "5m ago" },
  { platform: "Reddit", source: "r/startups", snippet: "Need a social listening tool that auto-syncs leads into our CRM pipeline. Budget approved.", intent: "HIGH", time: "8m ago" },
  { platform: "HN", source: "Ask HN", snippet: "What tools do you use to find potential customers on social platforms?", intent: "MEDIUM", time: "12m ago" },
  { platform: "Reddit", source: "r/sales", snippet: "Our outbound is cold — looking for warm lead gen from community conversations", intent: "HIGH", time: "15m ago" },
  { platform: "Reddit", source: "r/marketing", snippet: "Anyone using AI to track brand mentions and convert them to qualified leads?", intent: "MEDIUM", time: "18m ago" },
  { platform: "HN", source: "Show HN", snippet: "Frustrated with manual prospecting. Want something that trawls HN comments for intent.", intent: "LOW", time: "22m ago" },
  { platform: "Reddit", source: "r/Entrepreneur", snippet: "Just got budget for a lead gen tool — need to capture intent signals from Reddit threads", intent: "HIGH", time: "25m ago" },
];

function CountUpStat({ target, label, icon: Icon, delay }: { target: number; label: string; icon: typeof Activity; delay: number }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    const timer = setTimeout(() => {
      animate(motionVal, target, { duration: 1.8, ease: "easeOut" });
    }, delay);
    return () => { unsub(); clearTimeout(timer); };
  }, [target, delay, motionVal, rounded]);

  return (
    <div
      className="flex-1 rounded-lg p-3 border"
      style={{ background: COLORS.bgCard, borderColor: COLORS.border }}
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5" style={{ color: COLORS.accent }} />
        <span className="text-[10px] font-medium" style={{ color: COLORS.textMuted }}>{label}</span>
      </div>
      <div className="text-xl font-bold" style={{ color: COLORS.text }}>{display}</div>
    </div>
  );
}

function Sparkline() {
  const points = [10, 25, 18, 35, 28, 42, 38, 55, 48, 62, 58, 72, 65, 78];
  const width = 140;
  const height = 40;
  const maxVal = Math.max(...points);
  const minVal = Math.min(...points);

  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - minVal) / (maxVal - minVal)) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  const areaPath = `${pathData} L${width},${height} L0,${height} Z`;

  return (
    <div
      className="rounded-lg p-3 border"
      style={{ background: COLORS.bgCard, borderColor: COLORS.border }}
      data-testid="sparkline-chart"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium" style={{ color: COLORS.textMuted }}>Signal Velocity</span>
        <span className="text-[10px] font-semibold" style={{ color: COLORS.accent }}>+24%</span>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#sparkFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        <motion.path
          d={pathData}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

const SignalCard = forwardRef<HTMLDivElement, { signal: Signal; isNew: boolean; onSync: (id: number) => void }>(({ signal, isNew, onSync }, ref) => {
  const platformStyle = PLATFORM_COLORS[signal.platform];
  const intentStyle = INTENT_COLORS[signal.intent];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-lg p-3 border relative"
      style={{
        background: COLORS.bgCard,
        borderColor: isNew ? COLORS.accent : COLORS.border,
        boxShadow: isNew ? `0 0 15px -3px rgba(107,143,113,0.3)` : "none",
      }}
      data-testid={`signal-card-${signal.id}`}
    >
      {isNew && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ border: `1px solid ${COLORS.accent}` }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: platformStyle.bg, color: platformStyle.text }}
            >
              {signal.platform}
            </span>
            <span className="text-[10px]" style={{ color: COLORS.textMuted }}>{signal.source}</span>
            <span className="text-[9px] ml-auto flex-shrink-0" style={{ color: COLORS.textMuted }}>{signal.time}</span>
          </div>
          <p className="text-[11px] leading-relaxed mb-2 line-clamp-2" style={{ color: COLORS.text }}>
            {signal.snippet}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: intentStyle.bg, color: intentStyle.text }}
            >
              {signal.intent}
            </span>
            {signal.synced ? (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                style={{ background: "rgba(107,143,113,0.2)", color: COLORS.accent }}
                data-testid={`synced-badge-${signal.id}`}
              >
                ✓ Synced
              </motion.span>
            ) : (
              <button
                onClick={() => onSync(signal.id)}
                className="text-[9px] font-medium px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                style={{ background: "rgba(107,143,113,0.15)", color: COLORS.accent }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(107,143,113,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(107,143,113,0.15)"; }}
                data-testid={`inject-crm-${signal.id}`}
              >
                Inject to CRM
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

SignalCard.displayName = "SignalCard";

export default function AnimatedDashboard() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [poolIndex, setPoolIndex] = useState(0);
  const syncTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    return () => {
      syncTimers.current.forEach(clearTimeout);
    };
  }, []);

  const addSignal = useCallback(() => {
    setPoolIndex((prev) => {
      const idx = prev % SIGNAL_POOL.length;
      const template = SIGNAL_POOL[idx];
      const newSignal: Signal = {
        ...template,
        id: Date.now() + Math.random(),
        synced: false,
      };
      setSignals((s) => [newSignal, ...s].slice(0, 5));
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    const initialTimers = [0, 300, 600].map((delay, i) =>
      setTimeout(() => {
        const template = SIGNAL_POOL[i];
        setSignals((s) => [
          { ...template, id: Date.now() + i, synced: false },
          ...s,
        ]);
        setPoolIndex(i + 1);
      }, delay)
    );
    return () => initialTimers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(addSignal, 4000);
    return () => clearInterval(interval);
  }, [addSignal]);

  const handleSync = (id: number) => {
    setSignals((s) => s.map((sig) => (sig.id === id ? { ...sig, synced: true } : sig)));
    const timer = setTimeout(() => {
      setSignals((s) => s.map((sig) => (sig.id === id ? { ...sig, synced: false } : sig)));
      syncTimers.current.delete(timer);
    }, 1500);
    syncTimers.current.add(timer);
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Search, label: "Signals", active: false },
    { icon: Bell, label: "Alerts", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ background: COLORS.bg }}
      data-testid="animated-dashboard"
    >
      <div
        className="w-12 flex-shrink-0 border-r flex flex-col items-center py-3 gap-3"
        style={{ borderColor: COLORS.border, background: COLORS.bg }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: COLORS.accent }}>
          <Zap className="w-4 h-4" style={{ color: COLORS.bg }} />
        </div>
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            style={{
              background: item.active ? `rgba(107,143,113,0.15)` : "transparent",
              color: item.active ? COLORS.accent : COLORS.textMuted,
            }}
            data-testid={`sidebar-${item.label.toLowerCase()}`}
          >
            <item.icon className="w-4 h-4" />
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-hidden p-4 flex flex-col gap-3">
        <div className="flex gap-3">
          <CountUpStat target={142} label="Signals Today" icon={Activity} delay={200} />
          <CountUpStat target={38} label="High Intent" icon={Target} delay={500} />
          <CountUpStat target={24} label="CRM Synced" icon={RefreshCw} delay={800} />
        </div>

        <Sparkline />

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold" style={{ color: COLORS.text }}>Live Signal Feed</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(107,143,113,0.15)", color: COLORS.accent }}>
            ● Live
          </span>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {signals.map((signal, i) => (
              <SignalCard
                key={signal.id}
                signal={signal}
                isNew={i === 0}
                onSync={handleSync}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
