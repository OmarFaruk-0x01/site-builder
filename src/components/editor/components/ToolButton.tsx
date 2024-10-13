import { Paper, Stack, Text } from "@mantine/core";
import { ReactNode } from "react";

type ToolButtonProps = {
  label: string;
  icon: ReactNode;
  btnRef?: (ref: HTMLButtonElement) => any;
};

export default function ToolButton({ icon, label, btnRef }: ToolButtonProps) {
  return (
    // @ts-ignore
    <Paper ref={btnRef} role="button" p="md" radius="md" withBorder>
      <Stack align="center" justify="center" gap="xs">
        {icon}
        <Text size="xs">{label}</Text>
      </Stack>
    </Paper>
  );
}
