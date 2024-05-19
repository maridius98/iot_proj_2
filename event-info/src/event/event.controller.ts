import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(): any[] {  
    return this.eventService.findAll();
  }

}