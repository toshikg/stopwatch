import { Component, Input, OnInit } from '@angular/core';
import { Time } from 'src/app/time';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  constructor() { }

  @Input() time: Time;
  @Input() playState = false;
  @Input() containerClass = '';

  ngOnInit() {
  }


}
