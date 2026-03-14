import { prisma } from '../lib/prisma';

export interface PinUnlockSettings {
  pinUnlockMode: 'per_app' | 'global' | 'global_except';
  excludedAppIds: number[];
}

export class SettingsService {
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
}
