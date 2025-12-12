import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Layout } from './layout';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have codeLines array', () => {
    expect(component.codeLines.length).toBeGreaterThan(0);
  });
});
