import { Button, InputWrapper } from "@mantine/core";

type LayoutInputProps = {
  layout: "container" | "fluid";
  onChange(layout: LayoutInputProps["layout"]): void;
};

export default function LayoutInput({ layout, onChange }: LayoutInputProps) {
  return (
    <InputWrapper w="100%" label="Layout">
      <Button.Group w="100%">
        <Button
          size="xs"
          variant={layout == "container" ? "filled" : "default"}
          onClick={() => {
            onChange("container");
          }}
        >
          Container
        </Button>
        <Button
          size="xs"
          variant={layout == "fluid" ? "filled" : "default"}
          onClick={() => {
            onChange("fluid");
          }}
        >
          Fluid
        </Button>
      </Button.Group>
    </InputWrapper>
  );
}
