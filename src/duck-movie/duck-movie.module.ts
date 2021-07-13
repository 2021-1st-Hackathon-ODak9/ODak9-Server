import { Module } from '@nestjs/common';
import { DuckMovieService } from './duck-movie.service';

@Module({
  providers: [DuckMovieService]
})
export class DuckMovieModule {}
