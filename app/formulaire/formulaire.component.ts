import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  patterns = {
    firstname: "[a-zA-Z]{3,35}",
    lastname: "[a-zA-Z]{3,35}",
    email: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    phone: "[0-9]{10}",
    city: "[a-zA-Z]{2,50}",
    zip: "[0-9]{5}",
    login: "[a-zA-Z0-9]{8,32}",
    password: "[a-zA-Z0-9]{8,32}"
  }
  form = {
    firstname: "",
    lastname: "",
    civility: 0,
    email: "",
    phone: "",
    address: "",
    city: "",
    state: 0,
    zip: "",
    login: "",
    password: "",
    confirmPassword: ""
  };
  validatedOnce: boolean = false;
  listValid: Array<boolean> = [false, false, false, false, false, false, false, false];

  @Output() messageEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  updateInput(e, name: string): void {
    this.form[name] = e.target.value;
  }

  submitClick() {
    this.validatedOnce = true;
    let res = true;
    for (let i=0; i < this.listValid.length; i++) res = res && this.listValid[i];
    if (res) this.messageEvent.emit(this.form);
  }

  satisfyPattern(name: string) {
    let item = this.form[name];
    if (!this.patterns[name]) return true;
    let res = item.match(new RegExp(this.patterns[name])) != null
    this.listValid[Object.keys(this.patterns).indexOf(name)] = res;
    return res;
  }

  isSamePassword() {
    return this.form.password == this.form.confirmPassword;
  }
}