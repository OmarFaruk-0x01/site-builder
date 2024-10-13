import {
  Button,
  FileButton,
  Group,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import SliderInput from "../components/inputs/SliderInput";

export type ImageSettingType = {
  src: string;
  alt: string;
  width?: number;
};

type ImageProps = {
  src: string;
  alt: string;
  onFileChange: (file: File) => void;
  onAltChange: (text: string) => void;
  onWidthChange?: (width: number) => void;
  width?: number;
  withWidthSlider?: boolean;
};

function Image({
  width,
  src,
  alt,
  onAltChange,
  onFileChange,
  onWidthChange,
  withWidthSlider,
}: ImageProps) {
  return (
    <Stack gap="xs">
      {withWidthSlider && (
        <SliderInput
          label="Width"
          value={width}
          tooltipSuffix={"%"}
          onChange={(value) => onWidthChange?.(value)}
        />
      )}
      <Group grow>
        <Paper w="100px" h="100px" p="xs" radius="xs" withBorder bg="gray.0">
          <img className="w-full h-full object-cover" src={src} alt={alt} />
        </Paper>
        <FileButton
          accept="image/*"
          onChange={(file) => {
            if (file) {
              onFileChange(file);
            }
          }}
        >
          {({ onClick }) => (
            <Button size="xs" onClick={onClick}>
              Change image
            </Button>
          )}
        </FileButton>
      </Group>
      <TextInput
        label="Alt"
        value={alt}
        onChange={(ev) => {
          onAltChange(ev.target.value);
        }}
      />
    </Stack>
  );
}

function Placeholder() {
  return <></>;
}

Image.Placeholder = Placeholder;

export default Image;
