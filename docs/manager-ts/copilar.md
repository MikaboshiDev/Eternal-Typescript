---
description: Copilar el proyecto para poder subirlo a un host
---

# Copilar

Como el nombre lo dice el proyecto esta escrito en TS por lo que necesitas poder copilarlo para poder tenerlo en js, hay excepciones en los que algunos host no es necesario esta función ya que pueden cargar TS sin problemas.

<figure><img src="../.gitbook/assets/Captura de pantalla 2023-12-03 162722.png" alt=""><figcaption><p>Scripts de arranque con NODE.JS</p></figcaption></figure>

Antes de arrancar la compilación, recuerda usar el buscador de tu editor de código el termino .ts ya que como lo pasaras a js necesitas hacer que todas las funciones que busquen y lean ts pasen a js

Tambien deberas verificar que la estructura de tsconfig.json sea la siguiente:

```json5
{
  "compilerOptions": {
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true,                                /* Skip type checking all .d.ts files. */
    "resolveJsonModule": true                            /* Include modules imported with .json extension */
  }
}
```

Una vez que verificamos que los .ts han sido cambiados a .js y que la estructura del archivo tsconfig.json es la correcta puedes iniciar el proceso con <mark style="color:red;">npm run build</mark>  esto lo que hará es copilar todas las carpetas y sus contenidos de raíz en una carpeta dist. Ahora ya podrás subirlo a un HOST
