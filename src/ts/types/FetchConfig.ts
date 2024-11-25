
import {HtttpMethods} from "../enums/HtttpMethods";


export  type FetchConfig = {
    method?: HtttpMethods ,
    url: string,
    body?: object,
    header?: object
}