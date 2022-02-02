import { Component, OnInit } from '@angular/core';
import Subject, { Question } from 'src/app/models/subject.model';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import User from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[MessageService]
})
export class HomeComponent implements OnInit {
  selectedValue: string;
  selectedSubject: Subject | undefined;

  subjects?: Subject[];
  subject: Subject = new Subject();
  submitted = false;

  public questions: Question[] | undefined;
  public collapsed :boolean = true;
  public answers: number[] = [];
  public percentCorrect: number=0;

  login:string;
  user: User = new User();
  users?: User[];
  key?: string;

  constructor(private dataService: DataService, private auth: AuthService) { }

  ngOnInit(): void {
    this.retrieveSubjects();
    this.retrieveUsers();
    // this.login = localStorage.getItem('login');
    // console.log(this.login);
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

  public changeSubject(event) {
    this.selectedValue = event;
    this.submitted = false;
    this.percentCorrect = 0;
    // this.selectedQuestion = undefined;
    for (let i of this.subjects) {
      if (i.name == this.selectedValue) {
        this.selectedSubject = i;
        this.dataService.getAllQuestions(i.key).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(data => {
          this.answers =[];
          this.subject.questions = data;
          this.subject.questions.forEach((question,index) =>{
            this.answers[index] = 0;
          })
        });
      }
    }
  }

  public test(){
    // console.log(this.answers)
  }

  public  answerAll(): boolean {
    return this.answers && !this.answers.includes(0)
  }
  public checkAnswer(){
    if (!this.subject.questions){
      return;
    }
    let dung =0;
    this.subject.questions.forEach((question,index) => {
      if(+question.correctAnswer === +this.answers[index]){
        dung++;
      }
      // console.log('answer'+(index + 1)+': '+(+question.correctAnswer === +this.answers[index] ? 'right' : 'wrong'))
      // console.log(dung);
    })
    this.percentCorrect = (dung * 10)/ this.answers.length;
    this.submitted = true;
    const data={
      point: this.user.point + this.percentCorrect
    }
    this.auth.updateUser(this.user.key, data).then().catch(err => console.log(err))
  }

}
