import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.name).toBe('Vitor Duarte Barbosa');
    expect(component.location).toBe('Campinas, São Paulo - Brazil');
    expect(component.email).toBe('vitordb91@gmail.com');
    expect(component.titleKey).toBe('HERO.TITLE');
  });

  it('should scroll to about section', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'about-section';
    document.body.appendChild(mockElement);
    const scrollIntoViewSpy = jest.fn();
    mockElement.scrollIntoView = scrollIntoViewSpy;

    component.scrollToAbout();

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    document.body.removeChild(mockElement);
  });

  it('should cleanup on destroy', () => {
    component.ngOnInit();
    const stopSpy = jest.spyOn(component as any, 'stopAllAnimations');
    component.ngOnDestroy();
    expect(stopSpy).toHaveBeenCalled();
  });
});
