import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  users?: User[];
  submitted: boolean = false;
  pass: any;
  login: string = '';
  key?: string;
  signup: boolean = true;
  
  constructor(private authService: AuthService, private router: Router) {
    this.user.point = 0
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  public saveUser():void {
    for (let i of this.users) {
      if(this.user.name == i.name){
        alert('Tên người dùng đã tồn tại');
        this.signup = false;
      }
      else{
        this.signup = true;
      }
    }

    if(this.user.password == this.pass && this.signup == true){
      localStorage.setItem('login', 'true');
      this.authService.createUser(this.user).then(() => {
        alert("Đăng ký thành công");
        this.submitted = true;
        this.key = this.user.name;
        localStorage.setItem('key',this.key);
        this.router.navigate(['/client/home']);
      })
    }
    else if(this.user.password != this.pass){
      alert('Nhập lại mật khẩu sai')
    }
    
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
  
}
