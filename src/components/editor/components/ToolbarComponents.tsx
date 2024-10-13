import { Element, useEditor } from "@craftjs/core";
import { Accordion, SimpleGrid, Transition } from "@mantine/core";
import {
  BoxSelect,
  MoreHorizontal,
  SquareMousePointer,
  TextCursorIcon,
} from "lucide-react";
import { createElement } from "react";
import ButtonNode from "../nodes/ButtonNode";
import ContainerNode from "../nodes/ContainerNode";
import TextNode from "../nodes/TextNode";
import AnnouncementNode from "../presets/AnnouncementNode";
import HeaderNode from "../presets/HeaderNode/HeaderNode";
import ToolButton from "./ToolButton";

type ToolbarComponentsProps = {};

export default function ToolbarComponents({}: ToolbarComponentsProps) {
  const { connectors, related, selectedNodeId } = useEditor((state, query) => {
    const selectedNodeId = query.getEvent("selected").first();

    return {
      selectedNodeId,
      related: selectedNodeId && state.nodes[selectedNodeId!]?.related,
    };
  });

  return (
    <>
      <Transition
        mounted={!!selectedNodeId && !!related.toolbar}
        transition="slide-left"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <div
            style={{
              ...styles,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            {related?.toolbar && createElement(related.toolbar)}
          </div>
        )}
      </Transition>
      <Transition
        mounted={!selectedNodeId || !related?.toolbar}
        transition="slide-right"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <div
            style={{
              ...styles,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <Accordion p="0" defaultValue="basic">
              <Accordion.Item value="basic">
                <Accordion.Control>Basic</Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={2}>
                    <ToolButton
                      icon={<BoxSelect style={{ width: 20, height: 20 }} />}
                      label="Container"
                      btnRef={(ref) => {
                        connectors.create(
                          ref,
                          <Element
                            canvas
                            is={ContainerNode}
                            id="Introduction"
                            flexDirection="row"
                            width="100%"
                            height="auto"
                            background={{ r: 255, g: 255, b: 255, a: 1 }}
                            padding={["40", "40", "40", "40"]}
                            margin={["0", "0", "40", "0"]}
                            custom={{ displayName: "Container" }}
                          />
                        );
                      }}
                    />
                    <ToolButton
                      icon={
                        <TextCursorIcon style={{ width: 20, height: 20 }} />
                      }
                      label="Text"
                      btnRef={(ref) => {
                        connectors.create(ref, <TextNode text="Hello" />);
                      }}
                    />
                    <ToolButton
                      icon={
                        <SquareMousePointer style={{ width: 20, height: 20 }} />
                      }
                      label="Button"
                      btnRef={(ref) => {
                        connectors.create(
                          ref,
                          <ButtonNode>New Button</ButtonNode>
                        );
                      }}
                    />
                  </SimpleGrid>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="presets">
                <Accordion.Control>Presets</Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={2}>
                    <ToolButton
                      icon={
                        <MoreHorizontal style={{ width: 20, height: 20 }} />
                      }
                      label="Header"
                      btnRef={(ref) => {
                        connectors.create(ref, <Element is={HeaderNode} />);
                      }}
                    />
                    <ToolButton
                      icon={
                        <MoreHorizontal style={{ width: 20, height: 20 }} />
                      }
                      label="Announcement"
                      btnRef={(ref) => {
                        connectors.create(
                          ref,
                          <Element
                            is={AnnouncementNode}
                            text="Put your text here!!"
                          />
                        );
                      }}
                    />
                  </SimpleGrid>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
      </Transition>
    </>
  );
}
