import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { HeroComponent } from './components/hero/hero';
import { LanguagesComponent } from './components/languages/languages';
import { SkillsComponent } from './components/skills/skills';
import { WorkComponent } from './components/work/work';
import { Layout } from './components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    TranslateModule,
    Layout,
    HeroComponent,
    AboutComponent,
    WorkComponent,
    ExperienceComponent,
    SkillsComponent,
    LanguagesComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly cvPortugueseUrl = '/assets/cv/Curriculum_Vitae-Portuguese.pdf';
  readonly cvEnglishUrl = '/assets/cv/Curriculum_Vitae-English.pdf';
  readonly contactLinks = [
    { href: 'tel:+5519996637468', label: '+55 19 996637468', external: false },
    { href: 'mailto:vitordb91@gmail.com', label: 'vitordb91@gmail.com', external: false },
    {
      href: 'https://www.linkedin.com/in/vitor-barbosa-a06394206',
      label: 'LinkedIn',
      external: true,
    },
    { href: 'https://github.com/vitorbarbo', label: 'GitHub', external: true },
  ];
}
