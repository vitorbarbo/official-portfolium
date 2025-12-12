import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExperienceComponent } from './experience';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have experiences array', () => {
    expect(component.experiences.length).toBeGreaterThan(0);
  });

  it('should have company keys', () => {
    expect(component.companyKeys.length).toBeGreaterThan(0);
    expect(component.companyKeys).toContain('QIMA');
  });

  it('should track by company', () => {
    const experience = component.experiences[0];
    const result = component.trackByCompany(0, experience);
    expect(result).toBe(experience.company);
  });

  it('should get achievements for company', () => {
    jest.spyOn(translateService, 'instant').mockReturnValue(['Achievement 1']);
    component.ngOnInit();
    const achievements = component.getAchievements('QIMA');
    expect(Array.isArray(achievements)).toBe(true);
  });
});
