import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  users?: User[];
  login: boolean = false;
  key?: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.authService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

  loginUser(): void {
    for (let i of this.users) {
      if (this.user.name == i.name && this.user.password == i.password) {
        this.login = true;
        break;
      }
      else {
        this.login = false;
      }
    }

    if (this.login == true) {
      localStorage.setItem('login', 'true');
      alert("Đăng nhập thành công");
      this.key = this.user.name;
      localStorage.setItem('key', this.key);
      this.router.navigate(['/client/home']);
    }
    else {
      alert("Sai tên đăng nhập hoặc mật khẩu")
    }

  }

}
