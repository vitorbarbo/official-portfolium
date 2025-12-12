import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutComponent } from './about';
import { UserService } from '../../services/user-service';
import { of, throwError } from 'rxjs';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let userService: UserService;
  let translateService: TranslateService;

  const mockRepos = [
    {
      id: 1,
      name: 'test-repo',
      description: 'Test repository',
      html_url: 'https://github.com/test/test-repo',
      language: 'TypeScript',
      created_at: '2023-01-01T00:00:00Z',
      fork: false,
      owner: { login: 'vitorbarbo' },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting(), UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default tab', () => {
    expect(component.activeTab()).toBe('about');
  });

  it('should set active tab', () => {
    component.setActiveTab('projects');
    expect(component.activeTab()).toBe('projects');
  });

  it('should fetch and map repositories on init', () => {
    jest.spyOn(userService, 'fetchGitRepos').mockReturnValue(of(mockRepos as any));
    component.ngOnInit();
    expect(userService.fetchGitRepos).toHaveBeenCalled();
    expect(component.projects().length).toBe(1);
  });
});
