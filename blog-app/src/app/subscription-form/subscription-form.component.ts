import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(formVal: any) {
    console.log(formVal);
  }
}
