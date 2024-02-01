import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { resize } from "../utils/resize";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          id="resize"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `var changeRootSizeFn=${resize};changeRootSizeFn()`,
          }}
        ></Script>
      </body>
    </Html>
  );
}
