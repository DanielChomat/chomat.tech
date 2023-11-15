import dayjs from "dayjs"
import { Project } from "../../../types"

const getDurationInText = (diffInMonths: number) => {
  switch (diffInMonths) {
    case 12:
      return "1 year"
    case 9:
      return "9 months"
    case 24:
      return "2 years"
    default:
      return undefined
  }
}

type Props = {
  timeOfEmployment: Project["timeOfEmployment"]
}

export const ExperienceEmploymentDuration = ({ timeOfEmployment }: Props) => {
  const startTime = dayjs(timeOfEmployment?.start ?? undefined)
  const endTime = dayjs(timeOfEmployment?.end ?? undefined)

  const diffInMonths = Math.round(
    endTime.diff(startTime) / 1000 / 60 / 60 / 24 / 30,
  )
  // TODO: FIX the import of dayjs and it's "duration" function (likely to be fixed with TypeScript)

  const durationInText = getDurationInText(diffInMonths)

  return timeOfEmployment ? (
    <h5>
      {timeOfEmployment.start} - {timeOfEmployment.end ?? "..."}{" "}
      {durationInText && <small>({durationInText})</small>}
    </h5>
  ) : (
    ""
  )
}
