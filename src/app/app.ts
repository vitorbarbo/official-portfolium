import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { HeroComponent } from './components/hero/hero';
import { LanguagesComponent } from './components/languages/languages';
import { SkillsComponent } from './components/skills/skills';
import { Layout } from './components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    Layout,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    LanguagesComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
