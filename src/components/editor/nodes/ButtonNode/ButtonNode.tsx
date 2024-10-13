import { useNode } from "@craftjs/core";
import { Button, ButtonProps } from "@mantine/core";
import React from "react";
import NodeSettingLayout from "~/editor/layouts/NodeSettingLayout";
import Margin from "~/editor/node-settings/Margin";
import Typography from "~/editor/node-settings/Typography";

type ButtonNodeProps = ButtonProps & {
  background?: Record<"r" | "g" | "b" | "a", number>;
  color?: Record<"r" | "g" | "b" | "a", number>;
  buttonStyle?: string;
  margin?: [number, number, number, number];
  text?: string;
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  fontWeight?: number;
  textComponent?: React.ReactNode;
};

export default function ButtonNode({
  children,
  background,
  color,
  buttonStyle,
  margin,
  text,
  fontSize,
  textAlign,
  fontWeight,
  textComponent,
  ...props
}: ButtonNodeProps) {
  const {
    connectors: { connect },
  } = useNode();

  const styles = {
    backgroundColor: background
      ? `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`
      : undefined,
    color: color
      ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : undefined,
    margin: margin ? margin.map((m) => `${m}px`).join(" ") : undefined,
  };

  return (
    <Button
      {...props}
      ref={connect as any}
      style={{ ...styles, ...props.style }}
      styles={{
        label: {
          fontSize: fontSize ? `${fontSize}px` : undefined,
          textAlign: textAlign ? textAlign : undefined,
          fontWeight: fontWeight ? `${fontWeight}` : undefined,
        },
      }}
      className={`${buttonStyle} ${props.className || ""}`}
    >
      {text || children}
      {textComponent}
    </Button>
  );
}

ButtonNode.craft = {
  props: {
    children: "Button",
    background: { r: 0, g: 123, b: 255, a: 1 },
    color: { r: 255, g: 255, b: 255, a: 1 },
    buttonStyle: "",
    margin: ["0", "0", "0", "0"],
    text: "Button",
  },
  related: {
    toolbar: () => (
      <NodeSettingLayout
        settings={[
          {
            id: "typography",
            title: "Typography",
            Placeholder: Typography.Placeholder,
            render() {
              return <Typography />;
            },
          },
          {
            id: "margin",
            title: "Margin",
            Placeholder: Margin.Placeholder,
            render() {
              return <Margin />;
            },
          },
        ]}
      />
    ),
  },
};
