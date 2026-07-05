import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import CheckIcon from "../assets/icons/check.svg?react";
import Icon from "./icon";

export const InputCheckBoxWrapperVariants = tv({
  base: "inline-flex items-center relative group",
  variants: {
    disabled: {
      true: "pointer-events-none opacity-80",
    },
  },
});

export const inputCheckBoxVariants = tv({
  base: "appearance-none peer flex items-center justify-center cursor-pointer transition overflow-hidden",
  variants: {
    variant: {
      default:
        "border-2 border-solid border-border-primary hover:border-border-active checked:border-accent-brand checked:bg-accent-brand group-hover:checked:border-accent-brand-light group-hover:checked:bg-accent-brand-light",
    },
    size: {
      sm: "w-3 h-3 rounded-sm",
      md: "w-5 h-5 rounded-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
  },
});

export const inputCheckboxIconVariants = tv({
  base: "absolute top-1/2 -translate-y-1/2 hidden peer-checked:block fill-background-primary cursor-pointer",
  variants: {
    size: {
      sm: "w-3 h-3 left-px",
      md: "w-4 h-4 left-0.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputCheckBoxProps
  extends VariantProps<typeof inputCheckBoxVariants>,
    Omit<React.ComponentProps<"input">, "size"> {}

const InputCheckBox = ({
  variant,
  size,
  disabled,
  className,
  ...props
}: InputCheckBoxProps) => {
  return (
    <label className={InputCheckBoxWrapperVariants({ className, disabled })}>
      <input
        type="checkbox"
        className={inputCheckBoxVariants({ variant, size })}
        {...props}
      />
      <Icon svg={CheckIcon} className={inputCheckboxIconVariants({ size })} />
    </label>
  );
};

export default InputCheckBox;
