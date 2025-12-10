import { Component, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkillFilterDropdownComponent, FilterOption } from '../skill-filter-dropdown/skill-filter-dropdown';

export type SkillCategory = 'framework' | 'language' | 'library' | 'tool' | 'testing' | 'ci-cd' | 'design' | 'extension';

export interface Skill {
  name: string;
  path: string;
  years: number;
  category: SkillCategory;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule, SkillFilterDropdownComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  protected readonly allSkills: Skill[] = [
    { name: 'AngularJS', path: 'assets/images/angularjs-icon.svg', years: 3, category: 'framework' },
    { name: 'Angular', path: 'assets/images/angular-icon.svg', years: 6, category: 'framework' },
    { name: 'TypeScript', path: 'assets/images/typescript-icon.svg', years: 6, category: 'language' },
    { name: 'JavaScript', path: 'assets/images/javascript-icon.svg', years: 7, category: 'language' },
    { name: 'HTML5', path: 'assets/images/html-icon.svg', years: 7, category: 'language' },
    { name: 'CSS3', path: 'assets/images/css-icon.svg', years: 7, category: 'language' },
    { name: 'SCSS', path: 'assets/images/scss-icon.webp', years: 6, category: 'language' },
    { name: 'RxJS', path: 'assets/images/rxjs-icon.webp', years: 5, category: 'library' },
    { name: 'NgRx', path: 'assets/images/ngrx-icon.webp', years: 5, category: 'library' },
    { name: 'Bootstrap', path: 'assets/images/bootstrap-icon.svg', years: 6, category: 'library' },
    { name: 'Jest', path: 'assets/images/jest-icon.svg', years: 5, category: 'testing' },
    { name: 'Cypress', path: 'assets/images/cypress-icon.svg', years: 3, category: 'testing' },
    { name: 'CircleCI', path: 'assets/images/circle-ci-icon.svg', years: 3, category: 'ci-cd' },
    { name: 'Jenkins', path: 'assets/images/jenkins-icon.svg', years: 3, category: 'ci-cd' },
    { name: 'Husky', path: 'assets/images/husky-icon.png', years: 6, category: 'extension' },
    { name: 'GitHub', path: 'assets/images/github-icon.svg', years: 7, category: 'tool' },
    { name: 'GitLab', path: 'assets/images/gitlab-icon.svg', years: 2, category: 'tool' },
    { name: 'NPM', path: 'assets/images/npm-icon.svg', years: 6, category: 'tool' },
    { name: 'Postman', path: 'assets/images/postman-icon.svg', years: 6, category: 'tool' },
    { name: 'Figma', path: 'assets/images/figma-icon.svg', years: 6, category: 'design' },
    { name: 'JIRA', path: 'assets/images/jira-icon.svg', years: 5, category: 'tool' },
    { name: 'RESTful API', path: 'assets/images/rest-api-icon.png', years: 6, category: 'tool' },
    { name: 'Prettier', path: 'assets/images/prettier-icon.png', years: 6, category: 'extension' },
  ];

  protected readonly currentFilter = signal<FilterOption>('none');

  protected readonly skills = computed(() => {
    const filter = this.currentFilter();
    let filtered = [...this.allSkills];

    if (filter === 'experience') {
      filtered.sort((a, b) => b.years - a.years);
    } else if (filter === 'category') {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    return filtered;
  });

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly translateService: TranslateService
  ) {}

  protected onFilterChange(filter: FilterOption): void {
    this.currentFilter.set(filter);
    this.cdr.markForCheck();
  }

  protected getYearsOfExperience(skill: Skill): number {
    return skill.years;
  }

  protected getCategoryKey(category: SkillCategory): string {
    const categoryMap: Record<SkillCategory, string> = {
      'framework': 'FRAMEWORK',
      'language': 'LANGUAGE',
      'library': 'LIBRARY',
      'tool': 'TOOL',
      'testing': 'TESTING',
      'ci-cd': 'CI_CD',
      'design': 'DESIGN',
      'extension': 'EXTENSION',
    };
    return `SKILLS.CATEGORIES.${categoryMap[category]}`;
  }

  protected trackBySkillName(index: number, skill: Skill): string {
    return skill.name;
  }
}
