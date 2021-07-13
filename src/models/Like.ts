import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity('like')
export default class Like {
	@PrimaryGeneratedColumn()
	idx!: number;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(type => User, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	user!: User | null;

	@RelationId((like: Like) => like.user)
	userId!: string;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(type => Post, {
		onDelete: 'CASCADE'
	})
	post!: Post;

	@RelationId((like: Like) => like.post)
	postIdx!: number;
}