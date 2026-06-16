import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('profile')
  getProfile(@Req() req: any) {
    return this.gamificationService.getProfile(req.user.id);
  }

  @Get('ranking')
  getRanking() {
    return this.gamificationService.getRanking();
  }

  @Get('badges')
  getBadges() {
    return this.gamificationService.getBadgeMeta();
  }
}
