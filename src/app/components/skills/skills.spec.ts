import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsComponent } from './skills';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all skills', () => {
    expect(component.allSkills.length).toBeGreaterThan(0);
  });

  it('should have skills computed', () => {
    expect(component.skills().length).toBeGreaterThan(0);
  });

  it('should filter skills by category', () => {
    component.currentFilter.set('Frontend');
    const frontendSkills = component.skills();
    expect(frontendSkills.length).toBeGreaterThan(0);
  });

  it('should show all skills when filter is none', () => {
    component.currentFilter.set('none');
    const allSkills = component.skills();
    expect(allSkills.length).toBe(component.allSkills.length);
  });
});
