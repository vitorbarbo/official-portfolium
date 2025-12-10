import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, ElementRef, signal, output } from '@angular/core';
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
  protected readonly isOpen = signal<boolean>(false);
  protected readonly selectedFilter = signal<FilterOption>('none');
  
  readonly filterChange = output<FilterOption>();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  protected toggleDropdown(): void {
    this.isOpen.update(value => !value);
    this.cdr.markForCheck();
  }

  protected closeDropdown(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.cdr.markForCheck();
    }
  }

  protected selectFilter(filter: FilterOption): void {
    this.selectedFilter.set(filter);
    this.filterChange.emit(filter);
    this.closeDropdown();
    this.cdr.markForCheck();
  }

  protected isActive(filter: FilterOption): boolean {
    return this.selectedFilter() === filter;
  }
}

