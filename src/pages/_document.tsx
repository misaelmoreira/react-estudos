import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />

        <title>Vite + React + TS</title>

        <style global jsx> 
            {
                `
                @keyframes spin {
                    from {
                    transform: rotate(0deg);
                    }
                    to {
                    transform: rotate(360deg);
                    }
                }
                `
            }        
        </style>
      </Head>
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}