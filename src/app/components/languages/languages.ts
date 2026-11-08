import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface Language {
  name: string;
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
    { name: 'PORTUGUESE', proficiency: 'NATIVE' },
    { name: 'ENGLISH', proficiency: 'PROFICIENT' },
    { name: 'SPANISH', proficiency: 'INTERMEDIATE' },
  ];

  trackByLanguageName(_: number, language: Language): string {
    return language.name;
  }
}
