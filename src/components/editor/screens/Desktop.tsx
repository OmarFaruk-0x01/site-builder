import { Paper } from "@mantine/core";

type DesktopProps = {};

export default function ({}: DesktopProps) {
  return (
    <Paper
      bg="transparent"
      className="page-container min-h-[calc(100vh-100px)]"
    ></Paper>
  );
}
