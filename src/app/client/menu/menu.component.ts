import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  login: string;
  users?: User[];
  user: User;
  key?: string;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.login = localStorage.getItem('login');
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.auth.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
      this.key = localStorage.getItem('key');
      for( let i of this.users){
        if(i.name === this.key){
          this.user = i;
          break;
        }
      }
    });
  }

  logout(): void {
    localStorage.setItem('login', 'false');
    this.router.navigate(['/client/login']);
  }

}
