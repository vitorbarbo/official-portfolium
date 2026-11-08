import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default tab', () => {
    expect(component.activeTab()).toBe('about');
  });

  it('should set active tab', () => {
    component.setActiveTab('contact');
    expect(component.activeTab()).toBe('contact');
  });

  it('should expose the phone number as its own contact label', () => {
    const phone = component.contactLinks.find((link) => link.href.startsWith('tel:'));
    expect(phone?.label).toBe('+55 19 996637468');
    expect(phone?.href).toBe('tel:+5519996637468');
  });
});
