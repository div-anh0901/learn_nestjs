import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { writeFile } from 'fs/promises';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);
    @Cron(CronExpression.EVERY_10_SECONDS)
    async generateReport(){
      this.logger.log("Starting scheduled report job...");
      const maxRetries = 3;
      let attempt = 0;

      while(attempt < maxRetries){
        try {
          attempt++;
          this.logger.log(`Attempt ${attempt}: fetching report data...`);
          const report = await this.fetchData();
          const fileName = `report-${Date.now()}.json`;
  
          await writeFile(fileName, JSON.stringify(report, null, 2));
          this.logger.log(`Reported saved to ${fileName}`);
          break;
        } catch (error) {
          this.logger.warn(`Attempt ${attempt} failed: ${error.message}`)
          if(attempt == maxRetries){
            this.logger.error('All attempts failed. Job aborted')
          }
        }
      }
  }
  async fetchData(): Promise<any> {
    if (Math.random() > 0.5) {
      throw new Error('Simulated data fetch failure');
    }

    return {
      timestamp: new Date().toISOString(),
      status: 'success',
      data: {
        users: Math.floor(Math.random() * 1000),
        revenue: (Math.random() * 10000).toFixed(2),
      }
    };
  }

}
