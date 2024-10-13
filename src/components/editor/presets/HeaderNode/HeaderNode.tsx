import { useNode } from "@craftjs/core";
import { Button, Container, Divider, Group } from "@mantine/core";
import NodeSettingLayout from "~/editor/layouts/NodeSettingLayout";
import HeaderLogo from "~/editor/node-settings/HeaderLogo";
import HeaderMenu from "~/editor/node-settings/HeaderMenus";
import HeaderStyles from "~/editor/node-settings/HeaderStyles";
import { ImageSettingType } from "~/editor/node-settings/Image";

export type HeaderMenuType = {
  menus: {
    label: string;
    href: string;
    openInNewTab?: boolean;
    isCustom?: boolean;
  }[];
  menuStyles?: {
    fontSize?: number;
    gap?: number;
    alignment?: "left" | "center" | "right";
  };
};

export type HeaderLogoType = ImageSettingType & {
  text?: string;
  isImage?: boolean;
};

export type HeaderStyleType = {
  layout?: "container" | "fluid";
  backgroundColor?: { r: number; g: number; b: number; a: number };
};

interface HeaderNodeProps {
  logo?: HeaderLogoType;
  menu?: HeaderMenuType;
  style?: HeaderStyleType;
}

const defaultHeaderProps: HeaderNodeProps = {
  logo: {
    src: "/preline.svg",
    alt: "Logo",
    isImage: true,
    width: 10,
  },
  menu: {
    menus: [
      { href: "/", label: "Home" },
      { href: "/my-libraries", label: "My Libraries" },
      { href: "/contact-us", label: "Contact Us" },
    ],
    menuStyles: {
      alignment: "right",
      fontSize: 14,
      gap: 25,
    },
  },
  style: {
    layout: "container",
    backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
  },
};

const HeaderNode = (props: HeaderNodeProps) => {
  const {
    connectors: { connect },
  } = useNode();

  props = { ...defaultHeaderProps, ...props };

  const { logo, style, menu } = props;

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
        className="flex items-center justify-between w-full gap-2 p-5"
        size="lg"
        fluid={style?.layout === "fluid"}
      >
        {logo?.src ? (
          <div
            className="h-[50px]"
            style={{ width: `${logo.width}%`, maxWidth: `${logo.width}%` }}
          >
            <img src={logo?.src} alt={logo?.alt} className="w-full h-full" />
          </div>
        ) : (
          <span className="text-primary font-bold uppercase font-mono">
            {logo?.text}
          </span>
        )}
        <ul
          className="flex-1 flex items-center "
          style={{
            justifyContent: menu?.menuStyles?.alignment,
            gap: `${menu?.menuStyles?.gap}px`,
          }}
        >
          {menu?.menus?.map((m) => (
            <li
              className="font-medium hover:text-primary duration-150 transition-all"
              style={{
                fontSize: `${menu.menuStyles?.fontSize}px`,
              }}
            >
              <a href={m.href} target={m.openInNewTab ? "_blank" : "_self"}>
                {m.label}
              </a>
            </li>
          ))}
        </ul>
        <Divider mx="sm" w="2px" h="30px" bg="gray.1" />
        <Group gap="xs">
          <Button variant="default" size="xs">
            Login
          </Button>
          <Button variant="filled" size="xs">
            Signup
          </Button>
        </Group>
      </Container>
    </div>
  );
};

HeaderNode.craft = {
  displayName: "Header",
  props: defaultHeaderProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: () => (
      <NodeSettingLayout
        settings={[
          {
            id: "header-style",
            title: "Styles",
            Placeholder: HeaderStyles.Placeholder,
            render() {
              return <HeaderStyles />;
            },
          },
          {
            id: "header-logo",
            title: "Logo",
            Placeholder: HeaderLogo.Placeholder,
            render() {
              return <HeaderLogo />;
            },
          },
          {
            id: "header-menu",
            title: "Menus",
            Placeholder: HeaderMenu.Placeholder,
            render() {
              return <HeaderMenu />;
            },
          },
        ]}
      />
    ),
  },
};

export default HeaderNode;
