import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionsOfQuiz(qid){
    return this.http.get(`${baseUrl}/questions/quiz/all/${qid}`);
  }
  public addNewQuestion(question){
   return  this.http.post(`${baseUrl}/questions/`,question);
  }

  public deleteQuestion(quesId){
    return  this.http.delete(`${baseUrl}/questions/${quesId}`);
   }

   public getQuestionsOfAQuiz(qid){
    return this.http.get(`${baseUrl}/questions/quiz/${qid}`);
   }

   public evalQuiz(questions){
    return this.http.post(`${baseUrl}/questions/evalQuiz`,questions);
   }
}
