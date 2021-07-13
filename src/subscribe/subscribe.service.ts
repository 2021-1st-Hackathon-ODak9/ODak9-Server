import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Subscribe from 'src/models/Subscribe';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribeService {
	constructor(
		@InjectRepository(Subscribe)
		private readonly subRepository: Repository<Subscribe>
	) { }


}
