import React from "react";
import { tv } from "tailwind-variants";
import ImagePreview from "../../../components/image-preview";
import InputCheckBox from "../../../components/input-checkbox";

export const PhotoImageSelectableVariants = tv({
  base: "cursor-pointer relative rounded-lg",
  variants: {
    select: {
      true: "outline-2 outline-accent-brand",
    },
  },
  defaultVariants: {
    select: true,
  },
});

interface PhotoImageSelectableProps
  extends React.ComponentProps<typeof ImagePreview> {
  selected?: boolean;
  onSelectImage?: (selected: boolean) => void;
}

const PhotoImageSelectable = ({
  className,
  selected,
  onSelectImage,
  ...props
}: PhotoImageSelectableProps) => {
  const [isSelected, setIsSelected] = React.useState(selected);

  function handleSelected() {
    const newValue = !isSelected;
    setIsSelected(newValue);
    onSelectImage?.(newValue);
  }
  return (
    <label
      htmlFor=""
      className={PhotoImageSelectableVariants({
        className,
        select: isSelected,
      })}
    >
      <InputCheckBox
        className="absolute top-1 left-1"
        size="sm"
        defaultChecked={isSelected}
        onChange={handleSelected}
      />
      <ImagePreview {...props} />
    </label>
  );
};

export default PhotoImageSelectable;
