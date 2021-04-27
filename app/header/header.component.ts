import { Component, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";
import { UserService } from '../services/user/user.service';
import { Disconnect } from '../../shared/actions/connection.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nbElementPanier: number = 0;
  user: any = null;

  constructor(private store: Store, private userService: UserService) { }

  ngOnInit(): void {
    this.store.select(state => state.panier.panier.length).subscribe(l => this.nbElementPanier = l);
    this.store.select(state => state.connection.connection).subscribe(c => {console.log("test"); console.log(c); this.user = c});
  }

  logout() {
		this.store.dispatch(new Disconnect());
	}
}
