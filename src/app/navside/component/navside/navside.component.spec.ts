import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsideComponent } from './navside.component';

describe('DashboardComponent', () => {
  let component: NavsideComponent;
  let fixture: ComponentFixture<NavsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
