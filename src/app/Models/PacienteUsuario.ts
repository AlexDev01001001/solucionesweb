export interface PacienteUsuario {
  idPaciente?: number;
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  contraseña: string;
  fechaNacimiento: string;
  fechaRegistro?: string; 
}