import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from '@angular-cool/storage';
import { interval } from 'rxjs';
import { faStopwatch, faTrashAlt, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { Time } from 'src/app/time';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit {
  localStorage: CoolLocalStorage;
  faStopwatch = faStopwatch;
  faTrash = faTrashAlt;
  faPlay = faPlay;
  faStop = faStop;

  constructor(localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  private currentTime = 0;

  time: Time = {
    total: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  };

  playState;

  history: Time[];

  togglePlay = function() {
    this.playState = this.localStorage.getItem('play') !== 'true';

    if (this.playState) {
      this.playTimer();
    } else {
      this.pauseTimer();
    }
    this.localStorage.setItem('play', this.playState);
  };

  resetTimer = function() {
    this.currentTime = 0;
    this.time = {
      total: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    };
    this.playState = false;
    this.localStorage.setItem('play', this.playState);
    this.localStorage.setItem('startTime', null);
    this.localStorage.setItem('totalTime', 0);
    this.localStorage.setItem('history', '[]');
    this.history = [];
  };

  addToHistory () {
    this.history = JSON.parse(this.localStorage.getItem('history'));
    this.history.push(Object.assign({}, this.time));
    this.localStorage.setItem('history', JSON.stringify(this.history));
  }

  removeFromHistory (item) {
    this.history = this.history.filter((i) => i.total !== item.total);
    this.localStorage.setItem('history', JSON.stringify(this.history));
  }

  private playTimer() {
    const now: Date = new Date();
    const start = JSON.parse(this.localStorage.getItem('startTime'));
    if (!start) {
      this.localStorage.setItem('startTime', now.toString());
    }
  }

  private pauseTimer() {
    this.localStorage.setItem('startTime', null);
    const totalTime = JSON.parse(this.localStorage.getItem('totalTime'));
    this.localStorage.setItem('totalTime', totalTime + this.currentTime);
    this.currentTime = 0;
  }

  private getCurrentTime() {
    const now: Date = new Date();
    const start = new Date(this.localStorage.getItem('startTime'));
    return (now.getTime() - start.getTime()) / 10;
  }

  private updateTime() {
    const totalTime = JSON.parse(this.localStorage.getItem('totalTime'));
    if (this.localStorage.getItem('play') === 'true') {
      this.currentTime = this.getCurrentTime();
      this.time.total = totalTime + this.currentTime;
      this.calculateTime();
    } else {
      this.time.total = totalTime;
      this.calculateTime();
    }
    this.calculateTime();
  }

  private calculateTime() {
    const minutes = this.time.total % 6000;
    this.time.minutes = Math.floor(this.time.total / 6000);
    this.time.seconds = Math.floor(minutes / 100);
    this.time.milliseconds = minutes % 100;
  }

  ngOnInit() {
    const millisecondsCounter = interval(100);

    this.localStorage.setItem('totalTime', '0');
    this.playState = (this.localStorage.getItem('play') === 'true');

    this.localStorage.setItem('history', '[]');

    millisecondsCounter.subscribe(n => {
      this.updateTime();
    });
  }

}
