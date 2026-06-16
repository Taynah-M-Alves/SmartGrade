import { Injectable } from '@nestjs/common';
import { Badge } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

const XP_RULES = {
  GRADE_ABOVE_5: 30,
  GRADE_ABOVE_7: 20,
  GRADE_ABOVE_9: 30,
  BEFORE_DEADLINE: 15,
  BADGE_EARNED: 25,
};

const BADGE_META: Record<Badge, { emoji: string; label: string; description: string }> = {
  PRIMEIRA_ENTREGA: { emoji: '🏆', label: 'Primeira Entrega', description: 'Enviou sua primeira atividade' },
  NOTA_MAXIMA: { emoji: '⭐', label: 'Nota Máxima', description: 'Recebeu nota máxima em uma atividade' },
  CINCO_ATIVIDADES: { emoji: '📚', label: 'Cinco Atividades', description: 'Enviou 5 atividades' },
  ANTES_DO_PRAZO: { emoji: '⚡', label: 'Antes do Prazo', description: 'Entregou antes do prazo' },
  ALUNO_DEDICADO: { emoji: '🎯', label: 'Aluno Dedicado', description: 'Enviou 10 atividades' },
  ESPECIALISTA: { emoji: '🚀', label: 'Especialista', description: 'Média das notas acima de 9' },
};

@Injectable()
export class GamificationService {
  constructor(private readonly prisma: PrismaService) {}

  async processAfterEvaluation(
    userId: number,
    grade: number,
    submissionCreatedAt: Date,
    taskDeadline: Date,
  ): Promise<void> {
    let xpGained = 0;
    const badgesToGrant: Badge[] = [];

    // XP por nota
    if (grade > 5) xpGained += XP_RULES.GRADE_ABOVE_5;
    if (grade > 7) xpGained += XP_RULES.GRADE_ABOVE_7;
    if (grade > 9) xpGained += XP_RULES.GRADE_ABOVE_9;

    // XP por entrega antes do prazo
    const beforeDeadline = submissionCreatedAt < taskDeadline;
    if (beforeDeadline) xpGained += XP_RULES.BEFORE_DEADLINE;

    // Badges a verificar nesta submissão
    if (beforeDeadline) badgesToGrant.push('ANTES_DO_PRAZO');
    if (grade >= 10) badgesToGrant.push('NOTA_MAXIMA');

    // Badges baseados no histórico total do aluno
    const totalSubmissions = await this.prisma.taskSubmission.count({
      where: { userId, status: 'FINALIZADO' },
    });

    if (totalSubmissions === 1) badgesToGrant.push('PRIMEIRA_ENTREGA');
    if (totalSubmissions >= 5) badgesToGrant.push('CINCO_ATIVIDADES');
    if (totalSubmissions >= 10) badgesToGrant.push('ALUNO_DEDICADO');

    // Badge Especialista: média das notas > 9
    const allGrades = await this.prisma.taskSubmission.findMany({
      where: { userId, status: 'FINALIZADO', aiGrade: { not: null } },
      select: { aiGrade: true, professorGrade: true },
    });
    if (allGrades.length > 0) {
      const avg =
        allGrades.reduce((acc, s) => acc + (s.professorGrade ?? s.aiGrade ?? 0), 0) /
        allGrades.length;
      if (avg > 9) badgesToGrant.push('ESPECIALISTA');
    }

    // Conceder badges (ignora duplicatas pelo @@unique)
    let badgesEarned = 0;
    for (const badge of badgesToGrant) {
      try {
        await this.prisma.userAchievement.create({
          data: { userId, badge },
        });
        badgesEarned++;
      } catch {
        // badge já conquistado — ignora constraint unique
      }
    }

    // XP de badges conquistados agora
    xpGained += badgesEarned * XP_RULES.BADGE_EARNED;

    // Incrementar XP do usuário
    if (xpGained > 0) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: xpGained } },
      });
    }
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, xp: true },
    });

    const achievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      orderBy: { earnedAt: 'asc' },
    });

    return {
      ...user,
      achievements: achievements.map((a) => ({
        badge: a.badge,
        earnedAt: a.earnedAt,
        ...BADGE_META[a.badge],
      })),
    };
  }

  async getRanking() {
    const users = await this.prisma.user.findMany({
      where: { role: 'ALUNO' },
      orderBy: { xp: 'desc' },
      select: { id: true, name: true, xp: true },
      take: 50,
    });

    return users.map((u, index) => ({
      position: index + 1,
      id: u.id,
      name: u.name,
      xp: u.xp,
    }));
  }

  getBadgeMeta() {
    return Object.entries(BADGE_META).map(([badge, meta]) => ({
      badge,
      ...meta,
    }));
  }
}
