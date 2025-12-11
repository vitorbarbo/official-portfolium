import { Component, ChangeDetectionStrategy, HostListener, ElementRef, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export type FilterOption = 'experience' | 'category' | 'none';

@Component({
  selector: 'app-skill-filter-dropdown',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skill-filter-dropdown.html',
  styleUrl: './skill-filter-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillFilterDropdownComponent {
  readonly isOpen = signal<boolean>(false);
  readonly selectedFilter = signal<FilterOption>('none');
  readonly filterChange = output<FilterOption>();

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  selectFilter(filter: FilterOption): void {
    this.selectedFilter.set(filter);
    this.filterChange.emit(filter);
    this.isOpen.set(false);
  }

  isActive(filter: FilterOption): boolean {
    return this.selectedFilter() === filter;
  }
}

