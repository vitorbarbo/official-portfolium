import { Component, ChangeDetectionStrategy, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Experience {
  company: string;
  companyUrl: string;
  technologies: string[];
  repository?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnInit {
  readonly companyKeys = ['QIMA', 'BAIRESDEV', 'ONTOP', 'HAUSZ', 'PDCA'];
  readonly experiences: Experience[] = [
    {
      company: 'QIMA/WQS',
      companyUrl: 'https://www.qima.com',      
      technologies: ['Angular', 'AngularJS', 'TypeScript', 'JavaScript', 'Jest', 'Cypress', 'CircleCI', 'Jenkins', 'HTML5', 'CSS', 'SCSS', 'GitHub'],
    },
    {
      company: 'BairesDev',
      companyUrl: 'https://www.bairesdev.com',      
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'Jest', 'HTML5', 'CSS', 'SCSS', 'GitHub'],
    },
    {
      company: 'Ontop',
      companyUrl: 'https://www.getontop.com/',      
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'Jest', 'HTML5', 'CSS', 'SCSS', 'GitLab'],
    },
    {
      company: 'Hausz - Pisos e Ambientes',
      companyUrl: '',      
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS', 'SCSS', 'GitHub'],
    },
    {
      company: 'PDCA Engenharia',
      companyUrl: 'https://www.pdcaengenharia.com.br/',      
      technologies: ['JavaScript', 'HTML5', 'CSS', 'GitHub'],
    },
  ];

  readonly translatedAchievements = signal<Record<string, string[]>>({});

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadAchievements();
    this.translateService.onLangChange.subscribe(() => this.loadAchievements());
  }

  private loadAchievements(): void {
    const achievements: Record<string, string[]> = {};
    this.companyKeys.forEach(key => {
      const achievementsKey = `EXPERIENCE.COMPANIES.${key}.ACHIEVEMENTS`;
      const translated = this.translateService.instant(achievementsKey);
      achievements[key] = Array.isArray(translated) ? translated : [];
    });
    this.translatedAchievements.set(achievements);
  }

  getAchievements(companyKey: string): string[] {
    return this.translatedAchievements()[companyKey] || [];
  }

  trackByCompany(_: number, exp: Experience): string {
    return exp.company;
  }

  trackByAchievement(_: number, achievement: string): string {
    return achievement;
  }

  trackByTech(_: number, tech: string): string {
    return tech;
  }
}
