import { useEditor } from "@craftjs/core";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import cx from "classnames";
import React, { useEffect } from "react";
import Toolbar from "../components/Toolbar";

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const {
    connectors,
    actions: { setOptions, history },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useHotkeys([
    ["mod+J", () => history.redo()],
    ["mod+K", () => history.undo()],
  ]);

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        "*"
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className="viewport">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div>Editor</div>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="0">
          <Toolbar />
        </AppShell.Navbar>
        <AppShell.Main
          bg="gray.2"
          className={cx([
            "page-container craftjs-renderer flex-1 h-full w-full transition overflow-auto",
          ])}
        >
          <div ref={(ref) => connectors.select(connectors.hover(ref!, ""), "")}>
            <div className="relative flex-col flex items-center">
              {children}
            </div>
          </div>
        </AppShell.Main>
      </AppShell>
    </div>
  );
};
