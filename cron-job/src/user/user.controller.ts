import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        @InjectQueue('export') private exportQueue: Queue,
        private readonly userService: UserService,
    ){}


    @Post("export")
    async exportUsers(){
        const job = await this.exportQueue.add("export-users", {}, {
            attempts: 5,
            backoff: {type: 'exponential', delay: 1000}
        });
        return {JobId: job.id}
    }

 /*   function* generatorOne() {
        yield ['a', 'b', 'c'];
      }
      
      function* generatorTwo() {
        yield* ['a', 'b', 'c'];
      }
      
      const one = generatorOne();
      const two = generatorTwo();
      
      console.log(one.next().value);
      console.log(two.next().value);*/
       


    @Get("export/status/:id")
    async getExportStatus(@Param("id") jobId: string){
        return this.userService.getExportStatus(jobId);
    }

    @Get("export/download/:id")
    async download(@Param('id') jobId: string){
        return this.userService.downloadExcel(jobId)
    }


}
