import { TestBed } from '@angular/core/testing';

import { PacienteUsuarioService } from './paciente-usuario.service';

describe('PacienteUsuarioService', () => {
  let service: PacienteUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
