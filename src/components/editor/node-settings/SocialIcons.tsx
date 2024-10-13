import { useNode } from "@craftjs/core";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Link, Trash2 } from "lucide-react";
import AlignmentInput from "../components/inputs/AlignmentInput";
import SliderInput from "../components/inputs/SliderInput";
import { SocialIconsType } from "../presets/FooterNode";

type SocialIconsProps = {};

function SocialIcons({}: SocialIconsProps) {
  const _icons = [
    {
      label: "Facebook",
      value: "facebook",
    },
    {
      label: "Twitter",
      value: "twitter",
    },
    {
      label: "Instagram",
      value: "instagram",
    },
  ];

  const {
    icons,
    actions: { setProp },
  } = useNode((state) => ({
    icons: state.data.props.icons as SocialIconsType,
  }));

  return (
    <Stack gap="xs" w="100%">
      <Group grow>
        <AlignmentInput
          alignment={icons.menuStyles?.alignment!}
          onChange={(alignment) => {
            // @ts-ignore
            setProp((props) => (props.icons.menuStyles.alignment = alignment));
          }}
        />
        <SliderInput
          label="Spacing"
          value={icons?.menuStyles?.gap}
          onChange={(value) => {
            // @ts-ignore
            setProp((props) => (props.icons.menuStyles.gap = value));
          }}
        />
      </Group>
      <Group grow>
        <SliderInput
          label="Font Size"
          value={icons?.menuStyles?.fontSize}
          onChange={(value) => {
            // @ts-ignore
            setProp((props) => (props.icons.menuStyles.fontSize = value));
          }}
        />
      </Group>
      <Text size="xs" tt="uppercase" c="gray.5">
        ICONS
      </Text>
      <Stack>
        {icons.icons.map((m, index) => (
          <Paper key={index} withBorder radius="sm" p="sm">
            <Stack gap="xs">
              <Group justify="space-between">
                <div></div>
                <ActionIcon
                  onClick={() => {
                    //   @ts-ignore
                    setProp((props) => {
                      props.icons.icons.splice(index, 1);
                    });
                  }}
                  variant="transparent"
                  size="xs"
                  color="red"
                >
                  <Trash2 />
                </ActionIcon>
              </Group>
              <Select
                placeholder="Select Icons"
                data={_icons}
                value={m.label}
                label="Icons"
                onChange={(value) => {
                  // @ts-ignore
                  setProp((props) => {
                    props.icons.icons[index].label = value;
                    return props;
                  });
                }}
              />
              <TextInput
                label="Link"
                type="url"
                leftSection={<Link />}
                value={m.href}
                onChange={(ev) => {
                  //   @ts-ignore
                  setProp((props) => {
                    props.icons.icons[index].href = ev.target.value;
                    return props;
                  });
                }}
              />
              <Checkbox
                label="Open In New Tab"
                checked={m.openInNewTab}
                onChange={(ev) => {
                  //   @ts-ignore
                  setProp((props) => {
                    props.icons.icons[index].openInNewTab = ev.target.checked;
                    return props;
                  });
                }}
              />
            </Stack>
          </Paper>
        ))}
        <Button
          size="xs"
          onClick={() => {
            //   @ts-ignore
            setProp((props) => {
              props.icons.icons.push({
                label: "",
                href: "",
                openInNewTab: false,
              });
              return props;
            });
          }}
        >
          Add Menu
        </Button>
      </Stack>
    </Stack>
  );
}

function Placeholder() {
  return <></>;
}

SocialIcons.Placeholder = Placeholder;

export default SocialIcons;
