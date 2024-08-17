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

  public addquizzes(quiz){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuizzes(quizId:number){
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  public updateQuizzes(quiz){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  public getAllQuizzesOfACategory(catId){
    return this.http.get(`${baseUrl}/quiz/category/${catId}`);
  }

  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }
  
  public getActiveQuizzesOfCategory(catId){
    return this.http.get(`${baseUrl}/quiz/category/active/ ${catId}`); 
  }

  public getQuiz(quizId){
    return this.http.get(`${baseUrl}/quiz/${quizId}`);
  }
}
