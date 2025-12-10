import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, signal } from '@angular/core';
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
  protected readonly languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  protected currentLanguage: string = 'en';
  protected readonly isOpen = signal<boolean>(false);

  constructor(
    private readonly translateService: TranslateService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.currentLanguage = this.translateService.currentLang || this.translateService.defaultLang || 'en';
    
    this.translateService.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
      this.cdr.markForCheck();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-switcher')) {
      this.closeDropdown();
    }
  }

  protected toggleDropdown(): void {
    this.isOpen.update(value => !value);
    this.cdr.markForCheck();
  }

  protected closeDropdown(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.cdr.markForCheck();
    }
  }

  protected switchLanguage(languageCode: string): void {
    if (this.currentLanguage !== languageCode) {
      this.currentLanguage = languageCode;
      this.translateService.use(languageCode);
      this.closeDropdown();
      this.cdr.markForCheck();
    }
  }

  protected isActive(languageCode: string): boolean {
    return this.currentLanguage === languageCode;
  }
}

