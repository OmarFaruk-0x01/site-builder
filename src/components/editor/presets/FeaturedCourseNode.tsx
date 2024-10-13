import { useNode } from "@craftjs/core";
import { useMemo } from "react";
import ContentEditable from "react-contenteditable";
import ImageGridList from "../components/ImageGridList";
import NodeSettingLayout from "../layouts/NodeSettingLayout";
import FeaturedCourseContent from "../node-settings/FeaturedCourseContent";
import { ImageGridContentType } from "./ImageGridNode";

export type FeaturedCourseType = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

const defaultFeaturedCourseProps: FeaturedCourseNodeProps = {
  title: "Featured Courses",
  subtitle:
    "Showcase other available courses, bundles, and coaching products you’re selling with the Featured Products block to provide alternatives to visitors who may not be interested in this specific product.",
  courses: [],
};

type FeaturedCourseNodeProps = {
  title?: string;
  subtitle?: string;
  courses?: FeaturedCourseType[];
};

const defaultContents = [
  {
    title: "Course 1",
    details: "course-2",
    image: {
      src: "/no-image.png",
      alt: "course-thumbnail",
    },
    imageHref: "#",
  },
  {
    title: "Course 2",
    details: "course-2",
    image: {
      src: "/no-image.png",
      alt: "course-thumbnail",
    },
    imageHref: "#",
  },
  {
    title: "Course 3",
    details: "course-3",
    image: {
      src: "/no-image.png",
      alt: "course-thumbnail",
    },
    imageHref: "#",
  },
];

export default function FeaturedCourseNode(props: FeaturedCourseNodeProps) {
  const {
    connectors: { connect },
    actions: { setProp },
    id,
  } = useNode();
  props = { ...defaultFeaturedCourseProps, ...props };

  const { courses, subtitle, title } = props;

  console.log("FeatureNode", { courses, id });

  const contents = useMemo(() => {
    if ((courses?.length as number) > 0) {
      return courses?.map(
        (course) =>
          ({
            title: course.title,
            details: course.description,
            image: {
              src: course.thumbnail,
              alt: course.title,
            },
            imageHref: `https://klasio.test/courses/${course.id}`,
          } as ImageGridContentType)
      );
    }
    return defaultContents;
  }, [courses]);

  return (
    <div
      ref={connect as any}
      className="bg-white w-full flex flex-col gap-2 py-3 justify-center items-center"
    >
      <h2 className="flex text-xl font-semibold">
        <ContentEditable
          html={title! || ""}
          onChange={(value) => {
            // @ts-ignore
            setProp((props) => (props.title = value.target.value));
          }}
        />
      </h2>
      <p className="text-center">
        <ContentEditable
          html={subtitle! || ""}
          onChange={(value) => {
            // @ts-ignore
            setProp((props) => (props.subtitle = value.target.value));
          }}
        />
      </p>
      <ImageGridList contents={contents!} />
    </div>
  );
}

FeaturedCourseNode.craft = {
  displayName: "Featured Courses",
  props: defaultFeaturedCourseProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: () => (
      <NodeSettingLayout
        settings={[
          {
            id: "courses",
            title: "Content",
            Placeholder: FeaturedCourseContent.Placeholder,
            render: () => <FeaturedCourseContent />,
          },
        ]}
      />
    ),
  },
};
