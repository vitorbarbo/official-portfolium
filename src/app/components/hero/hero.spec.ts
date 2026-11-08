import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.givenName).toBe('Vitor Duarte');
    expect(component.familyName).toBe('Barbosa');
    expect(component.location).toBe('Campinas, São Paulo — Brazil');
    expect(component.email).toBe('vitordb91@gmail.com');
  });
});
