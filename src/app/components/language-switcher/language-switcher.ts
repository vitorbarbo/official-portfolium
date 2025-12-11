import { Component, ChangeDetectionStrategy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  readonly languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  readonly currentLanguage = signal<string>('en');
  readonly isOpen = signal<boolean>(false);

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage.set(this.translateService.currentLang || this.translateService.defaultLang || 'en');
    this.translateService.onLangChange.subscribe(event => {
      this.currentLanguage.set(event.lang);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.language-switcher')) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  switchLanguage(languageCode: string): void {
    if (this.currentLanguage() !== languageCode) {
      this.translateService.use(languageCode);
      this.isOpen.set(false);
    }
  }

  isActive(languageCode: string): boolean {
    return this.currentLanguage() === languageCode;
  }
}

