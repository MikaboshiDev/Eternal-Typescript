---
description: >-
  ESLint es una herramienta que ayuda a identificar y corregir problemas en el
  código JavaScript y TypeScript, mejorando la calidad del código y manteniendo
  las mejores prácticas.
---

# Eslint

### Estructura del Archivo

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "ignorePatterns": ["node_modules/", "dist/", "lib/", "src/typings/"],
  "extends": ["plugin:@typescript-eslint/recommended", "eslint:recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "eslint-plugin-tsdoc"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "tsdoc/syntax": "off"
  }
}
```

### Propiedades de Configuración

1.  **`env`**

    * **Descripción**: Define los entornos en los que se ejecuta el código. Esto configura variables globales específicas para esos entornos.
    * **Valores**:
      * `browser`: Activa las variables globales del navegador.
      * `es2021`: Activa el soporte para ECMAScript 2021.
      * `node`: Activa las variables globales de Node.js.

    **Ejemplo**:

    ```json
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    }
    ```
2.  **`ignorePatterns`**

    * **Descripción**: Define patrones de archivos y directorios que ESLint debe ignorar al analizar el código.
    * **Ejemplo**:

    ```json
    "ignorePatterns": ["node_modules/", "dist/", "lib/", "src/typings/"]
    ```
3.  **`extends`**

    * **Descripción**: Especifica las configuraciones base que se aplican. Aquí se está utilizando configuraciones recomendadas para TypeScript y ESLint.
    * **Valores**:
      * `plugin:@typescript-eslint/recommended`: Configuración recomendada para proyectos TypeScript.
      * `eslint:recommended`: Configuración recomendada para proyectos JavaScript.

    **Ejemplo**:

    ```json
    "extends": ["plugin:@typescript-eslint/recommended", "eslint:recommended"]
    ```
4.  **`parser`**

    * **Descripción**: Define el parser que ESLint utilizará para analizar el código. Aquí se está utilizando el parser específico para TypeScript.
    * **Valor**: `@typescript-eslint/parser`

    **Ejemplo**:

    ```json
    "parser": "@typescript-eslint/parser"
    ```
5.  **`parserOptions`**

    * **Descripción**: Configura las opciones del parser, incluyendo la versión de ECMAScript y el tipo de módulos.
    * **Opciones**:
      * `ecmaVersion`: Define la versión de ECMAScript que se utiliza. Aquí se utiliza `latest` para la última versión.
      * `sourceType`: Define el tipo de módulos. Aquí se utiliza `module` para permitir la sintaxis de módulos ES6.

    **Ejemplo**:

    ```json
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    }
    ```
6.  **`plugins`**

    * **Descripción**: Especifica los plugins de ESLint que se utilizan para proporcionar reglas adicionales.
    * **Valores**:
      * `@typescript-eslint`: Plugin que proporciona reglas específicas para TypeScript.
      * `eslint-plugin-tsdoc`: Plugin que proporciona reglas para documentación TSDoc.

    **Ejemplo**:

    ```json
    "plugins": ["@typescript-eslint", "eslint-plugin-tsdoc"]
    ```
7.  **`rules`**

    * **Descripción**: Define reglas personalizadas para el análisis del código. Estas reglas pueden habilitarse, deshabilitarse o configurarse con opciones específicas.
    * **Reglas**:
      * `@typescript-eslint/no-explicit-any`: Deshabilita la regla que prohíbe el uso del tipo `any` en TypeScript.
      * `tsdoc/syntax`: Deshabilita la regla de sintaxis de TSDoc.

    **Ejemplo**:

    ```json
    "rules": {
      "@typescript-eslint/no-explicit-any": "off",
      "tsdoc/syntax": "off"
    }
    ```

### Ejemplos de Configuración Adicional

1.  **Habilitar una Regla de TypeScript**

    Para habilitar la regla `@typescript-eslint/explicit-module-boundary-types`, que exige que las funciones y métodos tengan tipos de retorno explícitos:

    ```json
    "rules": {
      "@typescript-eslint/explicit-module-boundary-types": "warn"
    }
    ```
2.  **Configurar la Regla de Máxima Longitud de Línea**

    Para configurar la longitud máxima de las líneas de código a 100 caracteres:

    ```json
    "rules": {
      "max-len": ["error", { "code": 100 }]
    }
    ```
