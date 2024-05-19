import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  private readonly events: any[] = [];  

  findAll(): any[] {  
    return this.events;
  }

}