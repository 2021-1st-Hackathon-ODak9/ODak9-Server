import { Controller, Get, HttpCode } from '@nestjs/common';
import Like from 'src/models/Like';
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
}
