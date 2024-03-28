---
description: >-
  Integración de diversos modelos IA dentro el soporte que brinda la aplicación
  por si misma.
---

# Integración IA

Este sistema presenta una integración fluida con una variedad de modelos de inteligencia artificial (IA), que abarcan las siguientes funcionalidades:

1. Generación de Imágenes: Este modelo de IA permite la generación automatizada de imágenes, lo que facilita la creación de contenido visual de alta calidad de manera eficiente.
2. Soporte Automatizado: La aplicación incorpora un sistema de soporte automatizado basado en IA, que ofrece asistencia y resolución de problemas de manera eficaz y sin intervención humana directa.
3. Clasificación de Textos: Utilizando algoritmos de procesamiento de lenguaje natural (NLP), esta función permite la clasificación automática y categorización de texto, facilitando la organización y análisis de grandes volúmenes de información textual.

Se tiene previsto integrar más modelos de IA en el cliente en un futuro cercano. Sin embargo, se está abordando activamente el desafío del rendimiento y la eficiencia del sistema, con el objetivo de optimizar su funcionamiento. A continuación, se proporciona información detallada sobre los modelos de IA actualmente confirmados.

## Modelos

### Animagine XL 3.0

**Animagine XL 3.0** is the latest version of the sophisticated open-source anime text-to-image model, building upon the capabilities of its predecessor, Animagine XL 2.0. Developed based on Stable Diffusion XL, this iteration boasts superior image generation with notable improvements in hand anatomy, efficient tag ordering, and enhanced knowledge about anime concepts. Unlike the previous iteration, we focused to make the model learn concepts rather than aesthetic.

To use Animagine XL 3.0, install the required libraries as follows:

```bash
pip install diffusers --upgrade
pip install transformers accelerate safetensors
```

Example script for generating images with Animagine XL 3.0:

```python
import torch
from diffusers import (
    StableDiffusionXLPipeline, 
    EulerAncestralDiscreteScheduler,
    AutoencoderKL
)

# Load VAE component
vae = AutoencoderKL.from_pretrained(
    "madebyollin/sdxl-vae-fp16-fix", 
    torch_dtype=torch.float16
)

# Configure the pipeline
pipe = StableDiffusionXLPipeline.from_pretrained(
    "cagliostrolab/animagine-xl-3.0", 
    vae=vae,
    torch_dtype=torch.float16, 
    use_safetensors=True, 
)
pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config)
pipe.to('cuda')

# Define prompts and generate image
prompt = "1girl, arima kana, oshi no ko, solo, upper body, v, smile, looking at viewer, outdoors, night"
negative_prompt = "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name"

image = pipe(
    prompt, 
    negative_prompt=negative_prompt, 
    width=832,
    height=1216,
    guidance_scale=7,
    num_inference_steps=28
).images[0]
```

#### Usage Guidelines

#### Tag Ordering

Prompting is a bit different in this iteration, for optimal results, it's recommended to follow the structured prompt template because we train the model like this:

```
1girl/1boy, character name, from what series, everything else in any order.
```

### Roberta-base-go\_emotions

Model trained from [roberta-base](https://huggingface.co/roberta-base) on the [go\_emotions](https://huggingface.co/datasets/go\_emotions) dataset for multi-label classification.

**ONNX version also available**

A version of this model in ONNX format (including an INT8 quantized ONNX version) is now available at These are faster for inference, esp for smaller batch sizes, massively reduce the size of the dependencies required for inference, make inference of the model more multi-platform, and in the case of the quantized version reduce the model file/download size by 75% whilst retaining almost all the accuracy if you only need inference.

**Dataset used for the model**

[go\_emotions](https://huggingface.co/datasets/go\_emotions) is based on Reddit data and has 28 labels. It is a multi-label dataset where one or multiple labels may apply for any given input text, hence this model is a multi-label classification model with 28 'probability' float outputs for any given input text. Typically a threshold of 0.5 is applied to the probabilities for the prediction for each label.

**How the model was created**

The model was trained using `AutoModelForSequenceClassification.from_pretrained` with `problem_type="multi_label_classification"` for 3 epochs with a learning rate of 2e-5 and weight decay of 0.01.

**Inference**

There are multiple ways to use this model in Huggingface Transformers. Possibly the simplest is using a pipeline:

```python
from transformers import pipeline

classifier = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None)

sentences = ["I am not having a great day"]

model_outputs = classifier(sentences)
print(model_outputs[0])
# produces a list of dicts for each of the labels
```

### Model-QA-5-epoch-RU

This model is a fine-tuned version of [AndrewChar/diplom-prod-epoch-4-datast-sber-QA](https://huggingface.co/AndrewChar/diplom-prod-epoch-4-datast-sber-QA) on sberquad dataset. It achieves the following results on the evaluation set:

* Train Loss: 1.1991
* Validation Loss: 0.0
* Epoch: 5

#### Model description

Модель отвечающая на вопрос по контектсу это дипломная работа

#### Intended uses & limitations

Контекст должен содержать не более 512 токенов

#### Training and evaluation data

DataSet SberSQuAD {'exact\_match': 54.586, 'f1': 73.644}

#### Training procedure

#### Training hyperparameters

The following hyperparameters were used during training:

* optimizer: {'name': 'Adam', 'learning\_rate': {'class\_name': 'PolynomialDecay', 'config': {'initial\_learning\_re': 2e-06 'decay\_steps': 2986, 'end\_learning\_rate': 0.0, 'power': 1.0, 'cycle': False, 'name': None\}}, 'decay': 0.0, 'beta\_1': 0.9, 'beta\_2': 0.999, 'epsilon': 1e-08, 'amsgrad': False}
* training\_precision: float32

#### Training results

| Train Loss | Validation Loss | Epoch |
| :--------: | :-------------: | :---: |
|   1.1991   |                 |   5   |

#### Framework versions

* Transformers 4.15.0
* TensorFlow 2.7.0
* Datasets 1.17.0
* Tokenizers 0.10.3

## Mantenimiento

Se está considerando la implementación de los siguientes tipos de modelos para mejorar las funciones de soporte:

1. Generación de Textos: Estos modelos de IA permitirán generar texto de forma automatizada y contextualmente relevante, lo que mejorará la capacidad de respuesta y la calidad de las respuestas del sistema de soporte.
2. Predicciones: Los modelos de predicción se utilizarán para anticipar y responder a las necesidades y consultas de los usuarios de manera más proactiva y precisa, lo que optimizará la eficiencia del sistema de soporte.
3. Transformación de Algoritmos: Estos modelos permitirán optimizar y adaptar los algoritmos utilizados en el sistema de soporte para mejorar su rendimiento y precisión en la resolución de problemas.

Se tiene programada una actualización del cliente a partir del `12 de Abril de 2024`, con un enfoque prioritario en mejorar el rendimiento y el tiempo de respuesta del sistema actual. Este proceso de actualización se centrará en optimizar el funcionamiento del sistema y en prepararlo para la integración de los nuevos modelos de IA mencionados anteriormente.
