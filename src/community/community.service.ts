import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/models/Category';
import Post from 'src/models/Post';
import User from 'src/models/User';
import { Repository } from 'typeorm';
import PostDto from './dto/post.dto';

@Injectable()
export class CommunityService {
	constructor(
		@InjectRepository(Post)
		private readonly comRepository: Repository<Post>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Category)
		private readonly cateRepository: Repository<Category>,
	) { }

	public async getPosts(): Promise<Post[]> {
		const posts: Post[] = await this.comRepository.createQueryBuilder('post')
			.leftJoinAndSelect('post.user', 'user')
			.leftJoinAndSelect('post.category', 'category')
			.orderBy('post.idx', 'DESC')
			.getMany();

		return posts;
	}

	public async searchPost(word: string): Promise<Post[]> {
		const posts: Post[] = await this.comRepository.createQueryBuilder('post')
			.leftJoinAndSelect('post.user', 'user')
			.leftJoinAndSelect('post.category', 'category')
			.where('title LIKE :word', { word: `%${word}%` })
			.orderBy('post.idx', 'DESC')
			.getMany();

		return posts;
	}

	public async getPostsByCategory(categoryIdx: number): Promise<Post[]> {
		const posts: Post[] = await this.comRepository.createQueryBuilder('post')
			.leftJoinAndSelect('post.user', 'user')
			.leftJoinAndSelect('post.category', 'category')
			.where('fk_category_idx = :categoryIdx', { categoryIdx })
			.orderBy('post.idx', 'DESC')
			.getMany();

		return posts;
	}

	// public async getPostsSortByDate(): Promise<Post[]> {
	// 	const posts: Post[] = await this.comRepository.createQueryBuilder()

	// }

	public async getPost(postIdx: number): Promise<Post | undefined> {
		const post: Post = await this.comRepository.findOne({
			where: {
				idx: postIdx
			}
		})

		return post;
	}

	public async addPost(postDto: PostDto, user: User): Promise<void> {
		const { title, content, categoryIdx } = postDto;
		const isUser: User = await this.userRepository.findOne({
			where: {
				id: user.id,
				pw: user.pw,
			}
		});

		const isCategory: Category = await this.cateRepository.findOne({
			where: {
				idx: categoryIdx,
			}
		});

		if (isCategory === undefined) {
			throw new BadRequestException('잘못된 categoryIdx');
		}

		const post: Post = new Post();
		post.title = title;
		post.content = content;
		post.category = isCategory;
		post.user = user;

		await this.comRepository.save(post);
	}

	public async updatePost(postDto: PostDto, user: User, postIdx: number): Promise<void> {
		const isPost: Post | undefined = await this.getPost(postIdx);

		if (isPost === undefined) {
			throw new BadRequestException('존재하지 않는 게시글');
		}

		const { title, content, categoryIdx } = postDto;
		const isUser: User = await this.userRepository.findOne({
			where: {
				id: user.id,
				pw: user.pw,
			}
		});

		if (isPost.userId !== user.id) {
			throw new UnauthorizedException('본인이 쓴 게시물이 아닙니다')
		}

		const isCategory: Category = await this.cateRepository.findOne({
			where: {
				idx: categoryIdx,
			}
		});

		if (isCategory === undefined) {
			throw new BadRequestException('잘못된 categoryIdx');
		}

		await this.comRepository.merge(isPost, {
			title: title,
			content: content,
			category: isCategory,
		});
		await this.comRepository.save(isPost);
	}

	public async deletePost(user: User, postIdx: number): Promise<void> {
		const isPost: Post | undefined = await this.getPost(postIdx);

		if (isPost === undefined) {
			throw new BadRequestException('존재하지 않는 게시글');
		}

		if (isPost.userId !== user.id) {
			throw new UnauthorizedException('본인이 쓴 게시물이 아닙니다')
		}

		await this.comRepository.remove(isPost);
	}
}