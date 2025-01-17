---
description: Ejecución de scripts y instalación de dependencias en python
---

# Ejecución y Instalación en Python

### Introducción

Python es uno de los lenguajes de programación más populares debido a su simplicidad y versatilidad. Este tutorial te guiará en el proceso de ejecución de scripts de Python y la instalación de sus dependencias, con ejemplos prácticos y enlaces útiles para más información.

***

### Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente:

1. **Python instalado:** Descarga e instala la versión más reciente de [Python desde su sitio oficial](https://www.python.org/downloads/).
2. **Editor de texto o IDE:** Puede ser un editor como [VS Code](https://code.visualstudio.com/) o un IDE como [PyCharm](https://www.jetbrains.com/pycharm/).
3. **Acceso a la línea de comandos:** Terminal en Linux/macOS o PowerShell/Command Prompt en Windows.

***

### Instalación de dependencias

Las dependencias de Python son bibliotecas o paquetes que tu script necesita para funcionar correctamente.

#### 1. Crear un entorno virtual (opcional pero recomendado)

Un entorno virtual aísla las dependencias de tu proyecto del sistema global.

**Comandos:**

```bash
# Crear un entorno virtual
python -m venv venv

# Activar el entorno virtual
# En Windows
venv\Scripts\activate

# En macOS/Linux
source venv/bin/activate

# Desactivar el entorno virtual
# Solo ejecuta el comando 'deactivate' mientras está activo
deactivate
```

> **Nota:** Aprende más sobre entornos virtuales en la [documentación oficial](https://docs.python.org/3/tutorial/venv.html).

#### 2. Instalar dependencias

Las dependencias se definen generalmente en un archivo `requirements.txt`. Para instalarlas:

**Crear un archivo `requirements.txt`:**

```
numpy==1.21.0
pandas>=1.3.0,<2.0.0
requests
```

**Instalar dependencias desde el archivo:**

```bash
pip install -r requirements.txt
```

Para instalar una librería individual:

```bash
pip install nombre-del-paquete
```

> **Link de apoyo:** [Documentación oficial de pip](https://pip.pypa.io/en/stable/).

#### Verificar dependencias instaladas

Lista las dependencias instaladas en tu entorno:

```bash
pip list
```

Exportar las dependencias actuales:

```bash
pip freeze > requirements.txt
```

***

### Ejecución de scripts de Python

#### Ejecutar un script en la terminal

1. Abre la terminal o el command prompt.
2. Navega al directorio donde está ubicado tu script.
3. Ejecuta el script:

**Ejemplo:**

```bash
python nombre_del_script.py
```

#### Ejecutar desde un IDE

1. Abre el script en tu IDE favorito.
2. Configura el entorno de ejecución (opcional).
3. Presiona el botón de “Run” o usa un atajo como `F5` (en la mayoría de los IDEs).

***

### Ejemplo completo

1. **Crea el script `mi_script.py`:**

```python
import requests

def obtener_datos():
    respuesta = requests.get('https://jsonplaceholder.typicode.com/posts/1')
    if respuesta.status_code == 200:
        print(respuesta.json())
    else:
        print("Error al obtener los datos")

if __name__ == "__main__":
    obtener_datos()
```

2. **Crea `requirements.txt`:**

```
requests
```

3. **Instala las dependencias:**

```bash
pip install -r requirements.txt
```

4. **Ejecuta el script:**

```bash
python mi_script.py
```

Salida esperada:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

***

### Tablas de referencia

| Comando                    | Descripción                               |
| -------------------------- | ----------------------------------------- |
| `python script.py`         | Ejecuta un script de Python.              |
| `pip install paquete`      | Instala un paquete en el entorno actual.  |
| `pip list`                 | Lista los paquetes instalados.            |
| `pip freeze > archivo`     | Exporta las dependencias instaladas.      |
| `python -m venv venv`      | Crea un entorno virtual.                  |
| `source venv/bin/activate` | Activa un entorno virtual en Linux/macOS. |
| `venv\Scripts\activate`    | Activa un entorno virtual en Windows.     |
| `deactivate`               | Desactiva el entorno virtual.             |

***

### Recursos adicionales

* [Documentación oficial de Python](https://docs.python.org/3/)
* [Documentación de pip](https://pip.pypa.io/en/stable/)
* [Tutorial sobre entornos virtuales](https://realpython.com/python-virtual-environments-a-primer/)
