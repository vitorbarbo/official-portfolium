import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly name = 'Vitor Duarte Barbosa';
  readonly location = 'Campinas, São Paulo - Brazil';
  readonly email = 'vitordb91@gmail.com';
  readonly titleKey = 'HERO.TITLE';

  readonly typedText = signal('');
  readonly showCursor = signal(true);
  readonly isTyping = signal(true);

  private fullText = '';
  private typingIndex = 0;
  private typingInterval: ReturnType<typeof setInterval> | null = null;
  private cursorInterval: ReturnType<typeof setInterval> | null = null;
  private isAnimating = false;
  private restartTimeout: ReturnType<typeof setTimeout> | null = null;
  private langChangeSubscription: any;

  constructor(private readonly translateService: TranslateService) {
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.updateFullText();
    });
  }

  private updateFullText(): void {
    this.stopAllAnimations();
    const text = this.translateService.instant('HERO.TITLE');
    this.fullText = text;
    this.typingIndex = 0;
    this.typedText.set('');
    this.isAnimating = false;
    this.startTyping();
  }

  private stopAllAnimations(): void {
    if (this.typingInterval) {
      clearTimeout(this.typingInterval);
      this.typingInterval = null;
    }
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }
    this.isAnimating = false;
  }

  ngOnInit(): void {
    this.fullText = this.translateService.instant('HERO.TITLE');
    this.startTyping();
    this.toggleCursor();
  }

  private startTyping(): void {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    const animate = () => {
      if (!this.isAnimating) {
        return;
      }

      if (this.typingIndex < this.fullText.length) {
        this.typedText.set(this.fullText.slice(0, this.typingIndex + 1));
        this.typingIndex++;
        this.typingInterval = setTimeout(animate, 100);
      } else {
        this.isTyping.set(false);
        this.isAnimating = false;
        this.restartTimeout = setTimeout(() => {
          if (this.isAnimating) {
            return;
          }
          this.typingIndex = 0;
          this.typedText.set('');
          this.isTyping.set(true);
          this.startTyping();
        }, 3000);
      }
    };
    animate();
  }


  ngOnDestroy(): void {
    this.stopAllAnimations();
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
      this.cursorInterval = null;
    }
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private toggleCursor(): void {
    this.cursorInterval = setInterval(() => {
      this.showCursor.update(val => !val);
    }, 530);
  }

  scrollToAbout(): void {
    const targetElement = document.getElementById('about-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
