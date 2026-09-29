import { Injectable } from '@nestjs/common';
import type { Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateProfileDto } from './dto/update-profile.dto';

export interface ProfileView {
  name: string | null;
  username: string | null;
  bio: string | null;
  pronouns: string | null;
  city: string | null;
  learningGoal: string | null;
  theme: string;
  emailReminders: boolean;
  weeklySummary: boolean;
  courseRecommendations: boolean;
}

function toView(name: string | null, p: Profile): ProfileView {
  return {
    name,
    username: p.username,
    bio: p.bio,
    pronouns: p.pronouns,
    city: p.city,
    learningGoal: p.learningGoal,
    theme: p.theme,
    emailReminders: p.emailReminders,
    weeklySummary: p.weeklySummary,
    courseRecommendations: p.courseRecommendations,
  };
}

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /** Garante que o perfil exista (1:1 com o usuário). */
  private ensure(userId: string): Promise<Profile> {
    return this.prisma.profile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  }

  async get(userId: string): Promise<ProfileView> {
    const [user, profile] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { name: true } }),
      this.ensure(userId),
    ]);
    return toView(user.name, profile);
  }

  async update(userId: string, dto: UpdateProfileDto): Promise<ProfileView> {
    await this.ensure(userId);
    const { name, ...profileData } = dto;
    const [user, profile] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: name !== undefined ? { name } : {},
        select: { name: true },
      }),
      this.prisma.profile.update({ where: { userId }, data: profileData }),
    ]);
    return toView(user.name, profile);
  }
}
