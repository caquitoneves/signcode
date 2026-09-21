import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { UpsertLessonTranslationDto } from './dto/upsert-lesson-translation.dto';
import { UpsertLessonVideoDto } from './dto/upsert-lesson-video.dto';
import { CreateLessonMaterialDto } from './dto/create-lesson-material.dto';
import { isSupportedLanguage } from './languages';

@ApiTags('admin-content')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminContentController {
  constructor(private readonly courses: CoursesService) {}

  @Get('courses/:id')
  @ApiOperation({ summary: 'Curso completo (inclui rascunhos) para edição' })
  getCourse(@Param('id') id: string) {
    return this.courses.getCourseForAdmin(id);
  }

  @Post('courses')
  createCourse(@Body() dto: CreateCourseDto) {
    return this.courses.createCourse(dto);
  }

  @Patch('courses/:id')
  @ApiOperation({ summary: 'Atualiza curso (inclui publicar via status)' })
  updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courses.updateCourse(id, dto);
  }

  @Post('courses/:courseId/modules')
  createModule(@Param('courseId') courseId: string, @Body() dto: CreateModuleDto) {
    return this.courses.createModule(courseId, dto);
  }

  @Patch('modules/:id')
  updateModule(@Param('id') id: string, @Body() dto: UpdateModuleDto) {
    return this.courses.updateModule(id, dto);
  }

  @Post('modules/:moduleId/lessons')
  createLesson(@Param('moduleId') moduleId: string, @Body() dto: CreateLessonDto) {
    return this.courses.createLesson(moduleId, dto);
  }

  @Patch('lessons/:id')
  updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.courses.updateLesson(id, dto);
  }

  @Put('lessons/:id/translations/:lang')
  @ApiOperation({ summary: 'Cria/atualiza a tradução de uma aula (ex.: pt-BR, libras)' })
  upsertTranslation(
    @Param('id') id: string,
    @Param('lang') lang: string,
    @Body() dto: UpsertLessonTranslationDto,
  ) {
    this.assertLang(lang);
    return this.courses.upsertTranslation(id, lang, dto);
  }

  @Put('lessons/:id/videos/:lang')
  @ApiOperation({ summary: 'Cria/atualiza o vídeo de uma aula por idioma (libras é 1ª classe)' })
  upsertVideo(
    @Param('id') id: string,
    @Param('lang') lang: string,
    @Body() dto: UpsertLessonVideoDto,
  ) {
    this.assertLang(lang);
    return this.courses.upsertVideo(id, lang, dto);
  }

  @Post('lessons/:id/materials')
  addMaterial(@Param('id') id: string, @Body() dto: CreateLessonMaterialDto) {
    return this.courses.addMaterial(id, dto);
  }

  private assertLang(lang: string): void {
    if (!isSupportedLanguage(lang)) {
      throw new BadRequestException(`Idioma não suportado: ${lang}`);
    }
  }
}
