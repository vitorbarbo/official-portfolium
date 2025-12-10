import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  protected readonly name = 'Vitor Duarte Barbosa';
  protected readonly location = 'Campinas, São Paulo - Brazil';
  protected readonly email = 'vitordb91@gmail.com';

  protected readonly typedText = signal('');
  protected readonly showCursor = signal(true);
  protected readonly isTyping = signal(true);
  protected readonly titleKey = 'HERO.TITLE';

  private fullText = '';
  private typingIndex = 0;
  private typingInterval: ReturnType<typeof setInterval> | null = null;
  private cursorInterval: ReturnType<typeof setInterval> | null = null;

  private isAnimating = false;
  private restartTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.updateFullText();
    });
  }

  private updateFullText(): void {
    this.stopAllAnimations();
    this.translateService.get('HERO.TITLE').subscribe(text => {
      this.fullText = text;
      this.typingIndex = 0;
      this.typedText.set('');
      this.isAnimating = false;
      this.startTyping();
    });
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
    this.translateService.get('HERO.TITLE').subscribe(text => {
      this.fullText = text;
      this.startTyping();
      this.toggleCursor();
    });
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
  }

  private toggleCursor(): void {
    this.cursorInterval = setInterval(() => {
      this.showCursor.update(val => !val);
    }, 530);
  }

  protected scrollToAbout(): void {
    const targetElement = document.getElementById('about-section');
    
    if (targetElement) {
      const navHeight = 80;
      
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        window.scrollBy({
          top: -navHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
}
