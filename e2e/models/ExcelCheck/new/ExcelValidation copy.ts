import { expect, Locator, Page } from '@playwright/test';
import { Validationdata } from '../ExcelValidationdata';

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
            baselineReportErrors: [],
            validationReportErrors: [],
            newValidationErrors: [],
            resolvedValidationErrors: [],
            isOrderSame: false,
        };
    }

    async getValidationMessageFromBaseLineExcel(fileName: string, fileType: string): Promise<void> {

        const xlsx = require('xlsx');
        const path = require('path');
        const fs = require('fs');

        let filepath
        let file

        if (fileType === 'Baseline') {
            filepath = `${process.cwd()}/baseline_validation`; //process.cwd() means "current working directory"
            file = path.resolve(filepath, fileName);           //path.resolve() joins paths and resolves them into an absolute path.
            console.log(`Baseline Validation File Path: ${file}`);
            this.data.baselineFilePath = file;                 // storing values into the "data" object,
            this.data.baselineReportErrors = [];               //Initializes the baselineReportErrors property as an empty array.
        } else if (fileType === 'Latest') {
            filepath = `${process.cwd()}/latest_validation`;
            file = path.resolve(filepath, fileName);
            console.log(`Latest Validation File Path: ${file}`);
            this.data.validationReportErrors = [];
        }


        const workbook = xlsx.readFile(file);
        const sheet = workbook.Sheets['Sheet1']; // it will find the file sheet name

        if (!sheet) {
            throw new Error('Sheet "Sheet1" not found');
        }

        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        let count = 0;
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row) continue;
            const cell = row[4]; // Grabs the th column value
            if (cell && cell.trim() !== '' && cell !== 'Expected Result') {
                if (fileType === 'Baseline') {
                    //this.data.baselineReportErrors.push(cell);
                    // console.log(`BASELINE ${count} : ${cell}`);
                    this.data.baselineReportErrors.push(cell.trim());
                    console.log(`BASELINE ${i} : ${cell}`);
                } else if (fileType === 'Latest') {
                    // this.data.validationReportErrors.push(cell);
                    // console.log(`LATEST ${count} : ${cell}`);
                    this.data.validationReportErrors.push(cell.trim());
                    console.log(`LATEST ${i} : ${cell}`);
                }
                count++;
            }
        }

    }


    async compareBaselineAndLatestErrors(): Promise<void> {
        // Step 1: Get error lists, default to empty array if missing
        const baselineErrors = this.data?.baselineReportErrors || [];
        const latestErrors = this.data?.validationReportErrors || [];

        const newErrors = latestErrors.filter(msg => !baselineErrors.includes(msg));
        const resolvedErrors = baselineErrors.filter(msg => !latestErrors.includes(msg));

        this.data.newValidationErrors = newErrors;
        this.data.resolvedValidationErrors = resolvedErrors;

        console.log(`\n New Errors in Latest File (${newErrors.length}):`);
        newErrors.forEach((msg, index) => console.log(`Compair mismatch in Latest file ${index + 1} : ${msg}`));

        console.log(`\n Resolved Errors from Baseline File (${resolvedErrors.length}):`);
        resolvedErrors.forEach((msg, index) => console.log(`RESOLVED ${index + 1} : ${msg}`));
    }




    // async compareBaselineAndLatestErrors(): Promise<void> {
    //     // Step 1: Safely get error lists
    //     const baselineErrors: string[] = this.data?.baselineReportErrors || [];
    //     const latestErrors: string[] = this.data?.validationReportErrors || [];

    //     // Step 2: Compare sets
    //     const baselineSet = new Set(baselineErrors);
    //     const latestSet = new Set(latestErrors);

    //     const newErrors = latestErrors.filter(msg => !baselineSet.has(msg));
    //     const resolvedErrors = baselineErrors.filter(msg => !latestSet.has(msg));

    //     // Step 3: Order check
    //     const isOrderSame = baselineErrors.length === latestErrors.length &&
    //         baselineErrors.every((val, index) => val === latestErrors[index]);

    //     // Step 4: Store results
    //     this.data.newValidationErrors = newErrors;
    //     this.data.resolvedValidationErrors = resolvedErrors;
    //     this.data.isOrderSame = isOrderSame;

    //     // Step 5: Output report
    //     console.log(`\n✅ New Errors in Latest File (${newErrors.length}):`);
    //     newErrors.forEach((msg, index) => console.log(`NEW ${index + 1}: ${msg}`));

    //     console.log(`\n✅ Resolved Errors from Baseline File (${resolvedErrors.length}):`);
    //     resolvedErrors.forEach((msg, index) => console.log(`RESOLVED ${index + 1}: ${msg}`));

    //     if (!isOrderSame && newErrors.length === 0 && resolvedErrors.length === 0) {
    //         console.warn(`⚠️ All errors are present, but the order has changed (possible shuffle).`);
    //     }

    //     if (newErrors.length === 0 && resolvedErrors.length === 0 && isOrderSame) {
    //         console.log(`🎉 No differences found. Baseline and Latest files match perfectly.`);
    //     }
    // }


}