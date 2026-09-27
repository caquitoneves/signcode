import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { CsrfGuard } from '../auth/guards/csrf.guard';
import type { AuthUser } from '../auth/types';
import { RespondAssessmentDto } from './dto/respond-assessment.dto';
import { SubmitChallengeDto } from './dto/submit-challenge.dto';
import { SubmitCheckpointDto } from './dto/submit-checkpoint.dto';
import { SubmitProjectDto } from './dto/submit-project.dto';
import { ExperienceService } from './experience.service';

@ApiTags('experience')
@Controller()
export class ExperienceController {
  constructor(private readonly experience: ExperienceService) {}

  // Desafios de código
  @Public()
  @Get('challenges/:id')
  @ApiOperation({ summary: 'Desafio de código (sem gabarito; testes rodam no cliente)' })
  getChallenge(@Param('id') id: string) {
    return this.experience.getChallenge(id);
  }

  @Post('challenges/:id/submit')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registra a submissão de um desafio' })
  submitChallenge(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: SubmitChallengeDto,
  ) {
    return this.experience.submitChallenge(user.id, id, dto);
  }

  // Checkpoint
  @Public()
  @Get('checkpoints/:id')
  @ApiOperation({ summary: 'Checkpoint do módulo (sem revelar a alternativa correta)' })
  getCheckpoint(@Param('id') id: string) {
    return this.experience.getCheckpoint(id);
  }

  @Post('checkpoints/:id/attempt')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Envia respostas do checkpoint e recebe a correção' })
  submitCheckpoint(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: SubmitCheckpointDto,
  ) {
    return this.experience.submitCheckpoint(user.id, id, dto);
  }

  // Avaliação diagnóstica
  @Public()
  @Get('courses/:slug/assessment')
  @ApiOperation({ summary: 'Avaliação diagnóstica do curso (ou vazio)' })
  getAssessment(@Param('slug') slug: string) {
    return this.experience.getCourseAssessment(slug);
  }

  @Get('courses/:slug/assessment/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Se o usuário já respondeu o diagnóstico (fase BEFORE)' })
  assessmentStatus(@CurrentUser() user: AuthUser, @Param('slug') slug: string) {
    return this.experience.getAssessmentStatus(user.id, slug);
  }

  @Post('assessments/:id/respond')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registra as respostas do diagnóstico (fase BEFORE/AFTER)' })
  respondAssessment(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: RespondAssessmentDto,
  ) {
    return this.experience.respondAssessment(user.id, id, dto);
  }

  // Projetos
  @Public()
  @Get('projects/:id')
  @ApiOperation({ summary: 'Detalhes de um projeto (mini ou final)' })
  getProject(@Param('id') id: string) {
    return this.experience.getProject(id);
  }

  @Get('projects/:id/submission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Entrega do usuário para o projeto (ou vazio)' })
  getProjectSubmission(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.experience.getProjectSubmission(user.id, id);
  }

  @Post('projects/:id/submit')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Envia a entrega do projeto (repo/link)' })
  submitProject(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: SubmitProjectDto,
  ) {
    return this.experience.submitProject(user.id, id, dto);
  }
}
