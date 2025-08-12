import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'

@Injectable()
export class UserService {
    private readonly exportFolder = "./exports";

    getExportStatus(jobId: string){
        const filePath = path.join(this.exportFolder, `${jobId}.xlsx`);
        return {
            status: fs.existsSync(filePath) ? "completed": "processing",
            downloadUrl: `/user/export/download/${jobId}`
        }
    }

    downloadExcel(jobId: string){
        const filePath= path.join(this.exportFolder, `${jobId}.xlsx`);
        if(!fs.existsSync(filePath)) throw new NotFoundException('File not found');
        const file = fs.createReadStream(filePath);
        return new StreamableFile(file)
    }



}
