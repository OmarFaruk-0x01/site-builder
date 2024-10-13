import { useNode } from "@craftjs/core";
import { Stack, Textarea } from "@mantine/core";
import { HeroSettingType } from "../presets/HeroNode";

type HeroSettingsProps = {};

function HeroSettings({}: HeroSettingsProps) {
  const {
    hero,
    actions: { setProp },
  } = useNode((state) => ({
    hero: state.data.props.hero as HeroSettingType,
  }));

  return (
    <Stack>
      <Textarea
        label="Title"
        value={hero.title!}
        onChange={(ev) => {
          // @ts-ignore
          setProp((props) => (props.hero.title = ev.target.value));
        }}
      />
      <Textarea
        label="Sub Title"
        value={hero.subtitle!}
        onChange={(ev) => {
          // @ts-ignore
          setProp((props) => (props.hero.subtitle = ev.target.value));
        }}
      />
      <Textarea
        label="Sub Title 2"
        value={hero.subtitle2!}
        onChange={(ev) => {
          // @ts-ignore
          setProp((props) => (props.hero.subtitle2 = ev.target.value));
        }}
      />
    </Stack>
  );
}

function Placeholder() {
  return <></>;
}

HeroSettings.Placeholder = Placeholder;

export default HeroSettings;
