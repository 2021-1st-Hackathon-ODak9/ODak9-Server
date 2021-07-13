import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import Calendar from 'src/models/Calendar';
import { CalendarService } from './calendar.service';
import CalendarDto from './dto/calendarDto';

@Controller('calendar')
export class CalendarController {
	constructor(
		private readonly calService: CalendarService,
	) { }

	@Get('/')
	@HttpCode(200)
	async getCalendar() {
		const calendar: Calendar[] = await this.calService.getCalendars();

		return {
			status: 200,
			data: {
				calendar
			},
			message: '일정 전체 조회 성공'
		}
	}

	@Post('/')
	@HttpCode(200)
	async addCalendar(@Body() calendarDto: CalendarDto) {
		await this.calService.addCalendar(calendarDto);

		return {
			status: 200,
			message: '일정 생성 성공'
		}
	}
}
