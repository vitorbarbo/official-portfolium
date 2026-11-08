import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

type TabType = 'about' | 'availability' | 'contact';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly activeTab = signal<TabType>('about');
  readonly isAvailable = signal<boolean>(true);

  readonly tabs = [
    { id: 'about' as TabType, labelKey: 'ABOUT.TABS.ABOUT_ME' },
    { id: 'availability' as TabType, labelKey: 'ABOUT.TABS.AVAILABILITY' },
    { id: 'contact' as TabType, labelKey: 'ABOUT.TABS.CONTACT' },
  ];

  readonly bodyKeys = [
    'ABOUT.BODY.P1',
    'ABOUT.BODY.P2',
    'ABOUT.BODY.P3',
    'ABOUT.BODY.P4',
    'ABOUT.BODY.P5',
    'ABOUT.BODY.P6',
  ];

  readonly contactLinks = [
    {
      href: 'mailto:vitordb91@gmail.com',
      label: 'vitordb91@gmail.com',
      external: false,
    },
    {
      href: 'tel:+5519996637468',
      label: '+55 19 996637468',
      external: false,
    },
    {
      href: 'https://www.linkedin.com/in/vitor-barbosa-a06394206',
      label: 'LinkedIn',
      external: true,
    },
    {
      href: 'https://github.com/vitorbarbo',
      label: 'GitHub',
      external: true,
    },
  ];

  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }
}
