import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import AuthGuard, * as authMiddleware from 'src/middleware/auth.middleware';
import PostEntity from 'src/models/Post';
import PostDto from './dto/post.dto';
import { Token } from 'src/lib/tokenDeco';
import User from 'src/models/User';

@Controller('community')
export class CommunityController {
	constructor(
		private readonly comService: CommunityService,
	) { }

	@Get('/')
	@HttpCode(200)
	async getPosts() {
		const post: PostEntity[] = await this.comService.getPosts();

		return {
			status: 200,
			data: {
				post,
			},
			message: '글 조회 성공'
		}
	}

	@Get('/search')
	@HttpCode(200)
	async searchPosts(@Query('title') title: string) {
		const post: PostEntity[] = await this.comService.searchPost(title);

		return {
			status: 200,
			data: {
				post,
			},
			message: '글 검색 성공'
		}
	}

	@Get('/category/:userIdx')
	@HttpCode(200)
	async getPostsByCategory(@Param('userIdx') categoryIdx: number) {
		const post: PostEntity[] = await this.comService.getPostsByCategory(categoryIdx);

		return {
			status: 200,
			data: {
				post,
			},
			message: '글 조회 성공(by category)'
		}
	}

	@Get('/sort')
	@HttpCode(200)
	async getPostsSort() {
		const posts: PostEntity[] = await this.comService.getPostsSortByDate();

		return {
			status: 200,
			data: {
				posts,
			},
			message: '정렬'
		}
	}

	@Get('/my')
	@UseGuards(new AuthGuard())
	@HttpCode(200)
	async getMyPosts(@Token() user: User) {
		const posts: PostEntity[] = await this.comService.getMyPosts(user);

		return {
			status: 200,
			data: {
				posts,
			},
			message: '자신의 글 조회 성공'
		}
	}

	@Post('/')
	@UseGuards(new AuthGuard())
	@HttpCode(200)
	async addPost(@Token() user: User, @Body() postDto: PostDto) {
		await this.comService.addPost(postDto, user);

		return {
			status: 200,
			message: '글 작성 성공'
		}
	}

	@Put('/:idx')
	@UseGuards(new AuthGuard())
	@HttpCode(200)
	async updatePost(@Token() user: User, @Body() postDto: PostDto, @Param('idx') postIdx: number) {
		await this.comService.updatePost(postDto, user, postIdx);

		return {
			status: 200,
			message: '글 수정 성공'
		}
	}

	@Delete('/:idx')
	@UseGuards(new AuthGuard())
	@HttpCode(200)
	async deletePost(@Token() user: User, @Param('idx') postIdx: number) {
		await this.comService.deletePost(user, postIdx);

		return {
			status: 200,
			message: '글 삭제 성공'
		}
	}
}