import { Component, OnInit } from '@angular/core';
import Subject, { Question } from 'src/app/models/subject.model';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  selectedValue: string;
  selectedSubject: Subject | undefined;
  selectedQuestion: Question | undefined;
  login: string;

  subjects?: Subject[];
  subject: Subject = new Subject();
  submitted = false;

  question: Question = new Question();

  currentQuestion: Question = {
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: 0
  }
  public popoverTitle:string = 'Delete';
  public popoverMessage:string = 'Do you want to delete?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.login = localStorage.getItem('loginAdmin');
    if(this.login == 'false' || this.login == undefined){
      this.router.navigate(['/loginAdmin']);
    }
    this.retrieveSubjects();
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

  public changeSubject(event) {
    this.selectedValue = event;
    this.selectedQuestion = undefined;
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
          this.subject.questions = data;
        });
      }
    }
  }

  public viewQuestion(question: Question) {
    this.selectedQuestion = question;
  }

  public getSelectedClass(question: Question): string {
    if (!this.selectedQuestion) {
      return "";
    }
    return this.selectedQuestion.key === question.key ? 'selected' : 'notSelected';
  }

  public saveQuestion(key: string, key1 :string): void {
    if(this.question.key == undefined){
      this.dataService.createQuestion(this.question, key).then(() => {
        this.submitted = true;
      })
    }
    else{
      const data={
        question: this.question.question,
        answers: this.question.answers,
        correctAnswer: this.question.correctAnswer
      }
      this.dataService.updateQuestion(key,key1,data).then(() => this.submitted = true)
      .catch(err => console.log(err));
    }
  }

  public newQuestion(): void {
    this.submitted = false;
    this.question = {
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: 0
    };
  }

  public setActiveQuestion(question: Question): void {
    this.submitted = false;
    this.currentQuestion = { ...question };
    console.log(this.currentQuestion);
    this.question.key = this.currentQuestion.key;
    this.question.question = this.currentQuestion.question;
    this.question.answers = this.currentQuestion.answers;
    this.question.correctAnswer = this.currentQuestion.correctAnswer;
  }

  public deleteQuestion(key: string, key1: string): void {
    this.dataService.deleteQuestion(key,key1)
      .then(() => {
        this.submitted = false;
      })
      .catch(err => console.log(err));
  }

}
