import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './language-switcher';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have languages array', () => {
    expect(component.languages.length).toBeGreaterThan(0);
  });

  it('should have English, Portuguese, Spanish, and Chinese', () => {
    const codes = component.languages.map((lang) => lang.code);
    expect(codes).toContain('en');
    expect(codes).toContain('pt');
    expect(codes).toContain('es');
    expect(codes).toContain('zh');
  });

  it('should toggle dropdown', () => {
    expect(component.isOpen()).toBe(false);
    component.toggleDropdown();
    expect(component.isOpen()).toBe(true);
    component.toggleDropdown();
    expect(component.isOpen()).toBe(false);
  });

  it('should switch language', () => {
    const useSpy = jest.spyOn(translateService, 'use');
    component.switchLanguage('pt');
    expect(useSpy).toHaveBeenCalledWith('pt');
  });

  it('should update current language signal', () => {
    translateService.use('pt');
    fixture.detectChanges();
    expect(component.currentLanguage()).toBe('pt');
  });
});
