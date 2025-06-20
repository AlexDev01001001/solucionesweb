import { Odontologo } from "./Odontologo";

export interface Horario {
  id: number;
  horaDisp: string;
  fechaDisp: string;
  odontologo: Odontologo;
}
