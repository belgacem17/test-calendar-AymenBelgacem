
import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren, OnInit, Output, EventEmitter
} from '@angular/core';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';
@Component({
  selector: 'app-day-legend',
  templateUrl: './day-legend.component.html',
  styleUrls: ['./day-legend.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DayLegendComponent implements OnInit {
  @ViewChildren(SohoDropDownComponent) dropDowns?: QueryList<SohoDropDownComponent>;
  @Output() startDateToCalendary = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  public options: Array<Object> = [
    { value: 'DayLegend', text: 'DayLegend' }
  ];
  sourceoptions: Array<Object> = [];
  public counter = 0;
  public model = {
    readOnly: 'DayLegend',
  };

  public modeldatepicker = {
    startDate: '04/03/2022',
    EndDate: '05/21/2022'
  };
  public RangeDate = {
    startDate: '',
    EndDate: ''
  };
  public tableRangeDate:any[]=[];
  public tableDay:any[]=[];
  public modelcheckBox = {
    monday: true,
    thursday: true,
    tuesday: true,
    wednesday: true,
    friday: true,
    saturday: true,
    sunday: true,
  };
  public sunday = 'Sunday';
  public monday = 'Monday';  
  public tuesday = 'Tuesday';
  public wednesday = 'Wednesday';
  public thursday = 'Thursday';
  public friday = 'Friday';
  public saturday = 'Saturday';

  public checkBoxDisabled = false;
  public legendEvent = {
    "id": 0,
    "subject": "",
    "comments": "",
    "starts": "",
    "ends": "",
    "type": "admin",
    "status": "Approved",
    "isAllDay": false,
    "color": " #2DB329"
  };


  public showModel = true;
  public dropDownDisabled = false;
  public dropDownReadOnly = false;

  onAddOption() {
    this.options.push({ value: 'test' + this.counter, text: 'Test ' + this.counter });
    this.counter++;

  }

  onRemoveOption() {
    this.options.pop();
  }

  onKeyDown(e: Event) {
    console.log('keydown', e);
  }

  onListClosed(e: SohoDropDownEvent) {
    console.log(`listclosed: ${e.action}`);
  }

  onListOpened(_e: SohoDropDownEvent) {
    console.log(`listopened`);
  }

  onChange(e: SohoDropDownEvent) {
    console.log(`change ${e.target}`);
  }
  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    (this.dropDowns as any).first.disabled = false;
    this.dropDownDisabled = (this.dropDowns as any).first.disabled;
    this.dropDownReadOnly = (this.dropDowns as any).first.readonly;
  }

  setDisable() {
    (this.dropDowns as any).first.disabled = true;
    this.dropDownDisabled = true;
  }

  setReadonly() {
    (this.dropDowns as any).first.readonly = true;
    this.dropDownReadOnly = true;
  }
  onChangedatepicker(event: SohoDatePickerEvent) {
   this.getRange();
  }

  getRange() {
    console.log(this.modelcheckBox)
    this.tableRangeDate=[];
    let startDate = new Date(this.modeldatepicker.startDate);
    let EndDate = new Date(this.modeldatepicker.EndDate);
    let DayNumber=this.getDiffDays(startDate, EndDate)
  //  this.RangeDate.startDate = this.FormatDate(startDate, 1);
   // this.RangeDate.EndDate = this.FormatDate(EndDate, 2);
   this.getRangeDate(startDate, EndDate,DayNumber)
    this.startDateToCalendary.emit(this.tableRangeDate);
  }
  FormatDate(date: Date, HowDate: number) {
    let day = date.getDate();
    let monthIndex = (date.getMonth()+1);
    let year = date.getFullYear();
    let dayString="";
    let monthIndexString="";
    if (day < 10)
      dayString = "-0" + day.toString();
      else 
      dayString="-"+day.toString();

    if (monthIndex <10)
      monthIndexString = "-0" + monthIndex; 
    else 
      monthIndexString="-"+monthIndex.toString();

    if (HowDate == 2) {
      return year +monthIndexString+  dayString + "T23:59:59.999";
    }
    return year +  monthIndexString +  dayString + "T00:00:00.000";
  }

  getRangeDate(startDate:any, endDate:any,numberDay:number){

   
    let  legendEvent = {
      id: 0,
      subject: "",
      comments: "",
      starts: "",
      ends: "",
      type: "tdo",
      status: "Approved",
      isAllDay: false,
      color: "#2DB329"
    }
    startDate.setDate( startDate.getDate() - 1 );  
    
    for (let index =1; index <= numberDay; index++) {
      let addEvent=false;
      legendEvent = {
        id: 0,
        subject: "",
        comments: "",
        starts: "",
        ends: "",
        type: "tdo",
        status: "Approved",
        isAllDay: false,
        color: "#2DB329"
      };
      startDate.setDate( startDate.getDate() + 1 );
      if((this.modelcheckBox.monday)&&(startDate.getDay()==1))
      {
        addEvent=true;
      }
      else if((this.modelcheckBox.tuesday)&&(startDate.getDay()==2))
      {
        addEvent=true;
      }
      else if((this.modelcheckBox.wednesday)&&(startDate.getDay()==3))
      {
        addEvent=true;
      }
      else if((this.modelcheckBox.thursday)&&(startDate.getDay()==4))
      {
        addEvent=true;
      }
      else if((this.modelcheckBox.friday)&&(startDate.getDay()==5))
      {
        addEvent=true;
      }
     
      if(addEvent)
      {
        legendEvent.id =index+1;
        legendEvent.starts = this.FormatDate(startDate, 1);
        legendEvent.ends = this.FormatDate(startDate, 2);
        this.tableRangeDate.push(legendEvent);
      }
    
    }
  }
 getDiffDays(startDate:any, endDate:any) {
    return Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));
  }
 getDaysIgnore(day:any) {
   console.log(this.modelcheckBox)
    
  }
}
