import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
      </Head>
      <body>
        <Main />
        <div id="portal-container" />
        <NextScript />
      </body>
    </Html>
  );
}
