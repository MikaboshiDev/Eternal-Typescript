import { logWithLabel } from '../../utils/console';

export async function validCode(message: any) {
  try {
    var aa = message.content.replace(/[^```]/g, '').length > 2;
    if (
      aa &&
      (message.content.includes('```js') ||
        message.content.includes('```c') ||
        message.content.includes('```cs') ||
        message.content.includes('```css') ||
        message.content.includes('```cpp') ||
        message.content.includes('```fix') ||
        message.content.includes('```diff') ||
        message.content.includes('```html') ||
        message.content.includes('```yml') ||
        message.content.includes('```java') ||
        message.content.includes('```python') ||
        message.content.includes('```rb') ||
        message.content.includes('```hs') ||
        message.content.includes('```haskell') ||
        message.content.includes('```bash') ||
        message.content.includes('```ruby') ||
        message.content.includes('```lua') ||
        message.content.includes('```py'))
    )
      message.react('🤖').catch(() => {});
  } catch (e) {
    logWithLabel('error', `Error in validCode: ${e}`);
  }
}
