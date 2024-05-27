import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class EventService {
  private readonly events: any[] = [];

  constructor() {
    const client  = mqtt.connect('mqtt://mosquitto')

    client.on('connect', () => {
      console.log('connected to MQTT broker');
      client.subscribe('eventinfo/topic');
    });

    client.on('message', (topic, message) => {
      const event = JSON.parse(message.toString());
      this.events.push(event);
    });
  }

  findAll(): any[] { 
    return this.events;
  }

}