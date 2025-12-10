import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../services/user-service';
import { GitHubRepo } from '../../models/github-repo.interface';

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
  protected readonly activeTab = signal<TabType>('about');
  protected readonly isAvailable = signal<boolean>(true);
  protected readonly profileImagePath = 'assets/images/profile_1.webp';
  protected readonly currentProjectIndex = signal<number>(0);
  protected readonly slideDirection = signal<'left' | 'right' | null>(null);

  protected readonly tabs = [
    { id: 'about' as TabType, labelKey: 'ABOUT.TABS.ABOUT_ME' },
    { id: 'availability' as TabType, labelKey: 'ABOUT.TABS.AVAILABILITY' },
    { id: 'projects' as TabType, labelKey: 'ABOUT.TABS.PROJECTS' },
    { id: 'contact' as TabType, labelKey: 'ABOUT.TABS.CONTACT' },
  ];

  protected readonly projects = signal<Project[]>([]);

  protected readonly achievementKeys = [
    'ENHANCED_CODE_EFFICIENCY',
    'FAST_TIMELY_DELIVERY',
    'TOP_DEVELOPER',
    'GLOBAL_STAKEHOLDERS',
  ];

  protected readonly contactLinks = [
    { href: 'mailto:vitordb91@gmail.com', icon: '📧', label: 'vitordb91@gmail.com' },
    { href: 'tel:+5519996637468', icon: '📞', label: '+55 19 9 96637468' },
    { href: 'https://www.linkedin.com/in/vitor-barbosa-a06394206', icon: '💼', label: 'LinkedIn', external: true },
    { href: 'https://github.com/vitorbarbo', icon: '🐙', label: 'GitHub', external: true },
  ];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.fetchRepos();
  }

  private fetchRepos(): void {
    this.userService.fetchGitRepos().subscribe({
      next: (repos: GitHubRepo[]) => {
        const mappedProjects = this.mapReposToProjects(repos);
        this.projects.set(mappedProjects);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching repos:', error);
      }
    });
  }

  private mapReposToProjects(repos: GitHubRepo[]): Project[] {
    // Filter out forks and repos without description
    return repos
      .filter(repo => !repo.fork && repo.description !== null && repo.description.trim() !== '')
      .map(repo => this.mapRepoToProject(repo))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private mapRepoToProject(repo: GitHubRepo): Project {
    // const technologies = this.extractTechnologies(repo);
    const date = new Date(repo.created_at).getFullYear().toString();
    
    return {
      id: repo.name.toLowerCase().replace(/\s+/g, '-'),
      name: repo.name,
      title: this.formatProjectName(repo.name),
      date: date,
      description: repo.description || 'No description available.',
      githubUrl: repo.html_url,
      technologies: repo.language,
      language: repo.language
    };
  }

  private formatProjectName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  protected setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  protected getAchievementIcon(index: number): string {
    const icons = ['⚡', '🚀', '🏆', '🌍'];
    return icons[index % icons.length];
  }

  protected getCurrentProject(): Project | null {
    const index = this.currentProjectIndex();
    const projectsList = this.projects();
    return projectsList[index] || null;
  }

  protected goToPreviousProject(): void {
    const currentIndex = this.currentProjectIndex();
    const projectsList = this.projects();
    const newIndex = currentIndex > 0 ? currentIndex - 1 : projectsList.length - 1;
    this.slideDirection.set('right');
    setTimeout(() => {
      this.currentProjectIndex.set(newIndex);
      setTimeout(() => this.slideDirection.set(null), 500);
    }, 10);
  }

  protected goToNextProject(): void {
    const currentIndex = this.currentProjectIndex();
    const projectsList = this.projects();
    const newIndex = currentIndex < projectsList.length - 1 ? currentIndex + 1 : 0;
    this.slideDirection.set('left');
    setTimeout(() => {
      this.currentProjectIndex.set(newIndex);
      setTimeout(() => this.slideDirection.set(null), 500);
    }, 10);
  }

  protected goToProject(index: number): void {
    const currentIndex = this.currentProjectIndex();
    if (index === currentIndex) return;
    
    const direction = index > currentIndex ? 'left' : 'right';
    this.slideDirection.set(direction);
    setTimeout(() => {
      this.currentProjectIndex.set(index);
      setTimeout(() => this.slideDirection.set(null), 500);
    }, 10);
  }

  protected canGoPrevious(): boolean {
    return this.projects().length > 1;
  }

  protected canGoNext(): boolean {
    return this.projects().length > 1;
  }

  protected getProjectsCount(): number {
    return this.projects().length;
  }
}
