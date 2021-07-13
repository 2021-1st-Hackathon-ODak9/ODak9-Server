import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Token } from 'src/lib/tokenDeco';
import AuthGuard from 'src/middleware/auth.middleware';
import Like from 'src/models/Like';
import User from 'src/models/User';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
	constructor(
		private readonly likeService: LikeService,
	) { }

	@Get('/hot')
	@HttpCode(200)
	async getPostByHotGauge() {
		const posts: Like[] = await this.likeService.getPostsByHotGauge();

		return {
			status: 200,
			data: {
				posts
			},
			message: '인기글 조회 성공'
		}
	}

	@Get('/hotlist')
	@HttpCode(200)
	async getPostByHotGaugeList() {
		const posts: Like[] = await this.likeService.getPostsByHotGaugeNoLimit();

		return {
			status: 200,
			data: {
				posts
			},
			message: '좋아요 높은순 조회 성공'
		}
	}

	@Get('/my')
	@UseGuards(new AuthGuard())
	@HttpCode(200)
	async getMyPosts(@Token() user: User) {
		const posts: Like[] = await this.likeService.getPostsByUser(user.id);

		return {
			status: 200,
			data: {
				posts,
			},
			message: '자신이 좋아요 누른 글 조회 성공'
		}
	}
}
