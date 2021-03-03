import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  form;
  constructor() { }

  ngOnInit(): void {
  }

  receiveMessage($event) {
    this.form = $event
  }
}
