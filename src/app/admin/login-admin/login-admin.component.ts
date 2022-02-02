import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  user: string= '';
  password: string= '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  loginAdmin(): void {
    this.auth.getAdmin().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      for(let i of data) {
        if(i.user == this.user && i.pass == this.password) {
          localStorage.setItem('loginAdmin', 'true');
          alert("Đăng nhập thành công");
          this.router.navigate(['/admin/subject']);
        }
        else{
          alert('Sai tên đăng nhập hoặc mật khẩu')
        }
      }
    })

  }

}
