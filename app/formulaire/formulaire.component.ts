import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Connect } from '../../shared/actions/connection.action';

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
		login: "",
		password: ""
	};
	validatedOnce: boolean = false;
	listValid: Array<boolean> = [false, false, false, false, false, false, false, false];

	@Output() messageEvent = new EventEmitter<any>();

	constructor(private userService: UserService, private router: Router, private store: Store) { }

	ngOnInit(): void {
	}

	updateInput(e, name: string): void {
		this.form[name] = e.target.value;
	}

	submitClick() {
		this.validatedOnce = true;
		let res = true;
		for (let i = 0; i < this.listValid.length; i++) res = res && this.listValid[i];
		if (res) this.messageEvent.emit(this.form);
	}

	satisfyPattern(name: string) {
		let item = this.form[name];
		if (!this.patterns[name]) return true;
		let res = item.match(new RegExp(this.patterns[name])) != null
		this.listValid[Object.keys(this.patterns).indexOf(name)] = res;
		return res;
	}

	login() {
		this.userService.login(this.form).subscribe(res => {
			document.getElementById("error").classList.add("hidden");
			this.store.dispatch(new Connect({id: res.id, name: res.name, phone: res.phone, mail: res.mail}));
			this.router.navigate(['produits'])
		}, err => {
			document.getElementById("error").classList.remove("hidden");
		});;
	}
}