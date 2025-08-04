import { useEffect } from 'react';

export default function Chat() {
  useEffect(() => {
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
    injectScript.defer = true;

    injectScript.onload = () => {
      const configScript = document.createElement('script');
      configScript.src = 'https://files.bpcontent.cloud/2025/07/20/06/20250720065055-05K42D3Z.js';
      configScript.defer = true;
      document.body.appendChild(configScript);
    };

    document.body.appendChild(injectScript);

    return () => {
      document.body.removeChild(injectScript);
      // Optional: clean up configScript too, but you'd need to store a reference
    };
  }, []);

  return null;
}

