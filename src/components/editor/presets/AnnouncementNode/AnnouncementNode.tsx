import { useNode } from "@craftjs/core";
import { Container } from "@mantine/core";
import { FileWarning } from "lucide-react";
import ContentEditable from "react-contenteditable";
import NodeSettingLayout from "~/editor/layouts/NodeSettingLayout";
import AnnouncementStyles from "~/editor/node-settings/AnnouncementStyles";

export type AnnouncementStyleType = {
  layout?: "container" | "fluid";
  backgroundColor?: { r: number; g: number; b: number; a: number };
  color?: { r: number; g: number; b: number; a: number };
  fontSize?: number;
  alignment?: "left" | "center" | "right";
};

interface AnnouncementNodeProps {
  text: string;
  style?: AnnouncementStyleType;
}

const defaultAnnouncementProps: AnnouncementNodeProps = {
  text: "Put your announcement here!!",
  style: {
    layout: "container",
    backgroundColor: { r: 255, g: 200, b: 200, a: 1 },
    color: { r: 0, g: 0, b: 0, a: 1 },
    fontSize: 14,
    alignment: "left",
  },
};

const AnnouncementNode = (props: AnnouncementNodeProps) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();

  props = { ...defaultAnnouncementProps, ...props };

  const { style, text } = props;

  return (
    <div
      className="w-full"
      ref={connect as any}
      style={{
        backgroundColor: style?.backgroundColor
          ? `rgba(${style.backgroundColor?.r}, ${style.backgroundColor.g},${style.backgroundColor.b}, ${style.backgroundColor.a})`
          : undefined,
      }}
    >
      <Container
        className="flex items-center w-full gap-2 p-2"
        size="lg"
        fluid={style?.layout === "fluid"}
        style={{
          fontSize: `${style?.fontSize}px`,
          justifyContent: style?.alignment,
        }}
      >
        <FileWarning
          style={{
            color: style?.color
              ? `rgba(${style.color?.r}, ${style.color.g},${style.color.b}, ${style.color.a})`
              : undefined,
          }}
        />
        <span
          style={{
            color: style?.color
              ? `rgba(${style.color?.r}, ${style.color.g},${style.color.b}, ${style.color.a})`
              : undefined,
          }}
        >
          <ContentEditable
            html={text!} // innerHTML of the editable div
            onChange={(e) => {
              // @ts-ignore
              setProp((prop) => (prop.text = e.target.value), 500);
            }}
          />
        </span>
      </Container>
    </div>
  );
};

AnnouncementNode.craft = {
  displayName: "Announcement",
  props: defaultAnnouncementProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: () => (
      <NodeSettingLayout
        settings={[
          {
            id: "styles",
            title: "Styles",
            Placeholder: AnnouncementStyles.Placeholder,
            render() {
              return <AnnouncementStyles />;
            },
          },
        ]}
      />
    ),
  },
};

export default AnnouncementNode;
