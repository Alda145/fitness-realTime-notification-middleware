import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsController } from './highlights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighlightsEntity } from './Entity/Highlights.Entity';

@Module({
  imports:[TypeOrmModule.forFeature([HighlightsEntity])],
  providers: [HighlightsService],
  controllers: [HighlightsController]
})
export class HighlightsModule {}
