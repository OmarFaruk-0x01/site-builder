import { ActionIcon, InputWrapper } from "@mantine/core";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

type AlignmentInputProps = {
  alignment: AlignSetting;
  onChange(props: AlignmentInputProps["alignment"]): void;
};

export default function AlignmentInput({
  alignment,
  onChange,
}: AlignmentInputProps) {
  return (
    <InputWrapper w="100%" label="Alignment">
      <ActionIcon.Group w="100%">
        <ActionIcon
          variant={alignment == "left" ? "filled" : "default"}
          onClick={() => {
            onChange("left");
          }}
        >
          <AlignLeft className="w-4 h-4" />
        </ActionIcon>
        <ActionIcon
          variant={alignment == "center" ? "filled" : "default"}
          onClick={() => {
            onChange("center");
          }}
        >
          <AlignCenter className="w-4 h-4" />
        </ActionIcon>
        <ActionIcon
          variant={alignment == "right" ? "filled" : "default"}
          onClick={() => {
            onChange("right");
          }}
        >
          <AlignRight className="w-4 h-4" />
        </ActionIcon>
      </ActionIcon.Group>
    </InputWrapper>
  );
}
