import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  readonly languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
  ];

  readonly currentLanguage = signal<string>('en');

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage.set(
      this.translateService.currentLang || this.translateService.defaultLang || 'en',
    );
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLanguage.set(event.lang);
    });
  }

  switchLanguage(languageCode: string): void {
    if (this.currentLanguage() !== languageCode) {
      this.translateService.use(languageCode);
    }
  }

  isActive(languageCode: string): boolean {
    return this.currentLanguage() === languageCode;
  }
}
