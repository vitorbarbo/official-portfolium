import { CommonModule } from '@angular/common';
import { Component, signal, computed, ChangeDetectionStrategy, OnInit, effect, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../services/user-service';
import { GitHubRepo } from '../../models/github-repo.interface';
import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type TabType = 'about' | 'availability' | 'contact' | 'projects';

export interface Project {
  id: string;
  name: string;
  title: string;
  date: string;
  description: string;
  learned?: string;
  githubUrl: string;
  technologies: string | null;
  language: string | null;
  owner: string;
  repo: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  readonly activeTab = signal<TabType>('about');
  readonly isAvailable = signal<boolean>(true);
  readonly profileImagePath = 'assets/images/profile_1.webp';
  readonly currentProjectIndex = signal<number>(0);
  readonly slideDirection = signal<'left' | 'right' | null>(null);
  readonly projects = signal<Project[]>([]);

  readonly tabs = [
    { id: 'about' as TabType, labelKey: 'ABOUT.TABS.ABOUT_ME' },
    { id: 'availability' as TabType, labelKey: 'ABOUT.TABS.AVAILABILITY' },
    { id: 'projects' as TabType, labelKey: 'ABOUT.TABS.PROJECTS' },
    { id: 'contact' as TabType, labelKey: 'ABOUT.TABS.CONTACT' },
  ];

  readonly achievementKeys = [
    'ENHANCED_CODE_EFFICIENCY',
    'FAST_TIMELY_DELIVERY',
    'TOP_DEVELOPER',
    'GLOBAL_STAKEHOLDERS',
  ];

  readonly contactLinks = [
    { href: 'mailto:vitordb91@gmail.com', icon: '📧', label: 'vitordb91@gmail.com' },
    { href: 'tel:+5519996637468', icon: '📞', label: '+55 19 9 96637468' },
    { href: 'https://www.linkedin.com/in/vitor-barbosa-a06394206', icon: '💼', label: 'LinkedIn', external: true },
    { href: 'https://github.com/vitorbarbo', icon: '🐙', label: 'GitHub', external: true },
  ];

  readonly currentProject = computed(() => {
    const index = this.currentProjectIndex();
    const projectsList = this.projects();
    return projectsList[index] || null;
  });


  readonly canNavigate = computed(() => this.projects().length > 1);
  readonly projectLanguages = signal<string[]>([]);
  readonly isLoadingLanguages = signal<boolean>(false);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cancelPreviousLanguages$ = new Subject<void>();

  constructor(private readonly userService: UserService) {
    effect(() => {
      const project = this.currentProject();
      if (project) {
        this.loadProjectLanguages(project.owner, project.repo);
      } else {
        this.projectLanguages.set([]);
        this.isLoadingLanguages.set(false);
      }
    });

    // Cleanup when component is destroyed
    this.destroyRef.onDestroy(() => {
      this.cancelPreviousLanguages$.next();
      this.cancelPreviousLanguages$.complete();
    });
  }

  ngOnInit(): void {
    this.userService.fetchGitRepos().subscribe({
      next: (repos) => this.projects.set(this.mapReposToProjects(repos)),
      error: () => this.projects.set([])
    });
  }

  private mapReposToProjects(repos: GitHubRepo[]): Project[] {
    return repos
      .filter(repo => !repo.fork && repo.description?.trim())
      .map(repo => {
        const owner = repo.owner?.login;
        return {
          id: repo.name.toLowerCase().replace(/\s+/g, '-'),
          name: repo.name,
          title: repo.name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
          date: new Date(repo.created_at).getFullYear().toString(),
          description: repo.description || '',
          githubUrl: repo.html_url,
          technologies: repo.language,
          language: repo.language,
          owner,
          repo: repo.name
        };
      })
      .sort((a, b) => parseInt(b.date) - parseInt(a.date));
  }

  private loadProjectLanguages(owner: string, repo: string): void {
    this.cancelPreviousLanguages$.next();

    this.projectLanguages.set([]);
    this.isLoadingLanguages.set(true);

    this.userService.fetchRepoLanguages(owner, repo)
      .pipe(
        takeUntil(this.cancelPreviousLanguages$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (languages) => {
          const languagesList = Object.keys(languages);

          if (languagesList.length > 0) {
            this.projectLanguages.set(languagesList.sort());
          } else {
            this.projectLanguages.set([]);
          }
          this.isLoadingLanguages.set(false);
        },
        error: () => {
          this.projectLanguages.set([]);
          this.isLoadingLanguages.set(false);
        }
      });
  }

  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  getAchievementIcon(index: number): string {
    return ['⚡', '🚀', '🏆', '🌍'][index % 4];
  }

  getAchievementTitle(key: string): string {
    return `ABOUT.ACHIEVEMENTS.${key}.TITLE`;
  }

  getAchievementDescription(key: string): string {
    return `ABOUT.ACHIEVEMENTS.${key}.DESCRIPTION`;
  }

  goToPreviousProject(): void {
    const index = this.currentProjectIndex();
    const max = this.projects().length - 1;
    this.navigateToProject(index > 0 ? index - 1 : max, 'right');
  }

  goToNextProject(): void {
    const index = this.currentProjectIndex();
    const max = this.projects().length - 1;
    this.navigateToProject(index < max ? index + 1 : 0, 'left');
  }

  goToProject(index: number): void {
    if (index === this.currentProjectIndex()) return;
    const direction = index > this.currentProjectIndex() ? 'left' : 'right';
    this.navigateToProject(index, direction);
  }

  private navigateToProject(index: number, direction: 'left' | 'right'): void {
    this.slideDirection.set(direction);
    setTimeout(() => {
      this.currentProjectIndex.set(index);
      setTimeout(() => this.slideDirection.set(null), 500);
    }, 0);
  }
}
