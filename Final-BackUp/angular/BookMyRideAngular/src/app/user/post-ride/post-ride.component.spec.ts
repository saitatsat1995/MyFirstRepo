import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRideComponent } from './post-ride.component';

describe('PostRideComponent', () => {
  let component: PostRideComponent;
  let fixture: ComponentFixture<PostRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
