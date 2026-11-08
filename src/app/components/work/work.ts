import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './work.html',
  styleUrl: './work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent implements OnInit {
  readonly featuredKey = 'HAUSZ';
  readonly companyKeys = ['RATOEIRA', 'AHOY', 'QIMA'];
  readonly companyNames: Record<string, string> = {
    HAUSZ: 'Hausz',
    RATOEIRA: 'Ratoeira Ads',
    AHOY: 'Ahoy by Belago',
    QIMA: 'QIMA/WQS',
  };

  readonly translatedAchievements = signal<Record<string, string[]>>({});

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadFeaturedAchievements();
    this.translateService.onLangChange.subscribe(() => this.loadFeaturedAchievements());
  }

  private loadFeaturedAchievements(): void {
    const translated = this.translateService.instant(
      `EXPERIENCE.COMPANIES.${this.featuredKey}.ACHIEVEMENTS`,
    );
    this.translatedAchievements.set({
      [this.featuredKey]: Array.isArray(translated) ? translated : [],
    });
  }

  getAchievements(companyKey: string): string[] {
    return this.translatedAchievements()[companyKey] || [];
  }
}
