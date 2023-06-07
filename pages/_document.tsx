import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Share, Connect & Explore. Share travel memories and Spread the joy."
        />
        <meta
          property="og:title"
          content="Tripix - Share, Connect & Explore. Share travel memories and Spread the joy."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="http://tripix.vercel.app/" />
        <title>Tripix - Share Travel Memories</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
