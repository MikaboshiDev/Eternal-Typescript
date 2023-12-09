---
description: Registro y Login dentro de el API CLIENT
---

# Registro y Login

Bueno como ya  te abras dado cuenta debes de registrarte la primera vez que usas o ingresas a esta API esto debido a protocolos de seguridad del cliente.

> El registro y logueo dentro del cliente es obligatorio cada que accedas a alguna de las funciones mencionadas en esta documentación

El entorno de la WEB y de la API son zonas diferentes por lo que no funcionan del todo igual, explicándolo mejor si tienes roles de desarrollador en la web pero no se te asignaron igual en la API CLIENT no podrás acceder a los sitios de desarrollador.

```typescript
import { Schema, Types, model, Model } from "mongoose";

const UserSchema = new Schema(
	{
		password: { type: String, default: "Sin registrar" },
		email: { type: String, required: true, unique: true },
		rank: { type: String, default: "user" },
		name: { type: String, required: true },
		id: { type: String, required: true },
		products: { type: Array },
		invoice: { type: Array },
		rangos: { type: Array },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
const UserModel = model("User-model", UserSchema);
export default UserModel;
```

Al momento de hacer el logueo dentro la API te dará dos cosas:

1. Contraseña: Tu contraseña será encriptada para evitar robos o suplantación de datos
2. Token: Se te genera un token único que podrás usar para acceder a los demás sitios de la api
