import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch git repos', () => {
    const mockRepos = [{
      id: 1,
      name: 'test-repo',
      description: 'Test',
      html_url: 'https://github.com/test/test',
      language: 'TypeScript',
      created_at: '2023-01-01T00:00:00Z',
      fork: false,
      owner: { login: 'vitorbarbo' },
    }];

    service.fetchGitRepos().subscribe((repos) => {
      expect(repos.length).toBe(1);
      expect(repos[0].name).toBe('test-repo');
    });

    const req = httpMock.expectOne('https://api.github.com/users/vitorbarbo/repos');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should fetch repo languages', () => {
    const mockLanguages = { TypeScript: 1000, HTML: 500 };
    service.fetchRepoLanguages('vitorbarbo', 'test-repo').subscribe((languages) => {
      expect(languages.TypeScript).toBe(1000);
    });
    const req = httpMock.expectOne('https://api.github.com/repos/vitorbarbo/test-repo/languages');
    req.flush(mockLanguages);
  });
});
