import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { CsrfGuard } from '../auth/guards/csrf.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthUser } from '../auth/types';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { ExercisesService } from './exercises.service';

@ApiTags('exercises')
@Controller()
export class ExercisesController {
  constructor(private readonly exercises: ExercisesService) {}

  @Public()
  @Get('lessons/:id/exercises')
  @ApiOperation({ summary: 'Exercícios de uma aula (sem revelar respostas)' })
  list(@Param('id') id: string) {
    return this.exercises.listForLesson(id);
  }

  @Post('exercises/:id/submit')
  @UseGuards(CsrfGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Envia resposta e recebe feedback' })
  submit(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: SubmitAnswerDto) {
    return this.exercises.submit(user.id, id, dto);
  }

  @Post('admin/lessons/:id/exercises')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria um exercício na aula (admin)' })
  create(@Param('id') id: string, @Body() dto: CreateExerciseDto) {
    return this.exercises.createForLesson(id, dto);
  }
}
