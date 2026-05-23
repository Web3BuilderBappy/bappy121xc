import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const Icon = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Analytics: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Projects: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M2 7a2 2 0 012-2h4l2 3h10a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2z"/>
    </svg>
  ),
  Tasks: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/>
    </svg>
  ),
  Reports: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Help: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3-8.59A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006.29 6.29l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  Power: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
      <path d="M18.36 6.64a9 9 0 11-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
    </svg>
  ),
  Camera: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Plane: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    </svg>
  ),
  Wifi: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/>
      <path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
  Flash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Monitor: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
      <rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/>
      <line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/>
      <line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/>
      <line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/>
      <line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  FileText: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  DollarSign: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
  BarChart2: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  ),
  ArrowDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  ),
  MoreH: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Visibility: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};

// ─── Glassmorphism Styles ─────────────────────────────────────────────────────
const styles = {
  glassCard: {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
  },
  glassCardDark: {
    background: "rgba(0,0,0,0.15)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  glassInput: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "50px",
    color: "#fff",
    outline: "none",
    padding: "12px 20px",
    width: "100%",
    fontSize: "14px",
  },
  glassBtn: {
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.35)",
    borderRadius: "50px",
    color: "#fff",
    cursor: "pointer",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
  },
  navBtn: {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "50px",
    color: "rgba(255,255,255,0.85)",
    cursor: "pointer",
    padding: "11px 20px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  navBtnActive: {
    background: "rgba(255,255,255,0.28)",
    border: "1px solid rgba(255,255,255,0.45)",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const weekData = [
  { day: "Mon", users: 40, revenue: 8000, sessions: 120 },
  { day: "Tue", users: 55, revenue: 12000, sessions: 160 },
  { day: "Wed", users: 48, revenue: 9500, sessions: 140 },
  { day: "Thu", users: 70, revenue: 15000, sessions: 200 },
  { day: "Fri", users: 85, revenue: 18000, sessions: 240 },
  { day: "Sat", users: 95, revenue: 20000, sessions: 260 },
];

const trafficData = [
  { name: "Direct", value: 35, color: "#60a5fa" },
  { name: "Organic", value: 28, color: "#34d399" },
  { name: "Referral", value: 22, color: "#f87171" },
  { name: "Social", value: 15, color: "#fbbf24" },
];

const topPagesData = [
  { page: "Jon", views: 80 }, { page: "Feb", views: 45 }, { page: "Mar", views: 65 },
  { page: "Apr", views: 90 }, { page: "May", views: 55 }, { page: "Jun", views: 70 },
  { page: "Fri", views: 40 }, { page: "Sat", views: 60 }, { page: "Sun", views: 75 },
];

const usersData = [
  { id: 1, name: "Admin Sudin", role: "Developer", status: "+5.7%", lastActive: "24 hours ago", up: true },
  { id: 2, name: "Boricy Ritthani", role: "Designer", status: "-3.0%", lastActive: "23 hours ago", up: false },
  { id: 3, name: "Alioen Nisonam", role: "Developer", status: "+1.7%", lastActive: "02 hours ago", up: true },
  { id: 4, name: "Xfen Midter", role: "Developer", status: "-3.0%", lastActive: "27 hours ago", up: false },
  { id: 5, name: "Bon Wrunii", role: "Developer", status: "-5.0%", lastActive: "26 hours ago", up: false },
  { id: 6, name: "Admin Sudin", role: "Developer", status: "+3.8%", lastActive: "08 hours ago", up: true },
  { id: 7, name: "Ronch Muget", role: "Developer", status: "+1.2%", lastActive: "16 hours ago", up: true },
  { id: 8, name: "Adnun Deverin", role: "Developer", status: "+1.3%", lastActive: "13 minutes ago", up: true },
];

const tasksData = [
  { id: 1, name: "Design new landing page", assignee: "Aoni Admin", status: "In Progress", priority: "high", due: "23/02/2024", done: false },
  { id: 2, name: "Fix authentication bug", assignee: "Skleparts", status: "High", priority: "high", due: "25/05/2024", done: false },
  { id: 3, name: "Update user dashboard", assignee: "Vlyetaton", status: "Medium", priority: "medium", due: "29/02/2024", done: false },
  { id: 4, name: "Write API documentation", assignee: "Aoni Admin", status: "Low", priority: "low", due: "30/09/2024", done: false },
  { id: 5, name: "Code review sprint 3", assignee: "Skleparts", status: "In Progress", priority: "medium", due: "25/02/2024", done: false },
  { id: 6, name: "Setup CI/CD pipeline", assignee: "Berl hiten", status: "Low", priority: "low", due: "25/02/2024", done: true },
];

const projectsData = [
  { id: 1, name: "Project Alpha", status: "In Progress", statusColor: "#fbbf24", progress: 75, team: ["A", "B", "C"], date: "Oct 25" },
  { id: 2, name: "Project Beta", status: "Completed", statusColor: "#34d399", progress: 100, team: ["D", "E", "F"], date: "Oct 25" },
  { id: 3, name: "Project Gamma", status: "On Hold", statusColor: "#f87171", progress: 30, team: ["G", "H", "I"], date: "Oct 25" },
  { id: 4, name: "Project Delta", status: "In Progress", statusColor: "#fbbf24", progress: 60, team: ["J", "K", "L"], date: "Nov 10" },
  { id: 5, name: "Project Epsilon", status: "Completed", statusColor: "#34d399", progress: 100, team: ["M", "N"], date: "Nov 15" },
  { id: 6, name: "Project Zeta", status: "On Hold", statusColor: "#f87171", progress: 20, team: ["O", "P", "Q"], date: "Dec 01" },
];

const reportsData = [
  { name: "Monthly Sales Report - PDF", type: "PDF", icon: "pdf" },
  { name: "Monthly Sales Report - PDF", type: "PDF", icon: "pdf" },
  { name: "User Activity Report - Excel", type: "Excel", icon: "xls" },
  { name: "System Performance Report - PDF", type: "PDF", icon: "pdf" },
  { name: "System Performance Report - PDF", type: "PDF", icon: "pdf" },
];

// ─── Avatar Placeholder ───────────────────────────────────────────────────────
function Avatar({ name, size = 32, bg = "#6366f1" }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444", "#14b8a6"];
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: colors[colorIndex],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: "700", color: "#fff",
      border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0,
    }}>{initials}</div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 12,
      background: on ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      cursor: "pointer", position: "relative", transition: "all 0.3s ease",
      boxShadow: on ? "0 0 12px rgba(99,102,241,0.5)" : "none",
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2, left: on ? 22 : 2,
        transition: "left 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}/>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value, color = "#6366f1" }) {
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${value}%`, borderRadius: 3,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 0.8s ease",
        boxShadow: `0 0 8px ${color}88`,
      }}/>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, up, icon, color }) {
  return (
    <div style={{ ...styles.glassCard, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 42, height: 42, borderRadius: "50%",
        background: `${color}33`, display: "flex", alignItems: "center", justifyContent: "center",
        color: color, border: `1px solid ${color}44`,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 22, fontWeight: "700", color: "#fff", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{label}</div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3,
        color: up ? "#34d399" : "#f87171", fontSize: 11, fontWeight: "600" }}>
        {up ? <Icon.ArrowUp/> : <Icon.ArrowDown/>}
        {up ? "Session" : "Unwth"}
      </div>
    </div>
  );
}

// ─── Page Transition Wrapper ──────────────────────────────────────────────────
function PageWrapper({ children, pageKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(false); const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, [pageKey]);
  return (
    <div style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: "opacity 0.45s ease, transform 0.45s ease", flex: 1,
    }}>{children}</div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleLogin = () => {
    if (!username || !password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: username }); }, 1200);
  };
  const handleRegister = () => {
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess("Account created! You can now login."); setMode("login"); }, 1200);
  };
  const handleForgot = () => {
    if (!email) { setError("Please enter your email."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess("Reset link sent to your email!"); setMode("login"); }, 1200);
  };

  const inputStyle = (id) => ({
    ...styles.glassInput,
    borderColor: focused === id ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
    boxShadow: focused === id ? "0 0 0 2px rgba(255,255,255,0.15)" : "none",
    transition: "all 0.3s ease",
  });

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a4f 40%, #b5451b 80%, #4a1942 100%)",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif", position: "relative", overflow: "hidden",
    }}>
      {/* Blobs */}
      {["#6366f155","#34d39944","#f59e0b33","#ec489933"].map((c,i)=>(
        <div key={i} style={{
          position:"absolute", borderRadius:"50%",
          width:[300,250,200,280][i], height:[300,250,200,280][i],
          background:c, filter:"blur(60px)",
          top:["-10%","60%","20%","50%"][i], left:["-5%","70%","-10%","80%"][i],
          animation: `blob${i} 8s ease-in-out infinite`,
          animationDelay:`${i*2}s`,
        }}/>
      ))}
      <style>{`
        @keyframes blob0 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,20px) scale(1.05)} }
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.08)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(25px,-15px) scale(1.03)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,10px) scale(1.06)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
      `}</style>

      {/* Logo */}
      <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 12, animation: "slideUp 0.6s ease" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(10px)",
        }}>
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        <span style={{ color: "#fff", fontSize: 22, fontWeight: "700", letterSpacing: "0.5px" }}>GlassApp</span>
      </div>

      {/* Card */}
      <div style={{
        ...styles.glassCard, padding: "36px 40px", width: 380,
        animation: "slideUp 0.6s ease 0.1s both",
        position: "relative", zIndex: 1,
      }}>
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: 28, fontSize: 26, fontWeight: "700" }}>
          {mode === "login" ? "Login" : mode === "register" ? "Create Account" : "Forgot Password"}
        </h2>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.5)", borderRadius: 12,
            padding: "10px 16px", marginBottom: 16, color: "#fca5a5", fontSize: 13, animation: "shake 0.3s ease" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: "rgba(52,211,153,0.2)", border: "1px solid rgba(52,211,153,0.5)", borderRadius: 12,
            padding: "10px 16px", marginBottom: 16, color: "#6ee7b7", fontSize: 13 }}>
            {success}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)" }}>
                <Icon.User/>
              </div>
              <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
                onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)}
                style={{ ...inputStyle("name"), paddingLeft: 42 }}/>
            </div>
          )}
          {mode !== "forgot" && (
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)" }}>
                <Icon.User/>
              </div>
              <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
                onFocus={()=>setFocused("user")} onBlur={()=>setFocused(null)}
                style={{ ...inputStyle("user"), paddingLeft: 42 }}/>
            </div>
          )}
          {(mode === "register" || mode === "forgot") && (
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)" }}>
                <Icon.Globe/>
              </div>
              <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)}
                style={{ ...inputStyle("email"), paddingLeft: 42 }}/>
            </div>
          )}
          {mode !== "forgot" && (
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)" }}>
                <Icon.Lock/>
              </div>
              <input placeholder="Password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                onFocus={()=>setFocused("pw")} onBlur={()=>setFocused(null)}
                style={{ ...inputStyle("pw"), paddingLeft: 42, paddingRight: 42 }}/>
              <div onClick={() => setShowPw(!showPw)} style={{
                position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.6)", cursor: "pointer",
              }}>{showPw ? <Icon.Eye/> : <Icon.EyeOff/>}</div>
            </div>
          )}

          <button onClick={mode==="login"?handleLogin:mode==="register"?handleRegister:handleForgot}
            style={{
              ...styles.glassBtn,
              background: loading ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.25)",
              width: "100%", marginTop: 6,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.35)"}
            onMouseLeave={e => e.target.style.background = loading ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.25)"}
          >
            {loading ? (
              <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid #fff",
                borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
            ) : mode === "login" ? "Log In" : mode === "register" ? "Create Account" : "Send Reset Link"}
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <button onClick={() => { setMode("forgot"); setError(""); setSuccess(""); }} style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.7)",
            cursor: "pointer", fontSize: 13, textDecoration: "underline",
          }}>Forgot Password?</button>
          <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setSuccess(""); }} style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.7)",
            cursor: "pointer", fontSize: 13, textDecoration: "underline",
          }}>{mode === "login" ? "Create Account" : "Back to Login"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", Icon: Icon.Dashboard, color: "#6366f1" },
  { id: "analytics", label: "Analytics", Icon: Icon.Analytics, color: "#f59e0b" },
  { id: "projects", label: "Projects", Icon: Icon.Projects, color: "#10b981" },
  { id: "tasks", label: "Tasks", Icon: Icon.Tasks, color: "#ef4444" },
  { id: "users", label: "Users", Icon: Icon.Users, color: "#f59e0b" },
  { id: "settings", label: "Settings", Icon: Icon.Settings, color: "#6366f1" },
  { id: "reports", label: "Reports", Icon: Icon.Reports, color: "#10b981" },
];

function Sidebar({ active, onNav, user, onLogout }) {
  return (
    <div style={{
      width: 200, minHeight: "100vh", padding: "28px 16px",
      display: "flex", flexDirection: "column", gap: 8,
      background: "rgba(0,0,0,0.15)", backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,255,255,0.1)", flexShrink: 0,
    }}>
      {navItems.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} style={{
          ...styles.navBtn,
          ...(active === item.id ? styles.navBtnActive : {}),
        }}
          onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: `${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center",
            color: item.color,
          }}><item.Icon/></div>
          {item.label}
        </button>
      ))}

      {/* Admin profile */}
      <div style={{ marginTop: "auto", ...styles.glassCard, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={user?.name || "Admin"} size={36}/>
        <div style={{ overflow: "hidden" }}>
          <div style={{ color: "#fff", fontWeight: "600", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.name || "Admin"}
          </div>
          <button onClick={onLogout} style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.5)",
            cursor: "pointer", fontSize: 11, padding: 0,
          }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
function TopBar({ title, subtitle, stats }) {
  return (
    <div style={{ ...styles.glassCard, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: "700", color: "#fff" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {stats && (
        <div style={{ display: "flex", gap: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${s.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                {s.icon}
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <div>
      <TopBar title="Analytics Overview" subtitle="Glass dashboard management system"
        stats={[
          { value: "17,286", label: "Session", icon: <Icon.Analytics/>, color: "#6366f1" },
          { value: "80%", label: "Average", icon: <Icon.ArrowUp/>, color: "#34d399" },
          { value: "33%", label: "Unwth", icon: <Icon.Settings/>, color: "#f87171" },
        ]}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* User Growth */}
        <div style={{ ...styles.glassCard, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontWeight: "600" }}>User Growth</span>
            <span style={{ ...styles.glassCard, padding: "4px 12px", fontSize: 12, color: "rgba(255,255,255,0.7)", borderRadius: 20 }}>Months</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="ug1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="ug2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.7)", border: "none", borderRadius: 8, color: "#fff" }}/>
              <Area type="monotone" dataKey="users" stroke="#6366f1" fill="url(#ug1)" strokeWidth={2}/>
              <Area type="monotone" dataKey="sessions" stroke="#f59e0b" fill="url(#ug2)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div style={{ ...styles.glassCard, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontWeight: "600" }}>Revenue</span>
            <span style={{ ...styles.glassCard, padding: "4px 12px", fontSize: 12, color: "rgba(255,255,255,0.7)", borderRadius: 20 }}>Months</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="rev1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.7)", border: "none", borderRadius: 8, color: "#fff" }}/>
              <Area type="monotone" dataKey="revenue" stroke="#34d399" fill="url(#rev1)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Map */}
        <div style={{ ...styles.glassCard, padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontWeight: "600" }}>User Name</span>
            <Icon.MoreH/>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 320 180" width="100%" style={{ opacity: 0.7 }}>
              <rect width="320" height="180" fill="none"/>
              {/* Simplified world map blobs */}
              <ellipse cx="80" cy="80" rx="50" ry="35" fill="#f59e0b55" stroke="#f59e0b" strokeWidth="1"/>
              <ellipse cx="160" cy="70" rx="40" ry="30" fill="#34d39944" stroke="#34d399" strokeWidth="1"/>
              <ellipse cx="220" cy="75" rx="30" ry="25" fill="#6366f144" stroke="#6366f1" strokeWidth="1"/>
              <ellipse cx="260" cy="100" rx="20" ry="15" fill="#f59e0b33" stroke="#f59e0b" strokeWidth="1"/>
              <ellipse cx="140" cy="130" rx="25" ry="15" fill="#ec489933" stroke="#ec4899" strokeWidth="1"/>
              <ellipse cx="80" cy="140" rx="20" ry="12" fill="#34d39933" stroke="#34d399" strokeWidth="1"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Traffic Sources */}
        <div style={{ ...styles.glassCard, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontWeight: "600" }}>Traffic Sources</span>
            <Icon.MoreH/>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <PieChart width={130} height={130}>
              <Pie data={trafficData} cx={60} cy={60} innerRadius={35} outerRadius={60} dataKey="value" startAngle={90} endAngle={450}>
                {trafficData.map((d, i) => <Cell key={i} fill={d.color}/>)}
              </Pie>
            </PieChart>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {trafficData.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color }}/>
                  {d.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div style={{ ...styles.glassCard, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontWeight: "600" }}>Top Pages</span>
            <Icon.MoreH/>
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={topPagesData} barSize={10}>
              <XAxis dataKey="page" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.7)", border: "none", borderRadius: 8, color: "#fff" }}/>
              <Bar dataKey="views" radius={[4,4,0,0]}>
                {topPagesData.map((_, i) => <Cell key={i} fill={["#6366f1","#34d399","#f59e0b","#ec4899","#3b82f6","#a78bfa","#f87171","#14b8a6","#fbbf24"][i%9]}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 8 }}>
            {[{name:"Aoni Admin",pct:100,c:"#ef4444"},{name:"Alioen Nisonam",pct:75,c:"#34d399"},{name:"Xfen Midter",pct:35,c:"#a78bfa"}].map((u,i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Avatar name={u.name} size={22}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>{u.name}</div>
                  <ProgressBar value={u.pct} color={u.c}/>
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", minWidth: 35, textAlign: "right" }}>{u.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Demographics */}
        <div style={{ ...styles.glassCard, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontWeight: "600" }}>User Demographics</span>
            <Icon.MoreH/>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Age</div>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={[{a:"10-20",v:15},{a:"20-30",v:30},{a:"30-40",v:25},{a:"40-50",v:20},{a:"55+",v:10}]} barSize={8}>
                  <Bar dataKey="v" fill="#6366f1" radius={[3,3,0,0]}/>
                  <XAxis dataKey="a" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Location</div>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={[{l:"Un",v:80},{l:"Ok",v:60},{l:"Fr",v:45},{l:"Sa",v:30},{l:"Dc",v:20}]} barSize={8}>
                  <Bar dataKey="v" radius={[3,3,0,0]}>
                    {[0,1,2,3,4].map(i=><Cell key={i} fill={["#34d399","#6366f1","#f59e0b","#ec4899","#3b82f6"][i]}/>)}
                  </Bar>
                  <XAxis dataKey="l" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ANALYTICS PAGE ───────────────────────────────────────────────────────────
function AnalyticsPage() {
  const [period, setPeriod] = useState("Months");
  return (
    <div>
      <TopBar title="Analytics" subtitle="Detailed performance insights"
        stats={[
          { value: "17,286", label: "Total Sessions", icon: <Icon.Analytics/>, color: "#6366f1" },
          { value: "80%", label: "Bounce Rate", icon: <Icon.ArrowUp/>, color: "#f59e0b" },
          { value: "33%", label: "Conversion", icon: <Icon.Settings/>, color: "#34d399" },
        ]}
      />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ ...styles.glassCard, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>Sessions Overview</span>
            <div style={{ display: "flex", gap: 8 }}>
              {["Week","Months","Year"].map(p => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  ...styles.glassCard, padding: "4px 14px", fontSize: 12, border: "none", cursor: "pointer",
                  color: period===p ? "#fff" : "rgba(255,255,255,0.5)",
                  background: period===p ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease",
                }}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="an1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="an2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="an3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.75)", border: "none", borderRadius: 10, color: "#fff" }}/>
              <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}/>
              <Area type="monotone" dataKey="users" name="Users" stroke="#6366f1" fill="url(#an1)" strokeWidth={2.5}/>
              <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#f59e0b" fill="url(#an2)" strokeWidth={2.5}/>
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#34d399" fill="url(#an3)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Total Users", val: "208", change: "+12%", color: "#6366f1" },
            { label: "Active Users", val: "40", change: "+5%", color: "#34d399" },
            { label: "New Today", val: "10", change: "+3%", color: "#f59e0b" },
            { label: "Avg Session", val: "4m 32s", change: "+8%", color: "#ec4899" },
          ].map((s, i) => (
            <div key={i} style={{ ...styles.glassCard, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{s.label}</div>
                <div style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>{s.val}</div>
              </div>
              <div style={{ color: "#34d399", fontSize: 13, fontWeight: "600", display: "flex", alignItems: "center", gap: 3 }}>
                <Icon.ArrowUp/>{s.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ ...styles.glassCard, padding: 24 }}>
          <div style={{ color: "#fff", fontWeight: "600", marginBottom: 16 }}>Traffic Sources</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <PieChart width={150} height={150}>
              <Pie data={trafficData} cx={70} cy={70} innerRadius={45} outerRadius={70} dataKey="value">
                {trafficData.map((d,i) => <Cell key={i} fill={d.color}/>)}
              </Pie>
            </PieChart>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {trafficData.map((d, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }}/>
                      {d.name}
                    </span>
                    <span style={{ fontWeight: "700" }}>{d.value}%</span>
                  </div>
                  <ProgressBar value={d.value} color={d.color}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ ...styles.glassCard, padding: 24 }}>
          <div style={{ color: "#fff", fontWeight: "600", marginBottom: 16 }}>Revenue Trend</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weekData}>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.75)", border: "none", borderRadius: 10, color: "#fff" }}/>
              <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: "#f59e0b", r: 4 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────────────────────────
function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  const addProject = () => {
    if (!newName) return;
    setProjects([...projects, { id: Date.now(), name: newName, status: "In Progress", statusColor: "#fbbf24", progress: 0, team: ["A"], date: "TBD" }]);
    setNewName(""); setShowModal(false);
  };

  return (
    <div>
      <TopBar title="Projects Overview" subtitle="Glass dashboard management system"
        stats={[
          { value: "10%", label: "System", icon: <Icon.Monitor/>, color: "#6366f1" },
          { value: "22x", label: "Ment", icon: <Icon.Cpu/>, color: "#34d399" },
          { value: "33%", label: "System", icon: <Icon.Settings/>, color: "#f87171" },
          { value: "7", label: "Userid", icon: <Icon.Flash/>, color: "#f59e0b" },
        ]}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button onClick={() => setShowModal(true)} style={{
          ...styles.glassBtn, display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
        }}>
          <Icon.Plus/> New Project
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {projects.map((p, i) => (
          <div key={p.id} style={{ ...styles.glassCard, padding: 22, animation: `slideUp 0.4s ease ${i*0.05}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{p.name}</div>
              <Icon.MoreH/>
            </div>
            <div style={{ color: p.statusColor, fontSize: 13, fontWeight: "600", marginBottom: 14 }}>{p.status}</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>
                <span>Progress</span><span style={{ fontWeight: "700", color: "#fff" }}>{p.progress}%</span>
              </div>
              <ProgressBar value={p.progress} color={p.statusColor}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Team</div>
              <div style={{ display: "flex", gap: -4 }}>
                {p.team.map((t, j) => <div key={j} style={{ marginLeft: j > 0 ? -8 : 0 }}><Avatar name={t} size={28}/></div>)}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                <Icon.Calendar/> {p.date}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...styles.glassBtn, padding: "4px 10px", fontSize: 11 }}>
                  <Icon.Edit/>
                </button>
                <button onClick={() => setProjects(projects.filter(x => x.id !== p.id))} style={{
                  ...styles.glassBtn, padding: "4px 10px", fontSize: 11, background: "rgba(239,68,68,0.2)",
                }}>
                  <Icon.Trash/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
          animation: "slideUp 0.3s ease",
        }}>
          <div style={{ ...styles.glassCard, padding: 32, width: 380 }}>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 20 }}>New Project</div>
            <input placeholder="Project name" value={newName} onChange={e => setNewName(e.target.value)}
              style={{ ...styles.glassInput, marginBottom: 16 }}/>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={addProject} style={{ ...styles.glassBtn, flex: 1, background: "rgba(99,102,241,0.4)" }}>Create</button>
              <button onClick={() => setShowModal(false)} style={{ ...styles.glassBtn, flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TASKS PAGE ───────────────────────────────────────────────────────────────
function TasksPage() {
  const [tasks, setTasks] = useState(tasksData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState({ name: "", assignee: "", priority: "medium", due: "" });

  const filtered = tasks.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  const open = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;

  const saveTask = () => {
    if (!form.name) return;
    if (editTask) {
      setTasks(tasks.map(t => t.id === editTask.id ? { ...t, ...form } : t));
    } else {
      setTasks([...tasks, { id: Date.now(), ...form, status: "In Progress", done: false }]);
    }
    setShowModal(false); setEditTask(null); setForm({ name: "", assignee: "", priority: "medium", due: "" });
  };

  const priorityColor = { high: "#ef4444", medium: "#f59e0b", low: "#34d399" };

  return (
    <div>
      <TopBar title="Tasks" subtitle="Glass dashboard management system"/>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <div style={{ ...styles.glassCard, flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 16px" }}>
          <Icon.Search/>
          <input placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: "none", border: "none", color: "#fff", outline: "none", flex: 1, fontSize: 14 }}/>
        </div>
        <button onClick={() => { setShowModal(true); setEditTask(null); setForm({ name:"", assignee:"", priority:"medium", due:"" }); }}
          style={{ ...styles.glassBtn, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon.Plus/> Add Task
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ ...styles.glassCard, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>Current Tasks</span>
            <Icon.MoreH/>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8, marginBottom: 10,
            fontSize: 12, color: "rgba(255,255,255,0.5)", paddingBottom: 10,
            borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <span>Task Name</span><span>Assignee</span><span>Status</span><span>Priority</span><span>Actions</span>
          </div>
          {filtered.map((t, i) => (
            <div key={t.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8, alignItems: "center",
              padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
              opacity: t.done ? 0.5 : 1, transition: "all 0.3s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={t.done} onChange={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}
                  style={{ width: 14, height: 14, accentColor: "#6366f1", cursor: "pointer" }}/>
                <div>
                  <div style={{ color: "#fff", fontSize: 13, textDecoration: t.done ? "line-through" : "none" }}>{t.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Developer</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Avatar name={t.assignee} size={22}/>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{t.assignee}</span>
              </div>
              <div>
                <div style={{ width: 60, height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "60%", background: priorityColor[t.priority], borderRadius: 3 }}/>
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: "600", color: priorityColor[t.priority],
                background: `${priorityColor[t.priority]}22`, padding: "2px 8px", borderRadius: 20 }}>
                {t.priority}
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => { setEditTask(t); setForm({ name: t.name, assignee: t.assignee, priority: t.priority, due: t.due || "" }); setShowModal(true); }}
                  style={{ ...styles.glassBtn, padding: "4px 10px", fontSize: 11 }}>Edit</button>
                <button onClick={() => setTasks(tasks.map(x => x.id===t.id ? {...x,done:true} : x))}
                  style={{ ...styles.glassBtn, padding: "4px 10px", fontSize: 11, background:"rgba(52,211,153,0.2)" }}>Done</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ ...styles.glassCard, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#fff", fontWeight: "600" }}>Task Statistics</span>
              <Icon.MoreH/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { label: "Open", val: open, color: "#6366f1" },
                { label: "In Progress", val: `${Math.round((open/tasks.length)*100)}%`, color: "#f59e0b" },
                { label: "Completed", val: `${Math.round((done/tasks.length)*100)}%`, color: "#34d399" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "700", color: "#fff" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.label}</div>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${s.color}`,
                    margin: "8px auto 0", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: s.color }}>
                    {i===0 ? open : i===1 ? "30%" : "77%"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { setShowModal(true); setEditTask(null); setForm({ name:"", assignee:"", priority:"medium", due:"" }); }}
            style={{ ...styles.glassBtn, ...styles.glassCard, padding: 20, fontSize: 16, fontWeight: "700", width: "100%" }}>
            + Add New Task
          </button>

          <div style={{ ...styles.glassCard, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "#fff", fontWeight: "600" }}>Upcoming Deadlines</span>
              <Icon.MoreH/>
            </div>
            {tasks.filter(t=>!t.done).slice(0,2).map((t,i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <div style={{ color: "#fff", fontSize: 13 }}>{t.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>2d ago</div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{t.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, animation: "slideUp 0.3s ease" }}>
          <div style={{ ...styles.glassCard, padding: 32, width: 400 }}>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 20 }}>{editTask ? "Edit Task" : "New Task"}</div>
            {[
              { label: "Task Name", key: "name", placeholder: "Enter task name" },
              { label: "Assignee", key: "assignee", placeholder: "Assignee name" },
              { label: "Due Date", key: "due", placeholder: "DD/MM/YYYY" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "block", marginBottom: 6 }}>{f.label}</label>
                <input placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                  style={{ ...styles.glassInput }}/>
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "block", marginBottom: 6 }}>Priority</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["high","medium","low"].map(p => (
                  <button key={p} onClick={() => setForm({...form, priority: p})} style={{
                    ...styles.glassBtn, flex: 1, padding: "8px",
                    background: form.priority === p ? `${priorityColor[p]}44` : "rgba(255,255,255,0.1)",
                    border: form.priority === p ? `1px solid ${priorityColor[p]}` : "1px solid rgba(255,255,255,0.2)",
                    color: form.priority === p ? priorityColor[p] : "rgba(255,255,255,0.6)",
                  }}>{p}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={saveTask} style={{ ...styles.glassBtn, flex: 1, background: "rgba(99,102,241,0.4)" }}>
                {editTask ? "Update" : "Create"}
              </button>
              <button onClick={() => { setShowModal(false); setEditTask(null); }} style={{ ...styles.glassBtn, flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── USERS PAGE ───────────────────────────────────────────────────────────────
function UsersPage() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TopBar title="User Management" subtitle="Glass dashboard management system"/>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ ...styles.glassCard, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>User Management</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)",
                padding: "8px 14px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.2)" }}>
                <Icon.Search/>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                  style={{ background: "none", border: "none", color: "#fff", outline: "none", fontSize: 13, width: 120 }}/>
              </div>
              <Icon.MoreH/>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8, marginBottom: 10,
            fontSize: 12, color: "rgba(255,255,255,0.5)", paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <span>User Name</span><span>Role</span><span>Status</span><span>Last Active</span><span>Actions</span>
          </div>
          {filtered.map((u, i) => (
            <div key={u.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 8, alignItems: "center",
              padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={u.name} size={32}/>
                <div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>{u.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Eimender</div>
                </div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{u.role}</span>
              <span style={{
                fontSize: 12, fontWeight: "600", padding: "3px 8px", borderRadius: 20,
                color: u.up ? "#34d399" : "#f87171",
                background: u.up ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)",
              }}>{u.status}</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{u.lastActive}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...styles.glassBtn, padding: "5px 10px", color: "rgba(255,255,255,0.7)" }}><Icon.Edit/></button>
                <button onClick={() => setUsers(users.filter(x => x.id !== u.id))}
                  style={{ ...styles.glassBtn, padding: "5px 10px", background: "rgba(239,68,68,0.2)" }}><Icon.Trash/></button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Total Users", val: "208", color: "#6366f1", data: weekData, key: "users" },
            { label: "Active Users", val: "40 Users", color: "#34d399", data: weekData, key: "sessions" },
            { label: "New Users Today", val: "10 New Users", color: "#f59e0b", data: weekData, key: "users" },
          ].map((s, i) => (
            <div key={i} style={{ ...styles.glassCard, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: "#fff", fontWeight: "600" }}>{s.label}</span>
                <Icon.MoreH/>
              </div>
              <div style={{ color: "#fff", fontSize: 26, fontWeight: "700", marginBottom: 6 }}>{s.val.split(" ")[0]}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 8 }}>{s.val.split(" ").slice(1).join(" ")}</div>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={weekData}>
                  <defs>
                    <linearGradient id={`ug${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.color} stopOpacity={0.5}/>
                      <stop offset="100%" stopColor={s.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey={s.key} stroke={s.color} fill={`url(#ug${i})`} strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
function SettingsPage() {
  const [settings, setSettings] = useState({
    name: "Aoni Admin", email: "devorin@gmail.com", password: "",
    showPw: false, accentColor: "#ef4444", fontSize: 16,
    email_notif: true, push_alerts: true, system_alerts: true,
    data_share: false, data_visibility: false, visibility: false,
    theme: "Dark",
  });
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const save = (key, val) => {
    setSettings(s => ({ ...s, [key]: val }));
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const colors = ["#ef4444","#f87171","#f59e0b","#34d399","#60a5fa","#a78bfa","#ec4899"];

  return (
    <div>
      <TopBar title="Settings" subtitle="Glass dashboard management system"
        stats={[
          { value: "10%", label: "System", icon: <Icon.Monitor/>, color: "#6366f1" },
          { value: "22x", label: "Ment", icon: <Icon.Cpu/>, color: "#34d399" },
          { value: "33%", label: "System", icon: <Icon.Settings/>, color: "#f87171" },
          { value: "7", label: "Userid", icon: <Icon.Flash/>, color: "#f59e0b" },
        ]}
      />
      {saved && (
        <div style={{ ...styles.glassCard, padding: "10px 20px", marginBottom: 16, background: "rgba(52,211,153,0.2)",
          border: "1px solid rgba(52,211,153,0.4)", color: "#6ee7b7", fontSize: 13, animation: "slideUp 0.3s ease",
          display: "flex", alignItems: "center", gap: 8 }}>
          <Icon.Check/> Settings saved successfully!
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Account Settings */}
        <div style={{ ...styles.glassCard, padding: 24 }}>
          <div style={{ color: "#fff", fontWeight: "700", fontSize: 16, marginBottom: 20 }}>Account Settings</div>
          {[
            { label: "Name", key: "name", type: "text" },
            { label: "Email", key: "email", type: "email" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "block", marginBottom: 6 }}>{f.label}</label>
              <input value={settings[f.key]} onChange={e => save(f.key, e.target.value)} type={f.type}
                style={{ ...styles.glassInput, borderRadius: 10 }}/>
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input value={settings.password} onChange={e => save("password", e.target.value)}
                type={settings.showPw ? "text" : "password"} placeholder="Password"
                style={{ ...styles.glassInput, borderRadius: 10, paddingRight: 40 }}/>
              <button onClick={() => save("showPw", !settings.showPw)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer",
              }}>{settings.showPw ? <Icon.Eye/> : <Icon.EyeOff/>}</button>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "block", marginBottom: 10 }}>Profile Picture</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={settings.name} size={64}/>
              <button style={{ ...styles.glassBtn, padding: "8px 16px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon.Upload/> Upload
              </button>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "block", marginBottom: 10 }}>Accent Color</label>
            <div style={{ display: "flex", gap: 8 }}>
              {colors.map(c => (
                <div key={c} onClick={() => save("accentColor", c)} style={{
                  width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer",
                  border: settings.accentColor === c ? "2px solid #fff" : "2px solid transparent",
                  transition: "all 0.2s ease", transform: settings.accentColor===c?"scale(1.2)":"scale(1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {settings.accentColor === c && <Icon.Check/>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              <span>Font Size</span><span style={{ color: "#fff" }}>{settings.fontSize}</span>
            </div>
            <input type="range" min="10" max="24" value={settings.fontSize} onChange={e => save("fontSize", +e.target.value)}
              style={{ width: "100%", accentColor: settings.accentColor }}/>
          </div>
        </div>

        {/* Middle column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Notifications */}
          <div style={{ ...styles.glassCard, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Notifications</span>
              <Icon.MoreH/>
            </div>
            {[
              { label: "Email", key: "email_notif", icon: <Icon.Globe/> },
              { label: "Push Alerts", key: "push_alerts", icon: <Icon.Bell/> },
              { label: "System Alerts", key: "system_alerts", icon: <Icon.Bell/> },
            ].map(n => (
              <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                  {n.icon} {n.label}
                </div>
                <Toggle on={settings[n.key]} onChange={v => save(n.key, v)}/>
              </div>
            ))}
          </div>

          {/* Appearance */}
          <div style={{ ...styles.glassCard, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Appearance</span>
              <Icon.MoreH/>
            </div>
            <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "rgba(255,255,255,0.1)", borderRadius: 30, padding: 4 }}>
              {["Light","Dark","System"].map(t => (
                <button key={t} onClick={() => save("theme", t)} style={{
                  flex: 1, padding: "8px", borderRadius: 25, border: "none", cursor: "pointer", fontSize: 13, fontWeight: "600",
                  background: settings.theme===t ? "rgba(255,255,255,0.25)" : "transparent",
                  color: settings.theme===t ? "#fff" : "rgba(255,255,255,0.5)",
                  transition: "all 0.3s ease",
                }}>{t}</button>
              ))}
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600", marginBottom: 10 }}>System Info</div>
            {[["App Version","1.7.5"],["OS","Windows 10"],["Storage","137 GB / 288 GB"]].map(([k,v])=>(
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13,
                color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
                <span>{k}</span><span style={{ color: "rgba(255,255,255,0.9)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Privacy */}
          <div style={{ ...styles.glassCard, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Privacy</span>
              <Icon.MoreH/>
            </div>
            {[
              { label: "Data Share", key: "data_share", icon: <Icon.Share/> },
              { label: "Data Visibility", key: "data_visibility", icon: <Icon.Visibility/> },
              { label: "Visibility", key: "visibility", icon: <Icon.Eye/> },
            ].map(n => (
              <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                  {n.icon} {n.label}
                </div>
                <Toggle on={settings[n.key]} onChange={v => save(n.key, v)}/>
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "block", marginBottom: 10 }}>Accent Color</label>
              <div style={{ display: "flex", gap: 8 }}>
                {colors.map(c => (
                  <div key={c} onClick={() => save("accentColor", c)} style={{
                    width: 22, height: 22, borderRadius: "50%", background: c, cursor: "pointer",
                    border: settings.accentColor===c ? "2px solid #fff" : "2px solid transparent",
                    transition: "all 0.2s ease",
                  }}/>
                ))}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                <span>Font Size</span><span style={{ color: "#fff" }}>{settings.fontSize}</span>
              </div>
              <input type="range" min="10" max="24" value={settings.fontSize} onChange={e => save("fontSize", +e.target.value)}
                style={{ width: "100%", accentColor: settings.accentColor }}/>
            </div>
          </div>

          {/* Help & Support */}
          <div style={{ ...styles.glassCard, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Help & Support</span>
              <Icon.MoreH/>
            </div>
            {[
              { label: "FAQs", icon: <Icon.Help/> },
              { label: "Contact", icon: <Icon.Phone/> },
            ].map(item => (
              <div key={item.label} onClick={() => setActiveSection(item.label)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer", borderRadius: 8,
                transition: "all 0.2s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                  {item.icon} {item.label}
                </div>
                <Icon.ChevronRight/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REPORTS PAGE ─────────────────────────────────────────────────────────────
function ReportsPage() {
  const [reports, setReports] = useState(reportsData);
  const [downloading, setDownloading] = useState(null);

  const download = (i) => {
    setDownloading(i);
    setTimeout(() => setDownloading(null), 1500);
  };

  return (
    <div>
      <TopBar title="Reports" subtitle="Glass dashboard management system"
        stats={[
          { value: "10%", label: "System", icon: <Icon.Monitor/>, color: "#6366f1" },
          { value: "22x", label: "Ment", icon: <Icon.Cpu/>, color: "#34d399" },
          { value: "33%", label: "System", icon: <Icon.Settings/>, color: "#f87171" },
          { value: "7", label: "Userid", icon: <Icon.Flash/>, color: "#f59e0b" },
        ]}
      />
      <div style={{ ...styles.glassCard, padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>Reports Overview</span>
          <span style={{ ...styles.glassCard, padding: "4px 14px", fontSize: 12, color: "rgba(255,255,255,0.7)", borderRadius: 20 }}>Months</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weekData}>
            <defs>
              {[["#6366f1","r1"],["#f59e0b","r2"],["#34d399","r3"],["#ec4899","r4"]].map(([c,id])=>(
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c} stopOpacity={0.5}/>
                  <stop offset="100%" stopColor={c} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{ background: "rgba(0,0,0,0.75)", border: "none", borderRadius: 10, color: "#fff" }}/>
            <Area type="monotone" dataKey="users" stroke="#6366f1" fill="url(#r1)" strokeWidth={2}/>
            <Area type="monotone" dataKey="sessions" stroke="#f59e0b" fill="url(#r2)" strokeWidth={2}/>
            <Area type="monotone" dataKey="revenue" stroke="#34d399" fill="url(#r3)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Generated Reports */}
        <div style={{ ...styles.glassCard, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>Generated Reports</span>
            <Icon.MoreH/>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, marginBottom: 10,
            fontSize: 12, color: "rgba(255,255,255,0.5)", paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <span>Name</span>
          </div>
          {reports.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: r.type==="PDF" ? "rgba(239,68,68,0.25)" : "rgba(52,211,153,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: r.type==="PDF" ? "#f87171" : "#34d399", fontSize: 9, fontWeight: "700",
                }}>{r.type}</div>
                <div>
                  <div style={{ color: "#fff", fontSize: 13 }}>{r.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{r.type}</div>
                </div>
              </div>
              <button onClick={() => download(i)} style={{ ...styles.glassBtn, padding: "6px 10px",
                background: downloading===i ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)" }}>
                {downloading===i ? (
                  <div style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
                ) : <Icon.Download/>}
              </button>
            </div>
          ))}
        </div>

        {/* Report Templates */}
        <div style={{ ...styles.glassCard, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>Report Templates</span>
            <Icon.MoreH/>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Custom Report", icon: <Icon.FileText/>, color: "#6366f1" },
              { label: "Financial Summary", icon: <Icon.DollarSign/>, color: "#34d399" },
              { label: "Analytics Breakdown", icon: <Icon.BarChart2/>, color: "#f59e0b" },
            ].map((t, i) => (
              <div key={i} style={{ ...styles.glassCard, padding: 20, textAlign: "center", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%", background: `${t.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto", color: t.color,
                }}>{t.icon}</div>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>{t.label}</div>
                <button style={{ ...styles.glassBtn, padding: "8px", fontSize: 13, width: "100%",
                  background: `${t.color}33`, border: `1px solid ${t.color}55` }}>Create</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  const handleLogin = (u) => { setUser(u); setLoggedIn(true); };
  const handleLogout = () => { setLoggedIn(false); setUser(null); setPage("dashboard"); };

  if (!loggedIn) return <LoginPage onLogin={handleLogin}/>;

  const bgGradient = "linear-gradient(135deg, #1a3a5c 0%, #1e5c3a 40%, #8b3512 80%, #3a1440 100%)";

  const pages = { dashboard: DashboardPage, analytics: AnalyticsPage, projects: ProjectsPage,
    tasks: TasksPage, users: UsersPage, settings: SettingsPage, reports: ReportsPage };
  const PageComponent = pages[page] || DashboardPage;

  return (
    <div style={{
      minHeight: "100vh", background: bgGradient, fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      display: "flex", overflow: "hidden",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,0.4); }
        input { font-family: inherit; }
        button { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
      `}</style>

      <Sidebar active={page} onNav={setPage} user={user} onLogout={handleLogout}/>

      <div style={{ flex: 1, padding: 24, overflowY: "auto", maxHeight: "100vh" }}>
        <PageWrapper pageKey={page}>
          <PageComponent/>
        </PageWrapper>
      </div>
    </div>
  );
}
