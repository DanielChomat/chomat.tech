import React from "react";
import type { PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import { Bio } from "../components/Bio";
import { Experiences } from "../containers/ExperiencesContainer";
import { Projects } from "../containers/ProjectsContainer";
const titleClaims =
  "Hi there! Welcome! Please be patient, this page is still a WIP. Thank you! "

const HomePage = ({ data, location }: PageProps) => {
  // useEffect(() => {
  //   const titleScroller = text => {
  //     document.title = text
  //     setTimeout(function () {
  //       titleScroller(text.substr(1) + text.substr(0, 1))
  //     }, 500)
  //   }
  //
  //   titleScroller(titleClaims)
  // }, [])

  // @ts-ignore
  return (
    <Layout location={location} title={titleClaims}>
      {/*<Seo title={titleClaims} />*/}
      <Bio />
      <Experiences />
      <Projects />
    </Layout>
  )
}

export default HomePage

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
