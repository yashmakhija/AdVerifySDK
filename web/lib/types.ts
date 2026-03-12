export interface ApiKey {
  id: number;
  key: string;
  appName: string;
  packageName: string;
  isActive: boolean;
  createdAt: string;
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
