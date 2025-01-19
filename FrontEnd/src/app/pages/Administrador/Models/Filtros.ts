import { convertDateToRequest } from "../../../shared/components/function/helpers"; 
import { params } from "../components/params"; 

export class FiltrosRequest extends params{
    constructor(
        numPage: number,
         order: 'desc' | 'asc',
         sort: string,
         records: 10 | 20 | 50,
         numFilter: number = 0,
         textFilter: string = "",
         stateFilter: number = null,
       private startDate: string,
       private endDate:string
    ){
super(true,numPage,order,sort,records,false,numFilter,textFilter,stateFilter)
this.startDate=convertDateToRequest(this.startDate,'date') 
this.endDate=convertDateToRequest(this.endDate,'date')
    }
}