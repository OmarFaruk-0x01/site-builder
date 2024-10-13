import { useEditor } from "@craftjs/core";
import { Accordion, Button, Group, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { NodeSettingType } from "../node-settings";

type NodeSettingLayoutProps = {
  settings: NodeSettingType[];
};

export default function NodeSettingLayout({
  settings,
}: NodeSettingLayoutProps) {
  const { actions } = useEditor();

  return (
    <>
      <Button
        my="sm"
        size="xs"
        leftSection={<ChevronLeft className="w-4 h-4" />}
        variant="transparent"
        onClick={() => actions.clearEvents()}
      >
        Back to components
      </Button>
      <Accordion
        chevronPosition="left"
        // @ts-ignore
        defaultValue={settings.map((s) => s.id)}
      >
        {settings.map((component) => (
          <Accordion.Item value={component.id} key={component.id}>
            <Accordion.Control>
              <Group justify="space-between">
                <Text>{component.title}</Text>
                <Text size="xs" c="gray.6">
                  <component.Placeholder />
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>{component.render()}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
