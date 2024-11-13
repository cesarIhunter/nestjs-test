import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './models/dto/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() messageDto: MessageDto) {

    if(!Number.isInteger(messageDto.numberInteger) || 
        messageDto.numberInteger === undefined ||
        messageDto.numberInteger === null){
      return { response: 'No es un número entero positivo.' }
    }
    return this.appService.publishMessage(messageDto);
  }
}
