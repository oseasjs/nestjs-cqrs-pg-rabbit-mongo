import { HttpService, Injectable, Logger, HttpException } from '@nestjs/common';
import { vars } from '../config/vars';

@Injectable()
export class UserProducerSyncService {
  
  private logger = new Logger('UserProducerSyncService');  

  constructor(
    private httpService: HttpService
    ) {

  }

  async sendStatus(id: number, seed: string, status: string) : Promise<void> {

    await this.httpService
      .post(vars.processUrlSyncStatus.replace(':id', id.toString()), {status, seed})
      .toPromise()
      .catch(e => {
        this.logger.error('ERROR sendStatus to processor: ', e);
        throw new HttpException(e.response.data, e.response.status);
      });

  }

}
