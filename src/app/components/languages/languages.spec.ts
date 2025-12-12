import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagesComponent } from './languages';

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have languages array', () => {
    expect(component.languages.length).toBeGreaterThan(0);
  });

  it('should track by language name', () => {
    const language = component.languages[0];
    const result = component.trackByLanguageName(0, language);
    expect(result).toBe(language.name);
  });

  it('should get level label correctly', () => {
    expect(component.getLevelLabel(100)).toBe('EXPERT');
    expect(component.getLevelLabel(95)).toBe('EXPERT');
    expect(component.getLevelLabel(90)).toBe('EXPERT');
    expect(component.getLevelLabel(85)).toBe('ADVANCED');
    expect(component.getLevelLabel(75)).toBe('ADVANCED');
    expect(component.getLevelLabel(70)).toBe('INTERMEDIATE');
    expect(component.getLevelLabel(60)).toBe('INTERMEDIATE');
    expect(component.getLevelLabel(50)).toBe('BASIC');
    expect(component.getLevelLabel(30)).toBe('BASIC');
  });
});
