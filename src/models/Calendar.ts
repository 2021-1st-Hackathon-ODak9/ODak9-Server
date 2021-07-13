import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Category from "./Category";

@Entity('calendar')
export default class Calendar {
	@PrimaryGeneratedColumn()
	idx!: number;

	@Column()
	content!: string;

	@Column()
	date!: Date;

	@JoinColumn({ name: 'fk_category_idx' })
	@ManyToOne(type => Category, {
		onDelete: 'CASCADE'
	})
	category!: Category;

	@RelationId((calendar: Calendar) => calendar.category)
	categoryIdx!: number;
}