import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  readonly navItems = [
    { href: '#about-section', key: 'NAV.ABOUT' },
    { href: '#work-section', key: 'NAV.WORK' },
    { href: '#experience-section', key: 'NAV.EXPERIENCE' },
    { href: '#skills-section', key: 'NAV.SKILLS' },
    { href: '#contact-section', key: 'NAV.CONTACT' },
  ];
}
