import React from "react"
import { Flex } from "../../styles/Grid"
import { Experience } from "../../styles/Experiences"
import Refresh from "../Icons/assets/Refresh"
import { Unicorn } from "../Icons"

const Experiences = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      width={"100%"}
      gap={"30px"}
    >
      <Experience>
        <h3>
          Front-End Web Developer <Refresh />
        </h3>
        <h4>
          Refresh <small>(Prague Digital Agency)</small>
        </h4>
        <h5>2019 - ...</h5>

        <details>
          <summary title={"Planning to implement WAAPI for smoother openning"}>
            Great team. Loooads of progress and experience!
          </summary>
          <div className="content">
            Started as an HTML/CSS coder during my studies. Working with a great
            team in interesting technologies on some nice projects.
          </div>
        </details>

        <h5>Projects</h5>
        <section>
          <span>Intranet React application</span>
          <span>Presentation websites</span>
        </section>

        <h5>Tech used</h5>
        <section>
          <span>React</span>
          <span>GatsbyJS</span>
          <span>CSS Modules</span>
          <span>Styled Components</span>
          <span>Docker</span>
        </section>
      </Experience>

      <Experience>
        <h3>Freelance Web Developer</h3>
        <h5>2018 - 2019</h5>

        <details>
          <summary>The beginnings of freelance are fun!</summary>
          <div className="content">Wordpress projects for digital agencies</div>
        </details>

        <h5>Tech used</h5>
        <section>
          <span>SCSS</span>
          <span>CSS Grid</span>
          <span>Bootstrap</span>
          <span>Vanilla JS</span>
          <span>Wordpress plugins</span>
        </section>

        <h5>Projects</h5>
        <section>
          <span>LP for digital agencies</span>
          <span>Train seat booking system</span>
        </section>
      </Experience>

      <Experience>
        <h3>
          Developer
          <Unicorn />
        </h3>

        <h4>
          Unicorn <small>(🇨🇿 International Software Company)</small>
        </h4>
        <h5>2017 - 2018</h5>

        <details>
          <summary>Gotta start somewhere!</summary>
          <div className="content">
            Mainly administrating and developing plugins for Atlassian products
          </div>
        </details>
        <h5>Tech used</h5>
        <section>
          <span>Java</span>
          <span>JIRA</span>
          <span>Confluence</span>
          <span>Bitbucket</span>
          <span>Bamboo</span>
        </section>
      </Experience>
    </Flex>
  )
}

export default Experiences
