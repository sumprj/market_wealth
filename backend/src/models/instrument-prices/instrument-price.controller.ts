import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { InstrumentPricesService } from './instrument-prices.service';
import { parse } from 'papaparse';
import { formatInstrumentData } from 'src/utils/formatInstrumentsData';

@Controller('instrument-prices')
export class InstrumentPricesController {
  constructor(private readonly pricesService: InstrumentPricesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File, @Body('date') date: Date): Promise<string> {
    const csvData = file.buffer.toString('utf-8');
    const { data } = parse(csvData, { header: true, skipEmptyLines: true });
    const formattedData = formatInstrumentData(data, date);
    await this.pricesService.savePrices(formattedData);
    return 'File uploaded and prices saved';
  }
}
