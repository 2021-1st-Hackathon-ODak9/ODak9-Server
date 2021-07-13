import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export default class CalendarDto {
	@IsNotEmpty()
	@IsString()
	content!: string;

	@IsNotEmpty()
	@IsDateString()
	date!: Date;
}