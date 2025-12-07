
export class Validationdata
{
    baselineFilePath?: string;
    baselineReportMap: Map<string, string>; // Remove the optional `?`
    validationReportMap: Map<string, string>; // Remove the optional `?`
    baselineReportErrors?: string[];
    validationReportErrors?: string[];
    newValidationErrors?: string[];
    resolvedValidationErrors?: string[];
    isOrderSame?: boolean;
}
