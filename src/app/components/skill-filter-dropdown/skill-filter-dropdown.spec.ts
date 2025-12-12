import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SkillFilterDropdownComponent, FilterOption } from './skill-filter-dropdown';

describe('SkillFilterDropdownComponent', () => {
  let component: SkillFilterDropdownComponent;
  let fixture: ComponentFixture<SkillFilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillFilterDropdownComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillFilterDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with closed dropdown', () => {
    expect(component.isOpen()).toBe(false);
  });

  it('should initialize with none filter', () => {
    expect(component.selectedFilter()).toBe('none');
  });

  it('should toggle dropdown', () => {
    expect(component.isOpen()).toBe(false);
    component.toggleDropdown();
    expect(component.isOpen()).toBe(true);
    component.toggleDropdown();
    expect(component.isOpen()).toBe(false);
  });

  it('should emit filter change when filter is selected', () => {
    const filterSpy = jest.fn();
    component.filterChange.subscribe(filterSpy);

    component.selectFilter('category' as FilterOption);

    expect(filterSpy).toHaveBeenCalledWith('category');
    expect(component.selectedFilter()).toBe('category');
    expect(component.isOpen()).toBe(false);
  });

  it('should check if filter is active', () => {
    component.selectedFilter.set('experience');
    expect(component.isActive('experience')).toBe(true);
    expect(component.isActive('category')).toBe(false);
  });
});
