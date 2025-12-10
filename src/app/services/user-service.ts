import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitHubRepo } from '../models/github-repo.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public fetchGitRepos(): Observable<GitHubRepo[]> {
    const url = 'https://api.github.com/users/vitorbarbo/repos';
    return this.http.get<GitHubRepo[]>(url);
  }
}
