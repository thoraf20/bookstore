import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
