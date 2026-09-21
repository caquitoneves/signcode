import { Module } from '@nestjs/common';
import { AdminContentController } from './admin-content.controller';
import { CatalogController } from './catalog.controller';
import { CoursesService } from './courses.service';

@Module({
  controllers: [CatalogController, AdminContentController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
