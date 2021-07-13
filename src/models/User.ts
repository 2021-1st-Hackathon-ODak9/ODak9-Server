import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Comment from "./Comment";
import Like from "./Like";
import Post from "./Post";
import Subscribe from "./Subscribe";

@Entity('user')
export default class User {
	@PrimaryColumn()
	id!: string;

	@Column()
	pw!: string;

	@Column()
	name!: string;

	@Column()
	nickName!: string;

	@OneToMany(type => Comment, comment => comment.user)
	comment!: Comment[];

	@OneToMany(type => Like, like => like.user)
	like!: Like[];

	@OneToMany(type => Post, post => post.user)
	post!: Post[];

	@OneToMany(type => Subscribe, subscribe => subscribe.user)
	subscribe!: Subscribe[];
}