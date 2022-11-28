import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakiComponent } from './maki.component';

describe('MakiComponent', () => {
  let component: MakiComponent;
  let fixture: ComponentFixture<MakiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
