import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Category from "./Category";
import DetailCategory from "./DetailCategory";
import User from "./User";

@Entity('subscribe')
export default class Subscribe {
	@PrimaryGeneratedColumn()
	idx!: number;

	@JoinColumn({ name: 'fk_user_idx' })
	@ManyToOne(type => User, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	user!: User | null;

	@RelationId((subscribe: Subscribe) => subscribe.user)
	userId!: string;

	@JoinColumn({ name: 'fk_category_idx' })
	@ManyToOne(type => Category, {
		onDelete: 'CASCADE'
	})
	category!: Category;

	@RelationId((subsribe: Subscribe) => subsribe.category)
	categoryidx!: number;
}