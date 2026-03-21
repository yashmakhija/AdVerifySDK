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
  async getUserSettings(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        pinUnlockMode: true,
        excludedAppIds: true,
        shortenerApiUrl: true,
        shortenerApiSecret: true,
        shortenerFrontendUrl: true,
      },
    });

    return {
      pinUnlockMode: (user?.pinUnlockMode ?? 'per_app') as PinUnlockSettings['pinUnlockMode'],
      excludedAppIds: user?.excludedAppIds ?? [],
      shortenerApiUrl: user?.shortenerApiUrl ?? '',
      shortenerApiSecret: user?.shortenerApiSecret ?? '',
      shortenerFrontendUrl: user?.shortenerFrontendUrl ?? '',
    };
  }

  async updateUserSettings(userId: number, data: Partial<PinUnlockSettings & {
    shortenerApiUrl?: string;
    shortenerApiSecret?: string;
    shortenerFrontendUrl?: string;
  }>) {
    const updateData: any = {};
    if (data.pinUnlockMode !== undefined) updateData.pinUnlockMode = data.pinUnlockMode;
    if (data.excludedAppIds !== undefined) updateData.excludedAppIds = data.excludedAppIds;
    if (data.shortenerApiUrl !== undefined) updateData.shortenerApiUrl = data.shortenerApiUrl;
    if (data.shortenerApiSecret !== undefined) updateData.shortenerApiSecret = data.shortenerApiSecret;
    if (data.shortenerFrontendUrl !== undefined) updateData.shortenerFrontendUrl = data.shortenerFrontendUrl;

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        pinUnlockMode: true,
        excludedAppIds: true,
        shortenerApiUrl: true,
        shortenerApiSecret: true,
        shortenerFrontendUrl: true,
      },
    });
  }
}
