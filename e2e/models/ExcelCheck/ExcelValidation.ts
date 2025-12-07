import { expect, Locator, Page } from '@playwright/test';
import { Validationdata } from '../ExcelCheck/ExcelValidationdata';
import { Book } from '../ExcelCheck/Book';
import * as xml2js from 'xml2js';
import * as path from 'path';
import * as XLSX from 'xlsx';
const fs = require('fs');
const { parseStringPromise } = require('xml2js');


export class ExcelValidation {
  private page: Page;
  data: Validationdata;


  // data: {
  //     baselineFilePath?: string;
  //     baselineReportErrors: any[];
  //     validationReportErrors: any[];
  //     newValidationErrors: string[];
  //     resolvedValidationErrors: string[];     
  // };

  constructor(page: Page) {
    this.page = page;  // Store the passed page
    this.data = new Validationdata();
    this.data = {
      baselineFilePath: '',
      baselineReportMap: new Map<string, string>(),
      validationReportMap: new Map<string, string>(),
      baselineReportErrors: [],
      validationReportErrors: [],
      newValidationErrors: [],
      resolvedValidationErrors: [],
      isOrderSame: true
    };
  }



  // async getValidationMessageFromBaseLineExcel(fileName: string, fileType: string): Promise<void> {
  //     const xlsx = require('xlsx');
  //     const path = require('path');
  //     const fs = require('fs');

  //     let filepath: string;
  //     let file: string;

  //     if (fileType === 'Baseline') {
  //         filepath = `${process.cwd()}/baseline_validation`;
  //         file = path.resolve(filepath, fileName);
  //         console.log(`Baseline Validation File Path: ${file}`);
  //         this.data.baselineFilePath = file;
  //         this.data.baselineReportMap = new Map<string, string>();

  //     } else if (fileType === 'Latest') {
  //         filepath = `${process.cwd()}/latest_validation`;
  //         file = path.resolve(filepath, fileName);
  //         console.log(`Latest Validation File Path: ${file}`);
  //         this.data.validationReportMap = new Map<string, string>();

  //     } else {
  //         throw new Error(`Invalid fileType: ${fileType}`);
  //     }

  //     // Check file existence
  //     if (!fs.existsSync(file)) {
  //         throw new Error(`File not found: ${file}`);
  //     }

  //     const workbook = xlsx.readFile(file);
  //     const sheet = workbook.Sheets['Sheet1'];

  //     if (!sheet) {
  //         throw new Error('Sheet "Sheet1" not found');
  //     }

  //     // const rows: any[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  //     const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

  //     for (let i = 1; i < rows.length; i++) {
  //         const row = rows[i];
  //         if (!row) continue;

  //         const key = row[0]?.toString().trim();   // Column D
  //         const value = row[4]?.toString().trim(); // Column E

  //         if (key) {
  //             if (fileType === 'Baseline') {
  //                 this.data.baselineReportMap.set(key, value ?? '');
  //                 console.log(`BASELINE Row ${i} → Key: "${key}", Value: "${value}"`);
  //             } else {
  //                 this.data.validationReportMap.set(key, value ?? '');
  //                 console.log(`LATEST Row ${i} → Key: "${key}", Value: "${value}"`);
  //             }
  //         }
  //     }



  //     // async compareBaselineAndLatestErrors(): Promise<void> {
  //     //     // Step 1: Get error lists, default to empty array if missing
  //     //     const baselineErrors = this.data?.baselineReportErrors || [];
  //     //     const latestErrors = this.data?.validationReportErrors || [];

  //     //     const newErrors = latestErrors.filter(msg => !baselineErrors.includes(msg));
  //     //     const resolvedErrors = baselineErrors.filter(msg => !latestErrors.includes(msg));

  //     //     this.data.newValidationErrors = newErrors;
  //     //     this.data.resolvedValidationErrors = resolvedErrors;

  //     //     console.log(`\n New Errors in Latest File (${newErrors.length}):`);
  //     //     newErrors.forEach((msg, index) => console.log(`Compair mismatch in Latest file ${index + 1} : ${msg}`));

  //     //     console.log(`\n Resolved Errors from Baseline File (${resolvedErrors.length}):`);
  //     //     resolvedErrors.forEach((msg, index) => console.log(`RESOLVED ${index + 1} : ${msg}`));
  //     // }




  //     // async compareBaselineAndLatestErrors(): Promise<void> {
  //     //     // Step 1: Safely get error lists
  //     //     const baselineErrors: string[] = this.data?.baselineReportErrors || [];
  //     //     const latestErrors: string[] = this.data?.validationReportErrors || [];

  //     //     // Step 2: Compare sets
  //     //     const baselineSet = new Set(baselineErrors);
  //     //     const latestSet = new Set(latestErrors);

  //     //     const newErrors = latestErrors.filter(msg => !baselineSet.has(msg));
  //     //     const resolvedErrors = baselineErrors.filter(msg => !latestSet.has(msg));

  //     //     // Step 3: Order check
  //     //     const isOrderSame = baselineErrors.length === latestErrors.length &&
  //     //         baselineErrors.every((val, index) => val === latestErrors[index]);

  //     //     // Step 4: Store results
  //     //     this.data.newValidationErrors = newErrors;
  //     //     this.data.resolvedValidationErrors = resolvedErrors;
  //     //     this.data.isOrderSame = isOrderSame;

  //     //     // Step 5: Output report
  //     //     console.log(`\n✅ New Errors in Latest File (${newErrors.length}):`);
  //     //     newErrors.forEach((msg, index) => console.log(`NEW ${index + 1}: ${msg}`));

  //     //     console.log(`\n✅ Resolved Errors from Baseline File (${resolvedErrors.length}):`);
  //     //     resolvedErrors.forEach((msg, index) => console.log(`RESOLVED ${index + 1}: ${msg}`));

  //     //     if (!isOrderSame && newErrors.length === 0 && resolvedErrors.length === 0) {
  //     //         console.warn(`⚠️ All errors are present, but the order has changed (possible shuffle).`);
  //     //     }

  //     //     if (newErrors.length === 0 && resolvedErrors.length === 0 && isOrderSame) {
  //     //         console.log(`🎉 No differences found. Baseline and Latest files match perfectly.`);
  //     //     }
  //     // }
  // }


  async readXmlData(xmlFilePath: string): Promise<void> {
    try {
      const resolvedPath = path.resolve(xmlFilePath);
      await fs.access(resolvedPath);

      const xmlContent = await fs.readFile(resolvedPath, 'utf-8');
      const parser = new xml2js.Parser();
      const parsedData = await parser.parseStringPromise(xmlContent);

      console.log('✅ Parsed JSON:');
      console.log(JSON.stringify(parsedData, null, 2));

      const books = parsedData.catalog.book;
      const bookArray = Array.isArray(books) ? books : [books];

      const bookObjects = bookArray.map((book: any) => new Book(book));

      console.log('\n✅ Mapped Book Objects:');
      console.log(bookObjects);

      // You can now use bookObjects for Excel, validation, etc.
    } catch (error: any) {
      console.error(`❌ Error reading XML: ${error.message}`);
    }
  }

}