import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeModulesComponent } from './node-modules.component';

describe('NodeModulesComponent', () => {
  let component: NodeModulesComponent;
  let fixture: ComponentFixture<NodeModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeModulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
