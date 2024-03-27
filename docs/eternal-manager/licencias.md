---
description: Licencias de los productos mencionados en esta documentación
---

# Licencias

Aunque nuestros productos son gratuitos, ofrecemos la opción de solicitar una licencia de uso (opcional) para recibir un soporte preferencial por parte de nuestro grupo. Esta solicitud de licencia tiene como objetivo principal mejorar las funciones de cada uno de los repositorios dentro de nuestra comunidad.

Es importante destacar que estas licencias son completamente opcionales. Sin embargo, en caso de optar por no solicitar una licencia, no se brindará un soporte preferencial en caso de errores del producto o código.

Creemos que esta medida nos permite asignar nuestros recursos de manera más efectiva para mejorar y mantener la calidad de nuestros productos, al tiempo que brindamos un servicio de soporte más eficiente a aquellos usuarios que deciden contribuir con nosotros a través de esta opción.

<figure><img src="../.gitbook/assets/Captura de pantalla 2023-12-04 110759.png" alt=""><figcaption></figcaption></figure>

Estas licencias las puedes solicitar mediante el servidor de discord o mediante servicio WEB en el siguiente enlace [Eternal Manager](broken-reference)

{% tabs %}
{% tab title="JavaScript" %}
```javascript
import axios from "axios";

async function checkLicense(license, product, version) {
	const URL = "http://<your_ip>:<port>/api/client";
	const API_KEY = "API_KEY";

	const res = await axios.post(
		URL,
		{
			license,
			product,
			version,
		},
		{ headers: { Authorization: API_KEY } }
	).catch(e => e);

	if (res.data?.status_overview !== "success" && res.data?.status_code !== 200) {
		return false;
	}

	return res.data;
}

export default checkLicense;
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

URL_ENDPOINT = "http://<your_ip>:<port>/api/client"
API_KEY = "YOUR_API_KEY"

licensekey = "YOUR_LICENSE_KEY" # Get this from a config file
product = "YOUR_PRODUCT_NAME"
version = "PRODUCT_VERSION"

headers = {'Authorization': API_KEY}
data = {'license': licensekey, 'product': product, 'version': version}
response = requests.post(URL_ENDPOINT, headers=headers, json=data)
status = response.json()

if status['status_overview'] == "success":
  print("Your license key is valid!")
  print("Discord ID: " + status['discord_id'])
else:
  print("Your license key is invalid!")
  print("Create a ticket in our discord server to get one.")
  exit()
```
{% endtab %}

{% tab title="C" %}
```c
#include <stdio.h>
#include <curl/curl.h>

int main(void) {
    CURL *curl;
    CURLcode res;

    curl_global_init(CURL_GLOBAL_DEFAULT);

    curl = curl_easy_init();
    if (curl) {
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Authorization: API_KEY");

        curl_easy_setopt(curl, CURLOPT_URL, "http://<your_ip>:<port>/api/client");
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        const char *data = "license=<LICENSE>&product=<PRODUCT>&version=<VERSION>";
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);

        res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }

    curl_global_cleanup();

    return 0;
}
```
{% endtab %}
{% endtabs %}
