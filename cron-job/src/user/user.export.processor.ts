import { Process,Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

@Processor("export")
export class UserExportProcessor{
    @Process("export-users")
    async handlExport(job: Job){
        console.log(`Processing export job [${job.id}] attempt #${job.attemptsMade + 1}`);
        // 👇 Ensure folder exists
        const exportDir = path.resolve('./exports');
        if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir, { recursive: true });
        }

        // Simulate random failure
        if (Math.random() < 0.3) throw new Error('Random export failure!');

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Users');
         // Sample user data
        const users = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
        ];
    
        sheet.columns = [
            { header: 'ID', key: 'id' },
            { header: 'Name', key: 'name' },
        ];
    
        users.forEach((user) => {
            sheet.addRow(user);
        });
    
        const exportPath = `./exports/${job.id}.xlsx`;
        await workbook.xlsx.writeFile(exportPath);
        console.log(`Export job [${job.id}] completed.`);
    }
}