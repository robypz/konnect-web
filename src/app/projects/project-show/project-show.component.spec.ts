import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShowComponent } from './project-show.component';

describe('ProjectShowComponent', () => {
  let component: ProjectShowComponent;
  let fixture: ComponentFixture<ProjectShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
