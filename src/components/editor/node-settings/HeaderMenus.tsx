import { useNode } from "@craftjs/core";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { Link, Trash2 } from "lucide-react";
import AlignmentInput from "../components/inputs/AlignmentInput";
import SliderInput from "../components/inputs/SliderInput";
import { HeaderMenuType } from "../presets/HeaderNode/HeaderNode";

type HeaderMenuProps = {};

function HeaderMenu({}: HeaderMenuProps) {
  const pages = [
    {
      label: "My Libraries",
      value: "/my-libraries",
    },
    {
      label: "Contact Us",
      value: "/contact-us",
    },
    {
      label: "Home",
      value: "/",
    },
  ];

  const {
    menu,
    actions: { setProp },
  } = useNode((state) => ({
    menu: state.data.props.menu as HeaderMenuType,
  }));

  return (
    <Stack gap="xs" w="100%">
      <Group grow>
        <AlignmentInput
          alignment={menu.menuStyles?.alignment!}
          onChange={(alignment) => {
            // @ts-ignore
            setProp((props) => (props.menu.menuStyles.alignment = alignment));
          }}
        />
        <SliderInput
          label="Spacing"
          value={menu?.menuStyles?.gap}
          onChange={(value) => {
            // @ts-ignore
            setProp((props) => (props.menu.menuStyles.gap = value));
          }}
        />
      </Group>
      <Group grow>
        <SliderInput
          label="Font Size"
          value={menu?.menuStyles?.fontSize}
          onChange={(value) => {
            // @ts-ignore
            setProp((props) => (props.menu.menuStyles.fontSize = value));
          }}
        />
      </Group>
      <Text size="xs" tt="uppercase" c="gray.5">
        MENUS
      </Text>
      <Stack>
        {menu.menus.map((m, index) => (
          <Paper key={index} withBorder radius="sm" p="sm">
            <Stack gap="xs">
              <Group justify="space-between">
                <Switch
                  label="Custom"
                  size="xs"
                  labelPosition="left"
                  checked={m.isCustom}
                  onChange={(ev) => {
                    //   @ts-ignore
                    setProp((props) => {
                      if (ev.target.checked) {
                        props.menu.menus[index].label = "";
                        props.menu.menus[index].href = "";
                      }
                      props.menu.menus[index].isCustom = ev.target.checked;
                      return props;
                    });
                  }}
                />
                <ActionIcon
                  onClick={() => {
                    //   @ts-ignore
                    setProp((props) => {
                      props.menu.menus.splice(index, 1);
                    });
                  }}
                  variant="transparent"
                  size="xs"
                  color="red"
                >
                  <Trash2 />
                </ActionIcon>
              </Group>
              {!m.isCustom ? (
                <Select
                  placeholder="Select page"
                  data={pages}
                  value={m.href}
                  label="Pages"
                  onChange={(value) => {
                    const page = pages.find((p) => p.value == value);
                    //   @ts-ignore
                    setProp((props) => {
                      props.menu.menus[index].label = page?.label;
                      props.menu.menus[index].href = page?.value;
                      return props;
                    });
                  }}
                />
              ) : (
                <>
                  <TextInput
                    label="Label"
                    value={m.label}
                    onChange={(ev) => {
                      //   @ts-ignore
                      setProp((props) => {
                        props.menu.menus[index].label = ev.target.value;
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
                        props.menu.menus[index].href = ev.target.value;
                        return props;
                      });
                    }}
                  />
                </>
              )}
              <Checkbox
                label="Open In New Tab"
                checked={m.openInNewTab}
                onChange={(ev) => {
                  //   @ts-ignore
                  setProp((props) => {
                    props.menu.menus[index].openInNewTab = ev.target.checked;
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
              props.menu.menus.push({
                label: "",
                href: "",
                isCustom: false,
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

HeaderMenu.Placeholder = Placeholder;

export default HeaderMenu;
