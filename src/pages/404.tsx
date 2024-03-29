import { graphql } from "gatsby"

import { Layout } from "../components/Layout"
// import Seo from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      {/*<Seo title="404: Not Found" />*/}
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
