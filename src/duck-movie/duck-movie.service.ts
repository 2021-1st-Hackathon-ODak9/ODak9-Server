import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DuckMovie from 'src/models/DuckMovie';
import User from 'src/models/User';
import { Repository } from 'typeorm';
import DuckMovieDto from './dto/duckMovie.dto';

const joinMemberAttr = 'idx, apply_member_id AS applyMemberId, name, thumbnail, '
  + 'video_title AS videoTitle, video_id AS videoId, video_url AS videoUrl, '
  + 'channel_title AS channelTitle, submit_date AS submitDate, duration';

@Injectable()
export class DuckMovieService {
  constructor(
    @InjectRepository(DuckMovie)
    private readonly duckMovieRepository: Repository<DuckMovie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  public async getPost(duckMovieIdx: number): Promise<DuckMovie | undefined> {
    const duckMovie: DuckMovie = await this.duckMovieRepository.findOne({
      where: {
        idx: duckMovieIdx
      }
    })

    return duckMovie;
  }

  public async setSingleApply(userId: string, submitDate: Date): Promise<DuckMovie[]> {
    const applies: DuckMovie[] = await this.duckMovieRepository.createQueryBuilder('duck_movie')
      .leftJoinAndSelect('duck_movie.user', 'user')
      .where('fk_user_id = :userId', { userId })
      .andWhere('submit_date >= :submitDate', { submitDate })
      .getMany();

    return applies;
  }

  public async getUserVideoList(userId: string): Promise<DuckMovie[]> {
    const duckMovies: DuckMovie[] = await this.duckMovieRepository.createQueryBuilder('duck_movie')
      .select(`${joinMemberAttr}`)
      .from(DuckMovie, 'duck_movie')
      .leftJoinAndSelect('duck_movie.user', 'user')
      .where('fk_user_id = :userId', { userId })
      .getMany();

    return duckMovies;
  }

  public async createVideo(duckMovieDto: DuckMovieDto, user: User): Promise<void> {
    const {
      applyUserId, thumbnail, videoTitle, videoId,
      videoUrl, channelTitle, duration } = duckMovieDto;
    const isUser: User = await this.userRepository.findOne({
      where: {
        id: user.id,
        pw: user.pw,
      }
    });

    const duckMovie: DuckMovie = new DuckMovie();
    duckMovie.userId = applyUserId;
    duckMovie.thumbnail = thumbnail;
    duckMovie.videoTitle = videoTitle;
    duckMovie.videoId = videoId;
    duckMovie.videoUrl = videoUrl;
    duckMovie.channelTitle = channelTitle;
    duckMovie.duration = duration;

    await this.duckMovieRepository.save(duckMovie);
  }

  public async deleteVideo(duckMovieIdx)
}
