import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface Language {
  name: string;
  level: number; // 0-100
  icon: string;
  proficiency: string;
}

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './languages.html',
  styleUrl: './languages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesComponent {
  readonly languages: Language[] = [
    { name: 'PORTUGUESE', level: 100, icon: '🇧🇷', proficiency: 'NATIVE' },
    { name: 'ENGLISH', level: 90, icon: '🇺🇸', proficiency: 'PROFICIENT' },
    { name: 'SPANISH', level: 50, icon: '🇪🇸', proficiency: 'INTERMEDIATE' },
  ];

  getLevelLabel(level: number): string {
    if (level >= 90) return 'EXPERT';
    if (level >= 75) return 'ADVANCED';
    if (level >= 60) return 'INTERMEDIATE';
    return 'BASIC';
  }

  trackByLanguageName(_: number, language: Language): string {
    return language.name;
  }
}
