import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Like from 'src/models/Like';
import Post from 'src/models/Post';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Post])
  ],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule { }
