import { logWithLabel } from '../../utils/console';
import { Message } from 'discord.js';

export async function validCode(message: Message<boolean>) {
  try {
    const codeBlocks = [
      '```js',
      '```c',
      '```cs',
      '```css',
      '```cpp',
      '```fix',
      '```diff',
      '```html',
      '```yml',
      '```java',
      '```python',
      '```rb',
      '```hs',
      '```haskell',
      '```bash',
      '```ruby',
      '```lua',
      '```py',
    ];

    const hasCodeBlock = codeBlocks.some((codeBlock) => message.content.includes(codeBlock));
    const codeBlockCount = message.content.replace(/[^`]/g, '').length;
    if (hasCodeBlock && codeBlockCount > 2) {
      message.react('🤖').catch(() => {});
    }
  } catch (error) {
    logWithLabel('error', `Error in validCode: ${error}`);
  }
}
