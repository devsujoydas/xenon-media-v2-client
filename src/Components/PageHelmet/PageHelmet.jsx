import { Helmet } from "react-helmet-async";

const PageHelmet = ({
  title = "Xenly - Connect, Share, and Discover",
  description = "Connect, share, and discover amazing content with the Xenly community. Stay updated with real-time posts and interactions.",
  image = "/logo.png",
  type = "website",
  keywords = "Xenly, social media, connect, posts, community, share",
  author = "Xenly Team",
}) => {
  const url = typeof window !== "undefined" ? window.location.href : "https://xenly.com";
  const fullImage = image?.startsWith("http")
    ? image
    : `${typeof window !== "undefined" ? window.location.origin : ""}${image}`;

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    name: title,
    description: description,
    url: url,
    image: fullImage,
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Xenly" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {fullImage && <meta property="og:image" content={fullImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {fullImage && <meta name="twitter:image" content={fullImage} />}

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  );
};

export default PageHelmet;