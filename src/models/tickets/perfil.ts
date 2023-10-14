import { Schema, Types, model, Model } from 'mongoose';
const UserSchema = new Schema({
  soporte: String,
  estado: { type: String, default: 'Disconnected' },
  horario: { type: String, default: `No Specified Hours` },
  biografia: String,
  correo: String,
  tickets: { type: Number, default: 0 },
  redes: { type: Array, default: [] },
  reseñas: { type: Array, default: [] },
  calificaciones: { type: Array, default: [] },
});
const UserModel = model('Ticket-Perfil', UserSchema);
export default UserModel;