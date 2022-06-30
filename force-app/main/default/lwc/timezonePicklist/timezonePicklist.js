import { LightningElement,api } from 'lwc';
import momentTZ from '@salesforce/resourceUrl/moment';
import { loadScript } from 'lightning/platformResourceLoader';

export default class TimezonePicklist extends LightningElement {
    initialized = false;
    currentDate;
    timezoneOptions = [];
    currentTZ;
    connectedCallback(){
        loadScript(this, momentTZ+'/moment.js')
        .then(()=>{
            loadScript(this, momentTZ+'/momenttz.js')
            .then(()=>{
                this.currentTZ = moment.tz.guess();
                this.timezoneOptions = moment.tz.names()
                .reduce((memo,tz) => {
                    memo.push({key:tz.name,value:tz.name,label:`(GMT${timezone}) ${tz.name}`,name:tz,offset:moment.tz(tz).utcOffset()});
                    return memo;
                },[]).sort((a,b)=>{
                    return a.offset-b.offset;
                });
                let listId = this.template.querySelector('datalist').id;
                this.template.querySelector("input").setAttribute("list", listId);
            })
        })
    } 
}