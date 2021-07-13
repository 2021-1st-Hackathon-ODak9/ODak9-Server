import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Like from 'src/models/Like';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
	constructor(
		@InjectRepository(Like)
		private readonly likeRepository: Repository<Like>,
	) { }

	public async getPostsByHotGauge(): Promise<Like[]> {
		const posts: Like[] = await this.likeRepository.createQueryBuilder('like')
			.select('pst.title', 'title')
			.addSelect('pst.content', 'content')
			.addSelect('pst.idx', 'postIdx')
			.addSelect('COUNT(*) AS countLike')
			.leftJoin('like.post', 'pst')
			.limit(3)
			.groupBy('like.post')
			.orderBy('countLike', 'DESC')
			.getRawMany();

		return posts;
	}

	public async getPostsByUser(userId: string): Promise<Like[]> {
		const posts: Like[] = await this.likeRepository.createQueryBuilder('like')
			.leftJoinAndSelect('like.post', 'post')
			.where('like.fk_user_id = :userId', { userId })
			.getMany();

		return posts;
	}

	public async getPostsByHotGaugeNoLimit(): Promise<Like[]> {
		const posts: Like[] = await this.likeRepository.createQueryBuilder('like')
			.select('pst.title', 'title')
			.addSelect('pst.content', 'content')
			.addSelect('pst.idx', 'postIdx')
			.addSelect('COUNT(*) AS countLike')
			.leftJoin('like.post', 'pst')
			.groupBy('like.post')
			.orderBy('countLike', 'DESC')
			.getRawMany();

		return posts;
	}
}
