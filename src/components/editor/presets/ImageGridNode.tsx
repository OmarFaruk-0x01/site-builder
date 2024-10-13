import { useNode } from "@craftjs/core";
import NodeSettingLayout from "~/editor/layouts/NodeSettingLayout";
import ImageGridList from "../components/ImageGridList";
import { ImageSettingType } from "../node-settings/Image";
import ImageGridContentSettings from "../node-settings/ImageGridContentSettings";

export type ImageGridContentType = {
  title: string;
  details: string;
  image: ImageSettingType;
  imageHref: string;
};

export type ImageGridContentStyleType = {};

export type ImageGridSettingType = {
  contents?: ImageGridContentType[];
  style?: ImageGridContentStyleType;
};

type ImageGridNodeProps = ImageGridSettingType & {};

const defaultHeroProps: ImageGridNodeProps = {
  contents: [
    {
      title: "Example 1",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde cupiditate quis eveniet voluptatum hic, maiores alias veniam animi mollitia,",
      image: {
        src: "/no-image.png",
        alt: "example-1",
        width: 100,
      },
      imageHref: "#",
    },
    {
      title: "Example 2",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde cupiditate quis eveniet voluptatum hic, maiores alias veniam animi mollitia,",
      image: {
        src: "/no-image.png",
        alt: "example-1",
        width: 100,
      },
      imageHref: "#",
    },
    {
      title: "Example 3",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde cupiditate quis eveniet voluptatum hic, maiores alias veniam animi mollitia,",
      image: {
        src: "/no-image.png",
        alt: "example-1",
        width: 100,
      },
      imageHref: "#",
    },
  ],
  style: {},
};

const ImageGridNode = (props: ImageGridNodeProps) => {
  const {
    connectors: { connect },
  } = useNode();

  props = { ...defaultHeroProps, ...props };

  const { contents } = props;

  return (
    <div ref={connect as any}>
      <ImageGridList contents={contents!} />
    </div>
  );
};

ImageGridNode.craft = {
  displayName: "Content Grid",
  props: defaultHeroProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: () => (
      <NodeSettingLayout
        settings={[
          {
            id: "contents",
            title: "Contents",
            render: () => <ImageGridContentSettings />,
            Placeholder: () => <ImageGridContentSettings.Placeholder />,
          },
        ]}
      />
    ),
  },
};

export default ImageGridNode;
