import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  //loading all the quizzes
  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
  
}
