import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"

import { Project } from "../../../types"

dayjs.extend(duration)
dayjs.extend(relativeTime)

type Props = {
  timeOfEmployment: Project["timeOfEmployment"]
}

export const ExperienceEmploymentDuration = ({ timeOfEmployment }: Props) => {
  const startTimeString = timeOfEmployment?.start ?? undefined
  const endTimeString = timeOfEmployment?.end ?? undefined

  const startTime = dayjs(startTimeString)
  const endTime = dayjs(endTimeString).endOf("month")

  const durationInText = dayjs.duration(endTime.diff(startTime)).humanize()

  return timeOfEmployment ? (
    <h5>
      {startTimeString} - {endTimeString ?? "..."}
      {durationInText && (
        <>
          {" "}
          <small>({durationInText})</small>
        </>
      )}
    </h5>
  ) : (
    ""
  )
}
