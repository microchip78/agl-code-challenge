import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render hader', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('header div').textContent).toContain(
      'Fantastic Pets'
    );
  });

  // tslint:disable-next-line: quotemark
  it("should have footer with 'AGL Code Challenge' & 'Chirag Patel' in it", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('footer span:first-of-type').textContent
    ).toContain('AGL Code Challenge');
    expect(
      compiled.querySelector('footer span:last-of-type').textContent
    ).toContain('Chirag Patel');
  });
});
