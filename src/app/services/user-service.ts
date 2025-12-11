import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { GitHubRepo } from '../models/github-repo.interface';

export interface RepoLanguages {
  [language: string]: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private cache$?: Observable<GitHubRepo[]>;
  private languagesCache = new Map<string, Observable<RepoLanguages>>();

  constructor(private readonly http: HttpClient) {}

  fetchGitRepos(): Observable<GitHubRepo[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<GitHubRepo[]>('https://api.github.com/users/vitorbarbo/repos').pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  fetchRepoLanguages(owner: string, repo: string): Observable<RepoLanguages> {
    const cacheKey = `${owner}/${repo}`;
    if (!this.languagesCache.has(cacheKey)) {
      this.languagesCache.set(
        cacheKey,
        this.http.get<RepoLanguages>(`https://api.github.com/repos/${owner}/${repo}/languages`).pipe(
          shareReplay(1)
        )
      );
    }
    return this.languagesCache.get(cacheKey)!;
  }
}
