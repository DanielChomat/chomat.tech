import React, { ReactNode } from "react"
import { useSiteMetadata } from "./useSiteMetadata"

type Props = {
  title?: string
  description?: string
  pathname?: string
  children?: ReactNode
}

type SeoData = {
  title: string
  description: string
  // image: string
  url: string
  twitterUsername: string
}

export const Seo = ({ title, description, pathname = "", children }: Props) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata()

  // const imageUrl: string = siteUrl + image
  const staticUrl: string = siteUrl + pathname

  const seoData: SeoData = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    // image: imageUrl,
    url: staticUrl,
    twitterUsername,
  }

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {/*<meta name="image" content={seoData.image} />*/}
      <meta name="og:title" content={seoData.title} />
      <meta name="og:description" content={seoData.description} />
      <meta name="og:type" content={"website"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:url" content={seoData.url} />
      <meta name="twitter:description" content={seoData.description} />
      {/*<meta name="twitter:image" content={seoData.image} />*/}
      <meta name="twitter:creator" content={seoData.twitterUsername} />
      {/*<link rel="icon" href={imageUrl} />*/}
      {children}
    </>
  )
}
