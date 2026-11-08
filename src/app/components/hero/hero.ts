import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly givenName = 'Vitor Duarte';
  readonly familyName = 'Barbosa';
  readonly location = 'Campinas, São Paulo — Brazil';
  readonly email = 'vitordb91@gmail.com';
  readonly phone = '+55 19 996637468';
  readonly phoneHref = 'tel:+5519996637468';
  readonly linkedInUrl = 'https://www.linkedin.com/in/vitor-barbosa-a06394206';
  readonly githubUrl = 'https://github.com/vitorbarbo';
  readonly cvPortugueseUrl = '/assets/cv/Curriculum_Vitae-Portuguese.pdf';
  readonly cvEnglishUrl = '/assets/cv/Curriculum_Vitae-English.pdf';
  readonly profileImagePath = 'assets/images/profile_1.webp';
}
