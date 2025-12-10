import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Experience {
  company: string;
  companyUrl: string;
  achievements: string[];
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
export class ExperienceComponent {
  protected readonly companyKeys = ['QIMA', 'BAIRESDEV', 'ONTOP', 'HAUSZ', 'PDCA'];
  protected readonly experiences: Experience[] = [
    {
      company: 'QIMA/WQS',
      companyUrl: 'https://www.qima.com',
      
      
      
      achievements: [
        'Served as a principal contributor in high-profile global projects using AngularJS and modern Angular, engineering scalable architectures supporting 5K+ monthly active users.',
        'Designed and optimized component architectures, increasing maintainability and reducing rework by 35% while ensuring technical excellence across platforms.',
        'Delivered complex integrations with mission-critical APIs, automating workflows and enhancing operational speed at an international scale.',
        'Presented new features and project results directly to executive directors in bi-weekly sessions, driving strategic alignment in high-pressure environments.',
      ],
      technologies: ['Angular', 'AngularJS', 'TypeScript', 'JavaScript', 'Jest', 'Cypress', 'CircleCI', 'Jenkins', 'HTML5', 'CSS', 'SCSS', 'GitHub'],
    },
    {
      company: 'BairesDev',
      companyUrl: 'https://www.bairesdev.com',
      
      
      
      achievements: [
        'Built reusable components and optimized UI/UX performance in high-scale Angular projects, cutting load time by 28%.',
        'Collaborated with international teams to integrate REST APIs, ensuring scalable and consistent delivery for systems serving 20K+ daily users.',
        'Enforced clean architecture and continuous delivery pipelines, accelerating deployment cycles by 40% and minimizing production errors.',
      ],
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'Jest', 'HTML5', 'CSS', 'SCSS', 'GitHub'],
    },
    {
      company: 'Ontop',
      companyUrl: 'https://www.getontop.com/',
      
      
      
      achievements: [
        'Contributed to a major IT project in Angular + SCSS + TypeScript across three core environments, directly supporting 15K+ monthly active users.',
        'Designed reusable components and robust modular structures, cutting new feature development time by 25%.',
        'Delivered responsive layouts and backend integrations via REST, ensuring compatibility and high performance across devices.',
        'Performed integrated testing and bug fixing, reducing production error rates by 30%.',
      ],
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'Jest', 'HTML5', 'CSS', 'SCSS', 'GitLab'],
    },
    {
      company: 'Hausz - Pisos e Ambientes',
      companyUrl: '',
      
      
      
      achievements: [
        'Solely built from scratch a freight integration platform processing 5K+ shipments/month, handling requirements gathering, front-end architecture, responsive UI, and API integrations for rate calculation and tracking.',
        'Optimized application performance, cutting load time by 40% and boosting operational efficiency.',
        'Developed semantic and responsive landing pages using HTML, CSS, JavaScript, and Angular.',
        'Refactored legacy code, improved documentation, and led weekly workflow optimization sessions, increasing team productivity by 40%.',
      ],
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS', 'SCSS', 'GitHub'],
    },
    {
      company: 'PDCA Engenharia',
      companyUrl: 'https://www.pdcaengenharia.com.br/',
      
      
      
      achievements: [
        'Delivered corporate websites and responsive landing pages using HTML, CSS, and JavaScript.',
        'Managed GitHub repositories, implementing optimizations that reduced page load time by 25% and enhanced user experience.',
        'Provided ongoing technical support, ensuring consistent branding and functionality across browsers and devices.',
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS', 'GitHub'],
    },
  ];

  protected trackByCompany(index: number, exp: Experience): string {
    return exp.company;
  }

  protected trackByAchievement(index: number, achievement: string): string {
    return achievement;
  }

  protected trackByTech(index: number, tech: string): string {
    return tech;
  }

  constructor(private readonly translateService: TranslateService) {}

  protected getAchievementTranslation(companyKey: string, index: number): string {
    const key = `EXPERIENCE.COMPANIES.${companyKey}.ACHIEVEMENTS.${index}`;
    return this.translateService.instant(key);
  }

  protected getAchievementsIndices(companyKey: string): number[] {
    const companyIndex = this.companyKeys.indexOf(companyKey);
    if (companyIndex === -1) return [];
    const achievements = this.experiences[companyIndex]?.achievements || [];
    return Array.from({ length: achievements.length }, (_, i) => i);
  }
}
