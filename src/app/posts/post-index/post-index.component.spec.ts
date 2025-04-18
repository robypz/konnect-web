import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIndexComponent } from './post-index.component';

describe('PostIndexComponent', () => {
  let component: PostIndexComponent;
  let fixture: ComponentFixture<PostIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
