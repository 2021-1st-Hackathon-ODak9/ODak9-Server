import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId
} from "typeorm";
import User from './user';

/**
 * @description 덕무비
 * @author 박지나
 */
@Entity('duck_movie')
export default class DuckMovie {
  @PrimaryColumn({ name: 'idx' })
  idx!: number;

  @RelationId((user: User) => user.id)
  userId!: string;

  @JoinColumn({ name: 'fk_user_id' })
  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @Column({ name: 'thumbnail' })
  thumbnail!: string;

  @Column({ name: 'video_title' })
  videoTitle!: string;

  @Column({ name: 'video_id' })
  videoId!: string;

  @Column({ name: 'video_url' })
  videoUrl!: string;

  @Column({ name: 'duration' })
  duration!: string;

  @Column({ name: 'channel_title' })
  channelTitle!: string;

  @Column({ name: 'submit_date' })
  submitDate!: Date;
}