import { useEditor } from "@craftjs/core";
import { Layers as CraftLayers } from "@craftjs/layers";
import { Box, Button, Tabs } from "@mantine/core";
import { Component, Layers } from "lucide-react";
import ToolbarComponents from "./ToolbarComponents";

type ToolbarProps = {};

export default function Toolbar({}: ToolbarProps) {
  const { query } = useEditor();
  return (
    <Box
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "100px",
        overflowY: "auto",
      }}
    >
      <Button
        onClick={() => {
          console.log(query.serialize());
        }}
      >
        Export
      </Button>
      <Tabs defaultValue="components">
        <Tabs.List grow>
          <Tabs.Tab leftSection={<Component />} value="components">
            Components
          </Tabs.Tab>
          <Tabs.Tab leftSection={<Layers />} value="layers">
            Layers
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="components" pos="relative">
          <ToolbarComponents />
        </Tabs.Panel>
        <Tabs.Panel value="layers" pos="relative">
          <CraftLayers />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
