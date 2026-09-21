import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { CoursesService } from './courses.service';

@ApiTags('catalog')
@Controller()
export class CatalogController {
  constructor(private readonly courses: CoursesService) {}

  @Public()
  @Get('courses')
  @ApiOperation({ summary: 'Lista cursos publicados' })
  listCourses() {
    return this.courses.listPublishedCourses();
  }

  @Public()
  @Get('courses/:slug')
  @ApiOperation({ summary: 'Curso publicado, com módulos e aulas (títulos por idioma)' })
  getCourse(@Param('slug') slug: string) {
    return this.courses.getPublishedCourseBySlug(slug);
  }

  @Public()
  @Get('lessons/:id')
  @ApiOperation({ summary: 'Conteúdo completo da aula (traduções, vídeos, materiais)' })
  getLesson(@Param('id') id: string) {
    return this.courses.getLesson(id);
  }
}
