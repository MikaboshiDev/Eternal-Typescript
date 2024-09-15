---
description: >-
  Commitlint es una herramienta que ayuda a asegurar que los mensajes de commit
  sigan un formato consistente, lo cual es útil para mantener un historial de
  cambios organizado y claro.
---

# Commitlint

Este archivo configura las reglas para el uso de Commitlint en tu proyecto. Commitlint es una herramienta que ayuda a asegurar que los mensajes de commit sigan un formato consistente, lo cual es útil para mantener un historial de cambios organizado y claro.

### Importaciones

```typescript
import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from "@commitlint/types";
```

* `UserConfig` es un tipo que define la estructura de configuración para Commitlint.
* `RuleConfigSeverity` es una enumeración que define los niveles de severidad para las reglas de Commitlint.

### Configuración

```typescript
const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', ['foo', "fix", "add", "remove"]],
    "header-max-length": [RuleConfigSeverity.Error, "always", 500], // esta regla es para limitar el tamaño del mensaje del commit 
  },
  // ...
};

export default Configuration;
```

### **Propiedades de Configuración**

1. **`extends`**
   * **Descripción**: Define la configuración base que se extiende. Aquí se está utilizando la configuración convencional que es comúnmente usada en proyectos que siguen las convenciones de Angular.
   * **Ejemplo**: `['@commitlint/config-conventional']`
2. **`parserPreset`**
   * **Descripción**: Define el preset del parser que se utiliza para analizar los mensajes de commit. En este caso, se utiliza el preset `conventional-changelog-atom` que sigue el formato de commit usado por el proyecto Atom.
   * **Ejemplo**: `'conventional-changelog-atom'`
3. **`formatter`**
   * **Descripción**: Especifica el formateador que se usa para mostrar los resultados de Commitlint. En este caso, se utiliza el formateador `@commitlint/format` para presentar los mensajes de manera estructurada.
   * **Ejemplo**: `'@commitlint/format'`
4. **`rules`**
   * **Descripción**: Define las reglas específicas que se aplican a los mensajes de commit. Las reglas son configurables y permiten personalizar cómo se deben estructurar los mensajes de commit.
   * **`type-enum`**
     * **Descripción**: Esta regla define los tipos de commit permitidos. El tipo debe estar en el conjunto de valores proporcionado (`['foo', 'fix', 'add', 'remove']` en este caso).
     * **Severidad**: Error
     * **Ejemplo de Mensaje de Commit Aceptado**: `fix: arreglar el bug de validación`
     * **Ejemplo de Mensaje de Commit Rechazado**: `update: mejorar rendimiento`
   * **`header-max-length`**
     * **Descripción**: Esta regla limita la longitud máxima del encabezado del mensaje de commit. En este caso, el límite es de 500 caracteres.
     * **Severidad**: Error
     * **Ejemplo de Mensaje de Commit Aceptado**: `feat: mejorar el rendimiento de la aplicación al optimizar las consultas a la base de datos`
     * **Ejemplo de Mensaje de Commit Rechazado**: `fix: corregir un problema que hace que la aplicación se bloquee al iniciar` (si el mensaje es más largo de 500 caracteres)

### Ejemplos Adicionales de Configuración

1.  **Regla de Tipo de Commit**

    ```typescript
    'type-enum': [RuleConfigSeverity.Warn, 'always', ['feat', 'fix', 'docs', 'style', 'refactor']]
    ```

    * Aquí, se permite un conjunto diferente de tipos de commit y la severidad se establece en advertencia en lugar de error.
2.  **Regla de Longitud de Encabezado**

    ```typescript
    'header-max-length': [RuleConfigSeverity.Warn, 'always', 100]
    ```

    * Se limita la longitud del encabezado a 100 caracteres y la severidad se establece en advertencia.
