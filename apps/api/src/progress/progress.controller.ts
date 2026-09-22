import { Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CsrfGuard } from '../auth/guards/csrf.guard';
import type { AuthUser } from '../auth/types';
import { ProgressService } from './progress.service';

@ApiTags('progress')
@ApiBearerAuth()
@Controller()
export class ProgressController {
  constructor(private readonly progress: ProgressService) {}

  @Post('courses/:slug/enroll')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Matricula o usuário no curso' })
  enroll(@CurrentUser() user: AuthUser, @Param('slug') slug: string) {
    return this.progress.enroll(user.id, slug);
  }

  @Get('courses/:slug/progress')
  @ApiOperation({ summary: 'Progresso do usuário no curso' })
  courseProgress(@CurrentUser() user: AuthUser, @Param('slug') slug: string) {
    return this.progress.getCourseProgress(user.id, slug);
  }

  @Post('lessons/:id/complete')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Marca a aula como concluída (matricula se necessário)' })
  complete(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.progress.completeLesson(user.id, id);
  }

  @Delete('lessons/:id/complete')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Desmarca a conclusão da aula' })
  uncomplete(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.progress.uncompleteLesson(user.id, id);
  }

  @Get('me/dashboard')
  @ApiOperation({ summary: 'Painel do aluno: cursos matriculados com progresso' })
  dashboard(@CurrentUser() user: AuthUser) {
    return this.progress.getDashboard(user.id);
  }
}
