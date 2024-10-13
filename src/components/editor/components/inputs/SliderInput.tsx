import { InputWrapper, Slider, SliderProps } from "@mantine/core";

type SliderInputProps = SliderProps & {
  label: string;
  tooltipSuffix?: string;
};

export default function SliderInput({
  label,
  tooltipSuffix = "px",
  ...props
}: SliderInputProps) {
  return (
    <InputWrapper flex={1} label={label}>
      <Slider
        label={(value) => `${value}${tooltipSuffix}`}
        min={1}
        max={100}
        {...props}
      />
    </InputWrapper>
  );
}
