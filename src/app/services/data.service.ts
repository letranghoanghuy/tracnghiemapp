import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import Subject, { Question } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbSubjectPath = '/subjects';
  subjectsRef: AngularFireList<Subject>;
  subjectRef: AngularFireObject<Subject>;

  private dbQuestionPath = '';
  questionsRef: AngularFireList<Question>;
  questionRef: AngularFireObject<Question>;

  constructor(private db: AngularFireDatabase) {
    this.subjectsRef = db.list(this.dbSubjectPath);
  }

  public getAllSubjects(): AngularFireList<Subject> {
    return this.subjectsRef;
  }

  public getSubject(key: string){
    this.subjectRef = this.db.object(this.dbSubjectPath+'/'+key);
    return this.subjectRef;
  }
  
  public createSubject(subject: Subject): any {
    return this.subjectsRef.push(subject);
  }

  public updateSubject(key: string, value: any): Promise<void> {
    return this.subjectsRef.update(key,value);
  }

  public deleteSubject(key: string): Promise<void> {
    return this.subjectsRef.remove(key);
  }

  public getAllQuestions(key: string): AngularFireList<Question> {
    this.dbQuestionPath= "/subjects" + "/" + key +'/questions';
    this.questionsRef = this.db.list(this.dbQuestionPath);
    return this.questionsRef;
  }

  public createQuestion(question: Question,key: string): any {
    this.dbQuestionPath= "/subjects" + "/" + key +'/questions';
    this.questionsRef = this.db.list(this.dbQuestionPath);
    return this.questionsRef.push(question);
  }

  public updateQuestion(key: string, key1: string, value: any): Promise<void>{
    this.dbQuestionPath= "/subjects" + "/" + key +'/questions';
    this.questionsRef = this.db.list(this.dbQuestionPath);
    return this.questionsRef.update(key1, value);
  }

  public deleteQuestion(key: string, key1: string): Promise<void>{
    this.dbQuestionPath= "/subjects" + "/" + key +'/questions';
    this.questionsRef = this.db.list(this.dbQuestionPath);
    return this.questionsRef.remove(key1);
  }
}
