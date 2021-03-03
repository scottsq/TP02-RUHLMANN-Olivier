import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  txtName: string = "";
  valid: boolean = false;
  prenom: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(e): void {
    this.txtName = e.target.value;
    this.valid = this.txtName.length > 0;
  }

}
