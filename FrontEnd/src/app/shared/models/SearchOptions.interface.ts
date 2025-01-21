export interface SearchOptions{
    label: string;
    value: number;
    placeholder: string;
    validation: any;
    validation_desc: any;
    icon: string;
    min_lenght?: number;
    }
    
    export interface FilterBox{
        searchValue?:number;
        searchData?: string;
    }
    export interface DateRange{
        startDate?:string;
        endDate?: string;
    }