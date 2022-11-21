import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit, OnDestroy {
  public time = new Date(Date.now());
  private interval!: NodeJS.Timer;

  constructor() {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.time = new Date(Date.now());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
