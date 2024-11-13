import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ResponseDto } from './models/dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'microservice-2',
    queue: 'microservice-2-queue',
  })
  public async pubSubHandler(data: any) {

    this.appService.consumeMessage(data.numberInteger);

    let response : ResponseDto;

    response.isPair = data.numberInteger % 2 === 0;
    response.isPrime = this.isPrime(data.numberInteger);
    response.factorial = this.factorialize(data.numberInteger);
    response.sumN  =  this.sumNf(data.numberInteger);
    response.fibonnacci = this.generateFibonacci(data.numberInteger);

    console.log('Result: ' , response);
  }

  isPrime(num) { if (num <= 1) return false; if (num === 2) return true; let numSqrt = Math.sqrt(num); for (let i=2; i<=numSqrt; i++) { if (num%i === 0) return false; } return true; }
  
  factorialize(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * this.factorialize(num - 1));
    }
  }

  sumNf(num){
    var sumN = 0;
    for(var indice = 0; indice<num ; indice++){
      sumN+=indice;
    }
    return sumN;
  }

  generateFibonacci(length: number): number[] {
    if (length <= 0) return [];

    let series = [0, 1];
    for (let i = 2; i < length; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }

    return length === 1 ? [0] : series;
}

}
