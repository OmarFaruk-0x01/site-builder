import { useNode } from "@craftjs/core";
import {
  ActionIcon,
  Box,
  Group,
  InputWrapper,
  Select,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

type TypographyProps = {};

function Typography({}: TypographyProps) {
  const { fontSize, textAlign, fontWeight, setProp } = useNode((state) => ({
    fontSize: state.data.props.fontSize,
    textAlign: state.data.props.textAlign,
    fontWeight: state.data.props.fontWeight as number,
  }));

  return (
    <Stack gap="xs">
      <InputWrapper flex={1} label="Font Size">
        <Slider
          label={(value) => `${value}px`}
          value={fontSize}
          min={1}
          max={100}
          onChange={(value) => setProp((props) => (props.fontSize = value))}
        />
      </InputWrapper>
      <Group grow>
        <Box>
          <InputWrapper w="100%" label="Text Align">
            <ActionIcon.Group w="100%">
              <ActionIcon
                variant={textAlign == "left" ? "filled" : "default"}
                onClick={() => {
                  setProp((props) => (props.textAlign = "left"));
                }}
              >
                <AlignLeft className="w-4 h-4" />
              </ActionIcon>
              <ActionIcon
                variant={textAlign == "center" ? "filled" : "default"}
                onClick={() => {
                  setProp((props) => (props.textAlign = "center"));
                }}
              >
                <AlignCenter className="w-4 h-4" />
              </ActionIcon>
              <ActionIcon
                variant={textAlign == "right" ? "filled" : "default"}
                onClick={() => {
                  setProp((props) => (props.textAlign = "right"));
                }}
              >
                <AlignRight className="w-4 h-4" />
              </ActionIcon>
            </ActionIcon.Group>
          </InputWrapper>
        </Box>
        <Box>
          <Select
            size="xs"
            label="Font Weight"
            data={[
              { label: "Light", value: "400" },
              { label: "Regular", value: "500" },
              { label: "Bold", value: "600" },
            ]}
            value={String(fontWeight)}
            onChange={(value) => setProp((props) => (props.fontWeight = value))}
          />
        </Box>
      </Group>
    </Stack>
  );
}

function Placeholder() {
  const { fontSize, fontWeight } = useNode((state) => ({
    fontSize: state.data.props.fontSize,
    textAlign: state.data.props.textAlign,
    fontWeight: state.data.props.fontWeight as number,
  }));
  const fontWeightLabel: Record<number, string> = {
    400: "Light",
    500: "Regular",
    600: "Bold",
  };
  return (
    <Text size="xs" c="gray.6">
      {fontSize}px - {fontWeightLabel[fontWeight]}
    </Text>
  );
}

Typography.Placeholder = Placeholder;

export default Typography;
