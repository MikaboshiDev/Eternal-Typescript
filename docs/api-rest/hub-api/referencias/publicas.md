---
description: >-
  Url's de acceso publico, no se pide ninguna autenticación o llave para poder
  acceder a ellas
---

# Publicas



## Youtube Descarga

<mark style="color:orange;">`GET`</mark> `/youtube/download/:id`

Convierte y descarga videos de youtube a partir de su ID&#x20;

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

Path

| Name | Type   | Description                    |
| ---- | ------ | ------------------------------ |
| `id` | string | ID del video dentro de youtube |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
  "status": true,
  "message": "Download and conversion completed",
  "path": "files/music/41MeYv5iCkE.mp3",
  "timeDownload": "2024-06-05T15:01:54.223Z",
  "data": {
    "title": "Fire Force Opening FULL \"Inferno\" - Cover Español Latino",
    "size": "235",
    "channel": "David Delgado - Laharl -"
  }
}
```
{% endtab %}

{% tab title="400" %}
```json
{
  "error": "Invalid request id video not found"
}
```
{% endtab %}
{% endtabs %}
