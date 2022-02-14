import React from "react"
import { Flex } from "../styles/Grid"
import { ExperienceStyle } from "../styles/ExperienceStyle"
import dayjs from "dayjs"

const Experience = ({ item, project }) => {
  const startTime = dayjs(item?.timeOfEmployment?.start ?? undefined)
  const endTime = dayjs(item?.timeOfEmployment?.end ?? undefined)

  const diff = Math.round(endTime.diff(startTime) / 1000 / 60 / 60 / 24 / 30)
  // TODO: FIX the import of dayjs and it's "duration" function (likely to be fixed with TypeScript)

  switch (diff) {
    case 12:
      item.duration = "1 year"
      break
    case 9:
      item.duration = "9 months"
      break
    case 24:
      item.duration = "2 years"
      break
    default:
      item.duration = "around half a year"
      break
  }

  return (
    <ExperienceStyle featured={item.featured} key={item.id} project>
      <h3>
        {item.position}
        {item.company?.link && item.company?.logo && (
          <div>
            <a
              href={item.company?.link ?? "#"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              <img src={item.company.logo.asset.url} alt="" />
            </a>
          </div>
        )}

        {item?.links ? (
          <div>
            {item?.links?.code ? (
              <a
                href={item?.links?.code}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 416.75 416.75"
                >
                  <defs />
                  <g fill="var(--color-purple)">
                    <path d="M305.025 325.756c-3.7 0-7.4-1.4-10.3-4.1-6-5.7-6.3-15.2-.6-21.2l86.9-92.1-86.9-92.1c-5.7-6-5.4-15.5.6-21.2s15.5-5.4 21.2.6l96.7 102.4c5.5 5.8 5.5 14.8 0 20.6l-96.7 102.4c-3 3.1-7 4.7-10.9 4.7zM111.725 325.756c-4 0-8-1.6-10.9-4.7l-96.7-102.4c-5.5-5.8-5.5-14.8 0-20.6l96.7-102.4c5.7-6 15.2-6.3 21.2-.6s6.3 15.2.6 21.2l-87 92.1 86.9 92.1c5.7 6 5.4 15.5-.6 21.2-2.9 2.7-6.6 4.1-10.2 4.1zM185.325 373.856c-.8 0-1.5-.1-2.3-.2-8.2-1.3-13.8-8.9-12.6-17.1l46-300.9c1.3-8.2 8.9-13.8 17.1-12.6 8.2 1.3 13.8 8.9 12.6 17.1l-46 300.9c-1.1 7.5-7.5 12.8-14.8 12.8z" />
                  </g>
                </svg>
              </a>
            ) : (
              ""
            )}
            {item?.links?.live ? (
              <a
                href={item?.links?.live}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <defs />
                  <path
                    d="M256 0C114.508 0 0 114.497 0 256c0 141.492 114.497 256 256 256 141.492 0 256-114.497 256-256C512 114.508 397.503 0 256 0zm-99.054 52.753a583.957 583.957 0 00-19.499 64.295 404.541 404.541 0 01-45.243-16.762c18.754-19.703 40.608-35.746 64.742-47.533zM72.338 124.24a434.999 434.999 0 0058.802 22.253c-5.806 30.993-9.126 62.538-9.914 94.507H30.502c2.763-42.441 17.226-82.61 41.836-116.76zm0 263.52C47.728 353.61 33.265 313.441 30.502 271h90.724c.788 31.969 4.108 63.514 9.914 94.507a435.05 435.05 0 00-58.802 22.253zm19.866 23.955a404.074 404.074 0 0145.243-16.762 584.173 584.173 0 0019.499 64.295c-24.122-11.781-45.978-27.821-64.742-47.533zM241 481.498c-15.754-1.025-31.197-3.655-46.135-7.825a555.815 555.815 0 01-28.398-86.363c24.318-5.437 49.199-8.616 74.533-9.515v103.703zm0-133.721c-27.448.907-54.405 4.307-80.751 10.175-5.234-28.529-8.25-57.55-9.013-86.952H241v76.777zM241 241h-89.764c.763-29.402 3.779-58.423 9.013-86.952 26.346 5.868 53.303 9.268 80.751 10.175V241zm0-106.795c-25.334-.899-50.215-4.078-74.533-9.515a555.815 555.815 0 0128.398-86.363c14.938-4.17 30.381-6.8 46.135-7.825v103.703zm198.662-9.965c24.61 34.15 39.073 74.319 41.836 116.76h-90.724c-.788-31.969-4.108-63.514-9.914-94.507a435.05 435.05 0 0058.802-22.253zm-19.866-23.955a404.074 404.074 0 01-45.243 16.762 584.173 584.173 0 00-19.499-64.295c24.122 11.781 45.978 27.821 64.742 47.533zM271 30.502c15.754 1.025 31.197 3.655 46.135 7.825a555.815 555.815 0 0128.398 86.363c-24.318 5.437-49.199 8.616-74.533 9.515V30.502zm0 133.721c27.448-.907 54.405-4.307 80.751-10.175 5.234 28.529 8.25 57.55 9.013 86.952H271v-76.777zm46.134 309.449c-14.937 4.171-30.38 6.801-46.134 7.826V377.795c25.334.899 50.215 4.078 74.533 9.515a555.773 555.773 0 01-28.399 86.362zM271 347.777V271h89.764c-.763 29.402-3.779 58.423-9.013 86.952-26.346-5.868-53.303-9.268-80.751-10.175zm84.054 111.47a583.957 583.957 0 0019.499-64.295 404.541 404.541 0 0145.243 16.762c-18.754 19.703-40.608 35.746-64.742 47.533zm84.608-71.487a434.999 434.999 0 00-58.802-22.253c5.806-30.993 9.126-62.538 9.914-94.507h90.724c-2.763 42.441-17.226 82.61-41.836 116.76z"
                    fill={"var(--color-purple)"}
                  />
                </svg>
              </a>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </h3>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        {item.company ? (
          <h4>
            {item.company?.name}{" "}
            {item.company?.description ? (
              <small>({item.company.description})</small>
            ) : (
              ""
            )}
          </h4>
        ) : (
          ""
        )}

        {item.timeOfEmployment && !project ? (
          <h5>
            {item.timeOfEmployment.start} - {item.timeOfEmployment.end ?? "..."}{" "}
            <small>({item.duration})</small>
          </h5>
        ) : (
          ""
        )}
      </Flex>

      <details>
        <summary title={"Planning to implement WAAPI for smoother openning"}>
          {item.details.summary}
        </summary>
        <div className="content">
          {item.details.content[0].children[0].text}
        </div>
      </details>

      <section>
        <h5>Projects</h5>
        <div>
          {item?.tags?.map(project => (
            <span>{project}</span>
          ))}
        </div>

        <h5>Tech used</h5>
        <div>
          {item?.tech.map(tech => (
            <span>{tech}</span>
          ))}
        </div>
      </section>
    </ExperienceStyle>
  )
}

export default Experience
