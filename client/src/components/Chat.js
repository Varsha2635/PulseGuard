// import { useEffect } from 'react';

// export default function Chat() {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       window.botpressWebChat.init({
//         botId: '306368ec-2183-40d1-a10d-f91bc9f01cbb',
//         clientId: '7d4155fb-2554-4629-874c-cbeda663c655',
//         hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
//         messagingUrl: 'https://messaging.botpress.cloud',
//         showPoweredBy: false,
//       });
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null;
// }

// import { useEffect } from 'react';

// export default function Chat() {
//   useEffect(() => {
//     const injectScript = document.createElement('script');
//     injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
//     injectScript.defer = true;

//     const configScript = document.createElement('script');
//     configScript.src = 'https://files.bpcontent.cloud/2025/07/20/06/20250720065055-05K42D3Z.js';
//     configScript.defer = true;

//     document.body.appendChild(injectScript);
//     document.body.appendChild(configScript);

//     return () => {
//       document.body.removeChild(injectScript);
//       document.body.removeChild(configScript);
//     };
//   }, []);

//   return null;
// }


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
