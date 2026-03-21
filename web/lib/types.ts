export interface ApiKey {
  id: number;
  key: string;
  appName: string;
  packageName: string;
  appSignature: string;
  isActive: boolean;
  userId: number | null;
  createdAt: string;
  user?: { id: number; username: string } | null;
}

export interface Ad {
  id: number;
  apiKeyId: number;
  title: string;
  description: string;
  imageUrl: string;
  redirectUrl: string;
  adType: string;
  buttonText: string;
  isActive: boolean;
  priority: number;
  maxImpressions: number;
  broadcastToVerified: boolean;
  targetAudience: 'all' | 'verified' | 'unverified';
  scheduledAt: string | null;
  createdAt: string;
  apiKey?: { appName: string };
  _count?: { impressions: number; clicks: number };
}

export interface PinConfig {
  id: number;
  apiKeyId: number;
  pinEnabled: boolean;
  pinMessage: string;
  maxAttempts: number;
  getPinUrl: string;
  getPinBtnText: string;
  enterPinBtnText: string;
  expiryMode: "never" | "duration";
  expiryHours: number;
}

export interface UserPin {
  id: number;
  apiKeyId: number;
  deviceId: string;
  pin: string;
  isUsed: boolean;
  createdAt: string;
  usedAt: string | null;
  expiresAt: string | null;
  apiKey?: { appName: string };
}

export interface Stats {
  totalKeys: number;
  totalAds: number;
  totalImpressions: number;
  totalClicks: number;
  todayImpressions: number;
  todayClicks: number;
  ctr: string;
  totalPins: number;
  usedPins: number;
}

export interface PinUnlockSettings {
  pinUnlockMode: 'per_app' | 'global' | 'global_except';
  excludedAppIds: number[];
}

export interface PinStats {
  date: string;
  todayGenerated: number;
  todayUsed: number;
  yesterdayGenerated: number;
  yesterdayUsed: number;
  totalActive: number;
  totalExpired: number;
}

export interface PlanFeature {
  text: string;
  included: boolean;
  addon?: string;
}

export interface Plan {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  durationDays: number;
  badge?: string;
  subtitle?: string;
  maxApps: number;
  maxAds: number;
  maxSpots?: number;
  isActive: boolean;
  features: PlanFeature[];
  createdAt?: string;
  updatedAt?: string;
  _count?: { purchases: number };
}

export interface User {
  id: number;
  email: string;
  username: string;
  avatar: string | null;
  role: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  purchases?: Purchase[];
  activityLogs?: ActivityLog[];
}

export interface Purchase {
  id: number;
  userId: number;
  planId: number;
  amount: number;
  status: string;
  note: string | null;
  purchasedAt: string;
  expiresAt: string;
  cancelledAt: string | null;
  createdAt?: string;
  user?: { id: number; email: string; username: string };
  plan?: { id: number; name: string; price: number; durationDays: number; currency?: string };
  assignedBy?: { id: number; username: string };
}

export interface ActivityLog {
  id: number;
  userId: number;
  action: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
  user?: { id: number; email: string; username: string };
  performedBy?: { id: number; email: string; username: string };
}

export interface ManageStats {
  totalUsers: number;
  activeUsers: number;
  totalPurchases: number;
  activePurchases: number;
  totalRevenue: number;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: "info" | "update" | "warning";
  isActive: boolean;
  createdAt: string;
}

export interface PlanStatus {
  status: "active" | "expiring_soon" | "grace" | "suspended" | "expired";
  message: string;
  daysLeft: number;
  plan?: { id: number; name: string; price: number; durationDays: number };
  expiresAt?: string;
}
