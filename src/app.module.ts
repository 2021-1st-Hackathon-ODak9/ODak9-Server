import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormConfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './community/community.module';
import { DuckMovieModule } from './duck-movie/duck-movie.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, CommunityModule, DuckMovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
