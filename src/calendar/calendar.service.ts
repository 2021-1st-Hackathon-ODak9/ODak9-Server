import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Calendar from 'src/models/Calendar';
import { Repository } from 'typeorm';
import CalendarDto from './dto/calendarDto';

@Injectable()
export class CalendarService {
	constructor(
		@InjectRepository(Calendar)
		private readonly calRepository: Repository<Calendar>
	) { }

	public async getCalendars(): Promise<Calendar[]> {
		const calendar: Calendar[] = await this.calRepository.createQueryBuilder()
			.where('date > LAST_DAY(NOW() - interval 1 month) AND 날짜필드 <= LAST_DAY(NOW())')
			.getMany();

		return calendar;
	}

	public async addCalendar(calendarDto: CalendarDto): Promise<void> {
		const calendar: Calendar = new Calendar()
		calendar.content = calendarDto.content;
		calendar.date = calendarDto.date;

		await this.calRepository.save(calendar);
	}
}