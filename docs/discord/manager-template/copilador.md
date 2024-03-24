---
description: Copilar el proyecto para poder subirlo a un host
---

# Copilar JS

Como el nombre lo dice el proyecto esta escrito en TS por lo que necesitas poder copilarlo para poder tenerlo en js, hay excepciones en los que algunos host no es necesario esta función ya que pueden cargar TS sin problemas.

```json
  "scripts": {
    "build": "tsc",
    "dev": "ts-node-dev src/shulker.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

Antes de arrancar la compilación, recuerda usar el buscador de tu editor de código el termino .ts ya que como lo pasaras a js necesitas hacer que todas las funciones que busquen y lean ts pasen a js

Tambien deberas verificar que la estructura de tsconfig.json sea la siguiente:

```json5
{
  "compilerOptions": {
    "target": "es2016",                                  
    "module": "commonjs",                                
    "esModuleInterop": true,                            
    "forceConsistentCasingInFileNames": true,            
    "strict": true,                                      
    "skipLibCheck": true,                                
    "resolveJsonModule": true                            
  }
}
```

Una vez que verificamos que los .ts han sido cambiados a .js y que la estructura del archivo tsconfig.json es la correcta puedes iniciar el proceso con <mark style="color:red;">npm run build</mark>  esto lo que hará es copilar todas las carpetas y sus contenidos de raíz en una carpeta dist. Ahora ya podrás subirlo a un <mark style="background-color:orange;">HOST</mark>
