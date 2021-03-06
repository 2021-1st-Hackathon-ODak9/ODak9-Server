import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Subscribe from 'src/models/Subscribe';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe])],
  controllers: [SubscribeController],
  providers: [SubscribeService]
})
export class SubscribeModule { }
