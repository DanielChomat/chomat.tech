
import { Label } from "./Label";

type Props = {
  title: string;
  labels: readonly string[]
}

export const LabelsSection = ({title, labels}: Props) => {

  return (
    <>
      <h5>{title}</h5>
      <div>
        {labels.map(label => (
          <Label key={label} label={label} />
        ))}
      </div>
    </>
  )
}