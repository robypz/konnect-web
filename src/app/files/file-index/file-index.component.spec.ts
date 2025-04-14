import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileIndexComponent } from './file-index.component';

describe('FileIndexComponent', () => {
  let component: FileIndexComponent;
  let fixture: ComponentFixture<FileIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
