import { Injectable } from '@nestjs/common';
import { MessageDto } from './models/dto/message.dto';

@Injectable()
export class AppService {
  public consumeMessage(messageDto: MessageDto): void {
    console.log(`Message received: ${messageDto}`);
  }
}
