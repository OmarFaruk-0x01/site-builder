import { useNode } from "@craftjs/core";
import { ColorInput, Stack, Textarea, toRgba } from "@mantine/core";
import AlignmentInput from "../components/inputs/AlignmentInput";
import LayoutInput from "../components/inputs/LayoutInput";
import { AnnouncementStyleType } from "../presets/AnnouncementNode/AnnouncementNode";

type AnnouncementStylesProps = {};

function AnnouncementStyles({}: AnnouncementStylesProps) {
  const {
    style,
    text,
    actions: { setProp },
  } = useNode((state) => ({
    style: state.data.props.style as AnnouncementStyleType,
    text: state.data.props.text as string,
  }));

  return (
    <Stack>
      <LayoutInput
        layout={style.layout!}
        onChange={(layout) => {
          // @ts-ignore
          setProp((props) => (props.style.layout = layout));
        }}
      />
      <AlignmentInput
        onChange={(alignment) => {
          // @ts-ignore
          setProp((props) => (props.style.alignment = alignment));
        }}
        alignment={style.alignment!}
      />
      <Textarea
        label="Text"
        value={text}
        onChange={(ev) => {
          // @ts-ignore
          setProp((props) => (props.text = ev.target.value));
        }}
      />
      <ColorInput
        label="Color"
        value={`rgba(${style.color?.r},${style.color?.g},${style.color?.b},${style.color?.a})`}
        onChange={(color) => {
          // @ts-ignore
          setProp((props) => {
            props.style.color = toRgba(color);
          });
        }}
      />
      <ColorInput
        label="Background"
        value={`rgba(${style.backgroundColor?.r},${style.backgroundColor?.g},${style.backgroundColor?.b},${style.backgroundColor?.a})`}
        onChange={(color) => {
          // @ts-ignore
          setProp((props) => {
            props.style.backgroundColor = toRgba(color);
          });
        }}
      />
    </Stack>
  );
}

function Placeholder() {
  return <></>;
}

AnnouncementStyles.Placeholder = Placeholder;

export default AnnouncementStyles;
