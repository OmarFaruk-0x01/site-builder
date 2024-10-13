import { Accordion } from "@mantine/core";

type ToolSettingProps = {};

export default function ToolSetting({}: ToolSettingProps) {
  return (
    <div>
      <Accordion>
        <Accordion.Item value="basic">
          <Accordion.Control>Basic</Accordion.Control>
          <Accordion.Panel>abc</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
