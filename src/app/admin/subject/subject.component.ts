import { Component, OnInit } from '@angular/core';
import Subject from 'src/app/models/subject.model';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subject: Subject = new Subject();
  submitted = false;

  subjects?: Subject[];

  currentSubject: Subject = {
    name: '',
    code: ''
  };
  public popoverTitle:string = 'Delete';
  public popoverMessage:string = 'Do you want to delete?';
  confirmClicked = false;
  cancelClicked = false;
  login: string;

  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit(): void {
    this.login = localStorage.getItem('loginAdmin');
    if(this.login == 'false' || this.login == undefined){
      this.router.navigate(['/loginAdmin']);
    }
    this.retrieveSubjects();
  }

  public saveSubject(): void {
    if (this.subject.key == undefined) {
      this.dataService.createSubject(this.subject).then(() => {
        console.log('success');
        this.submitted = true;
      })
    }
    else {
      const data = {
        name: this.subject.name,
        code: this.subject.code
      };
      if (this.subject.key) {
        this.dataService.updateSubject(this.subject.key, data)
          .then(() => this.submitted = true)
          .catch(err => console.log(err));
      }
    }

  }

  public newSubject(): void {
    this.submitted = false;
    this.subject = new Subject();
  }

  public retrieveSubjects(): void {
    this.dataService.getAllSubjects().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.subjects = data;
    });
  }

  public setActiveSubject(subject: Subject): void {
    this.submitted = false;
    this.currentSubject = { ...subject };
    console.log(this.currentSubject);
    this.subject.key = this.currentSubject.key;
    this.subject.name = this.currentSubject.name;
    this.subject.code = this.currentSubject.code;
  }

  public deleteSubject(key: string): void {
    this.dataService.deleteSubject(key)
      .then(() => {
        this.submitted = false;
      })
      .catch(err => console.log(err));
  }

}
