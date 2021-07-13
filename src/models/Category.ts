import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Calendar from "./Calendar";
import DetailCategory from "./DetailCategory";
import DuckMovie from "./DuckMovie";

@Entity('category')
export default class Category {
	@PrimaryGeneratedColumn()
	idx!: number;

	@Column()
	name!: string;

	@OneToMany(type => Calendar, calendar => calendar.category)
	calendar!: Calendar[];

	@OneToMany(type => DetailCategory, detailCategory => detailCategory.category)
	detailCategory!: DetailCategory[];

	@OneToMany(type => DuckMovie, duckMovie => duckMovie.category)
	duckMovie!: DuckMovie[];
}