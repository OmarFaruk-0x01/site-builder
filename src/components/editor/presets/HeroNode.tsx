import { useNode } from "@craftjs/core";
import { Button, Group, Stack } from "@mantine/core";
import ContentEditable from "react-contenteditable";
import NodeSettingLayout from "~/editor/layouts/NodeSettingLayout";
import HeroSettings from "../node-settings/HeroSetting";

export type HeroSettingType = {
  title?: string;
  subtitle?: string;
  subtitle2?: string;
};

type HeroNodeProps = {
  hero?: HeroSettingType;
};

const defaultHeroProps: HeroNodeProps = {
  hero: {
    title: `Creating a <span class="!text-blue-500">Better Future</span>
          through education`,
    subtitle: "Online E-Learning Courses",
    subtitle2:
      "It is long established fact that reader distracted by the readable content",
  },
};

const HeroNode = (props: HeroNodeProps) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();

  props = { ...defaultHeroProps, ...props };

  const { title, subtitle, subtitle2 } = props.hero!;

  return (
    <div
      ref={connect as any}
      className="border w-full h-[600px] bg-[url(/hero-bg.png)] flex items-center justify-center bg-no-repeat bg-center bg-cover"
    >
      <Stack className="w-full md:w-[500px] text-center">
        <ContentEditable
          html={subtitle!}
          className="text-lg"
          onChange={(e) =>
            // @ts-ignore
            setProp((props) => (props.subtitle = e.target.value))
          }
        />
        <ContentEditable
          html={title!}
          className="text-[2.5rem] font-semibold"
          onChange={(e) =>
            // @ts-ignore
            setProp((props) => (props.title = e.target.value))
          }
        ></ContentEditable>
        <ContentEditable
          html={subtitle2!}
          className="text-lg"
          onChange={(e) =>
            // @ts-ignore
            setProp((props) => (props.subtitle2 = e.target.value))
          }
        ></ContentEditable>
        <Group justify="center">
          <Button>All Courses</Button>
          <Button variant="default">Contact Us</Button>
        </Group>
      </Stack>
    </div>
  );
};

HeroNode.craft = {
  displayName: "Hero",
  props: defaultHeroProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: () => (
      <NodeSettingLayout
        settings={[
          {
            id: "hero",
            title: "Hero Settings",
            render: () => <HeroSettings />,
            Placeholder: () => <HeroSettings.Placeholder />,
          },
        ]}
      />
    ),
  },
};

export default HeroNode;
