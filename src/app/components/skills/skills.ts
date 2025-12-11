import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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
  readonly allSkills: Skill[] = [
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

  readonly currentFilter = signal<FilterOption>('none');

  readonly skills = computed(() => {
    const filter = this.currentFilter();
    const skills = [...this.allSkills];
    
    if (filter === 'experience') {
      skills.sort((a, b) => b.years - a.years);
    } else if (filter === 'category') {
      skills.sort((a, b) => a.category.localeCompare(b.category));
    }
    
    return skills;
  });

  readonly categoryMap: Record<SkillCategory, string> = {
    'framework': 'FRAMEWORK',
    'language': 'LANGUAGE',
    'library': 'LIBRARY',
    'tool': 'TOOL',
    'testing': 'TESTING',
    'ci-cd': 'CI_CD',
    'design': 'DESIGN',
    'extension': 'EXTENSION',
  };

  onFilterChange(filter: FilterOption): void {
    this.currentFilter.set(filter);
  }

  getCategoryKey(category: SkillCategory): string {
    return `SKILLS.CATEGORIES.${this.categoryMap[category]}`;
  }

  trackBySkillName(_: number, skill: Skill): string {
    return skill.name;
  }
}
