import { RecordsService } from './../records.service';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = [
   {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
   {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
   {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },{
    primary:'#4DCCBD',
    secondary:'#D6FFF6'
  },{
    primary:"#5B7553",
    secondary:'#8EB897'
  },{
    primary:"#6969B3",
    secondary:"#98C1D9"
  },{
    primary:"#9CFC97",
    secondary:"#E6FAFC"
  }
];

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.recordService.delete(event.id).subscribe(res=>{
          this.events = this.events.filter(iEvent => iEvent !== event);
          this.refresh.next();
        })
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ];

  activeDayIsOpen: boolean = true;
  recordlist;
  temp:any;
  constructor(private modal: NgbModal,private recordService:RecordsService) {}
  ngOnInit(){
    console.log("bou 123")
    this.recordService.getAllSavedRecords();
    this.recordService.recordLst.subscribe(data => {
     this.temp=data;
     this.temp.forEach(el => {
     let event={
      start:startOfDay(el.start_date),
      end:endOfDay(el.end_date),
      id:el.request_id,
      color:colors[Math.floor(Math.random()*colors.length-1)],
      actions: this.actions,
      title:el.short_title,
      data:el.additional_description_1
        }
      this.events.push(event);
      })
      this.refresh.next();

    });
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

 

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  
}
