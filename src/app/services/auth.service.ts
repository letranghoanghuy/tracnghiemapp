import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = "/users";
  usersRef: AngularFireList<User>;
  userRef: AngularFireObject<User>;

  private dbAdminPath = '/admin';
  adminRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { 
    this.usersRef = db.list(this.dbPath);

    this.adminRef = db.list(this.dbAdminPath);
  }

  public getAllUsers(): AngularFireList<User>{
    return this.usersRef;
  }

  public getUser(key: string){
    this.userRef = this.db.object(this.dbPath+'/'+key);
    return this.userRef;
  }

  public createUser(user: User):any{
    return this.usersRef.push(user);
  }

  public updateUser(key: string,value: any): Promise<void>{
    return this.usersRef.update(key,value);
  }

  public deleteUser(key: string): Promise<void>{
    return this.usersRef.remove(key);
  }

  public getAdmin(): AngularFireList<any>{
    return this.adminRef;
  }
}
