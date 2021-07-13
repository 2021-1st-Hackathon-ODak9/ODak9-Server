import { IsNotEmpty, IsString } from "class-validator";

export default class DuckMovieDto {
  @IsString()
  @IsNotEmpty()
  applyUserId!: string;

  @IsString()
  @IsNotEmpty()
  thumbnail!: string;

  @IsString()
  @IsNotEmpty()
  videoTitle!: string;

  @IsString()
  @IsNotEmpty()
  videoId!: string;

  @IsString()
  @IsNotEmpty()
  videoUrl!: string;

  @IsString()
  @IsNotEmpty()
  channelTitle!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;
}