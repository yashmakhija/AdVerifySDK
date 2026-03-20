import { prisma } from '../lib/prisma';

export interface PinUnlockSettings {
  pinUnlockMode: 'per_app' | 'global' | 'global_except';
  excludedAppIds: number[];
}

export class SettingsService {
  // Global settings (admin default / fallback for unassigned keys)
  async getSettings(): Promise<PinUnlockSettings> {
    const settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });

    if (!settings) {
      return { pinUnlockMode: 'per_app', excludedAppIds: [] };
    }

    return {
      pinUnlockMode: settings.pinUnlockMode as PinUnlockSettings['pinUnlockMode'],
      excludedAppIds: settings.excludedAppIds,
    };
  }

  async updateSettings(data: PinUnlockSettings) {
    return prisma.globalSettings.upsert({
      where: { id: 1 },
      update: {
        pinUnlockMode: data.pinUnlockMode,
        excludedAppIds: data.excludedAppIds,
      },
      create: {
        id: 1,
        pinUnlockMode: data.pinUnlockMode,
        excludedAppIds: data.excludedAppIds,
      },
    });
  }

  // Per-user settings
  async getUserSettings(userId: number): Promise<PinUnlockSettings> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pinUnlockMode: true, excludedAppIds: true },
    });

    return {
      pinUnlockMode: (user?.pinUnlockMode ?? 'per_app') as PinUnlockSettings['pinUnlockMode'],
      excludedAppIds: user?.excludedAppIds ?? [],
    };
  }

  async updateUserSettings(userId: number, data: PinUnlockSettings) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        pinUnlockMode: data.pinUnlockMode,
        excludedAppIds: data.excludedAppIds,
      },
      select: { pinUnlockMode: true, excludedAppIds: true },
    });
  }
}
