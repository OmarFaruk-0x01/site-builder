import { useNode } from "@craftjs/core";
import { ColorInput, Stack, toRgba } from "@mantine/core";
import LayoutInput from "../components/inputs/LayoutInput";
import { HeaderStyleType } from "../presets/HeaderNode/HeaderNode";

type HeaderStylesProps = {};

function HeaderStyles({}: HeaderStylesProps) {
  const {
    style,
    actions: { setProp },
  } = useNode((state) => ({
    style: state.data.props.style as HeaderStyleType,
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

HeaderStyles.Placeholder = Placeholder;

export default HeaderStyles;
