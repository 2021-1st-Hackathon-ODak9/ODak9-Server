import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Category from "./Category";
import Comment from "./Comment";
import Like from "./Like";
import User from "./User";

@Entity('post')
export default class Post {
    @PrimaryGeneratedColumn()
    idx!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @JoinColumn({ name: 'fk_user_id' })
    @ManyToOne(type => User, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    user!: User | null;

    @RelationId((post: Post) => post.user)
    userId!: string;

    @JoinColumn({ name: 'fk_category_idx' })
    @ManyToOne(type => Category, {
        onDelete: 'CASCADE'
    })
    category!: Category;

    @RelationId((post: Post) => post.category)
    categoryIdx!: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt!: Date;

    @OneToMany(type => Like, like => like.post)
    like!: Like[];

    @OneToMany(type => Comment, comment => comment.post)
    comment!: Comment[];
}