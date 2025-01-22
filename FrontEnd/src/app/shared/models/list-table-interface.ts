export interface TableColumns<T>{
    label : string;
    csslabel: string[];
    property: string;
    cssProperty?: string[];
    subProperty?: keyof T | string;
    cssSubProperty?: string[];
    type: "text" | "datetime" | "time" | "icon"
     |"button" | "badge"|"image"|"currency"|"textUppercase"|"number"|"quantityPurcharse"
     |"unitpurcharseprice"|"totalamount"|"badge2"|"badge3"|"badge4"|"badge5";
    visible: boolean;
    sort: boolean;
    sortProperty?: string;
    action?: string;
    sticky: boolean;
    tooltip?: string;
    download?: boolean;
    property_download?: string;
}

export interface TableFooter <T>{
    label: string;
    property: keyof T | string;
    tooltip: string ;
}
