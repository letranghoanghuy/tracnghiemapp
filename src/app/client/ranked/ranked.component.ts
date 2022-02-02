import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ranked',
  templateUrl: './ranked.component.html',
  styleUrls: ['./ranked.component.scss']
})
export class RankedComponent implements OnInit {
  users?: User[];

  constructor(private authService: AuthService) { }

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
      this.users = data.sort((a,b)=> b.point-a.point);
    });
  }

}
