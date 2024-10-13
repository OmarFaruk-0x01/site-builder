import { useNode } from "@craftjs/core";
import { Button, Container, Divider, Stack } from "@mantine/core";
import { Facebook, Instagram, Twitter } from "lucide-react";
import ContentEditable from "react-contenteditable";
import NodeSettingLayout from "~/editor/layouts/NodeSettingLayout";
import HeaderLogo from "~/editor/node-settings/HeaderLogo";
import HeaderMenu from "~/editor/node-settings/HeaderMenus";
import HeaderStyles from "~/editor/node-settings/HeaderStyles";
import SocialIcons from "../node-settings/SocialIcons";
import {
  HeaderLogoType,
  HeaderMenuType,
  HeaderStyleType,
} from "./HeaderNode/HeaderNode";

export type SocialIconsType = {
  icons: {
    label: string;
    href: string;
    openInNewTab?: boolean;
  }[];
  menuStyles: {
    alignment: AlignSetting;
    fontSize: number;
    gap: number;
  };
};

interface FooterNodeProps {
  logo?: HeaderLogoType;
  menu?: HeaderMenuType;
  style?: HeaderStyleType;
  icons?: SocialIconsType;
}

const defaultHeaderProps: FooterNodeProps = {
  logo: {
    src: "/preline.svg",
    alt: "Logo",
    isImage: true,
    width: 35,
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
    backgroundColor: { r: 249, g: 249, b: 255, a: 1 },
  },
  icons: {
    icons: [
      { label: "facebook", href: "#", openInNewTab: true },
      { label: "twitter", href: "#", openInNewTab: true },
      { label: "instagram", href: "#", openInNewTab: true },
    ],
    menuStyles: {
      alignment: "right",
      fontSize: 14,
      gap: 25,
    },
  },
};

const FooterNode = (props: FooterNodeProps) => {
  const {
    connectors: { connect },
  } = useNode();

  props = { ...defaultHeaderProps, ...props };

  const { logo, style, menu, icons } = props;

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
        className="w-full gap-2"
        size="lg"
        fluid={style?.layout === "fluid"}
      >
        <div className="flex items-end justify-between pt-16 pb-8">
          <div className="flex flex-col items-start justify-start md:w-[500px]">
            {logo?.src ? (
              <div
                className="h-[50px]"
                style={{ width: `${logo.width}%`, maxWidth: `${logo.width}%` }}
              >
                <img
                  src={logo?.src}
                  alt={logo?.alt}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <span className="text-primary font-bold uppercase font-mono">
                {logo?.text}
              </span>
            )}
            <ContentEditable
              className="mt-5"
              html="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
              mollitia dicta quae, corrupti obcaecati iure ad inventore pariatur
              vitae, at beatae expedita alias qui unde nulla laboriosam sed
              cupiditate velit?"
              onChange={() => {}}
            ></ContentEditable>
            <ul
              className="flex-1 flex items-center mt-5"
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
          </div>
          <Stack gap="xs">
            <Button variant="default" size="xs">
              Login
            </Button>
            <Button variant="filled" size="xs">
              Signup
            </Button>
          </Stack>
        </div>
        <Divider mt="md" />
        <div className="flex items-center justify-between py-3">
          <ContentEditable
            html={`<span class="text-sm text-gray-500">
            &copy; 2022. All rights reserved.
          </span>`}
            onChange={() => {}}
          />
          <ul
            className="flex-1 flex items-center mt-2"
            style={{
              justifyContent: icons?.menuStyles?.alignment,
              gap: `${icons?.menuStyles?.gap}px`,
            }}
          >
            {icons?.icons?.map((m) => (
              <li
                className="font-medium hover:text-primary duration-150 transition-all"
                style={{
                  fontSize: `${icons.menuStyles?.fontSize}px`,
                }}
              >
                <a href={m.href} target={m.openInNewTab ? "_blank" : "_self"}>
                  {
                    {
                      facebook: <Facebook />,
                      twitter: <Twitter />,
                      instagram: <Instagram />,
                    }[m.label]
                  }
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

FooterNode.craft = {
  displayName: "Footer",
  props: defaultHeaderProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: () => (
      <NodeSettingLayout
        settings={[
          {
            id: "footer-style",
            title: "Styles",
            Placeholder: HeaderStyles.Placeholder,
            render() {
              return <HeaderStyles />;
            },
          },
          {
            id: "footer-logo",
            title: "Logo",
            Placeholder: HeaderLogo.Placeholder,
            render() {
              return <HeaderLogo />;
            },
          },
          {
            id: "footer-menu",
            title: "Menus",
            Placeholder: HeaderMenu.Placeholder,
            render() {
              return <HeaderMenu />;
            },
          },
          {
            id: "footer-icons",
            title: "Social Icons",
            Placeholder: SocialIcons.Placeholder,
            render() {
              return <SocialIcons />;
            },
          },
        ]}
      />
    ),
  },
};

export default FooterNode;
