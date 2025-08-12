import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEducation } from '../models/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private educationUrl = "http://localhost:3000/api/education";
  
  constructor(private _http: HttpClient) { }
  
  getEducationInfo(): Observable<IEducation[]>{
    return this._http.get<IEducation[]>(this.educationUrl);
  }

  addEducationField(data: FormData):Observable<IEducation> {
    return this._http.post<IEducation>(this.educationUrl, data);
  }

  updateEducationField( data: IEducation): Observable<IEducation> {
  const url = `${this.educationUrl}/${data._id}`;
  return this._http.put<IEducation>(url, data);
  }
  
deleteEducationField(id: string): Observable<{ message: string }> {
  const url = `${this.educationUrl}/${id}`;
  return this._http.delete<{ message: string }>(url);
}

  
}
