import { Editor as CraftEditor, Element, Frame } from "@craftjs/core";
import { Box } from "@mantine/core";
import ButtonNode from "./nodes/ButtonNode";
import ContainerNode from "./nodes/ContainerNode";
import FlexNode from "./nodes/FlexNode";
import RenderNode from "./nodes/Node";
import TextNode from "./nodes/TextNode";
import AnnouncementNode from "./presets/AnnouncementNode";
import FeaturedCourseNode from "./presets/FeaturedCourseNode";
import FooterNode from "./presets/FooterNode";
import HeaderNode from "./presets/HeaderNode/HeaderNode";
import HeroNode from "./presets/HeroNode";
import ImageGridNode from "./presets/ImageGridNode";
import Desktop from "./screens/Desktop";
import { Viewport } from "./screens/Viewport";

type EditorProps = {};

function Editor({}: EditorProps) {
  return (
    <CraftEditor
      resolver={{
        Desktop,
        TextNode,
        ButtonNode,
        ContainerNode,
        Box,
        FlexNode,
        HeaderNode,
        AnnouncementNode,
        HeroNode,
        FooterNode,
        ImageGridNode,
        FeaturedCourseNode,
      }}
      onRender={RenderNode}
    >
      <Viewport>
        <Frame>
          <Element
            canvas
            is={ContainerNode}
            width="100%"
            height="auto"
            background={{ r: 255, g: 255, b: 255, a: 1 }}
            padding={["0", "0", "0", "0"]}
            custom={{ displayName: "Desktop" }}
            id="Desktop"
          >
            <Element is={AnnouncementNode} text="Lorem resd" />
            <Element is={HeaderNode} />
            <Element is={HeroNode} />
            <Element is={ImageGridNode} />
            <Element is={FeaturedCourseNode} />
            <div className="h-[300px]"></div>
            <Element is={FooterNode} />

            {/* <Element
              canvas
              is={ContainerNode}
              flexDirection="row"
              width="100%"
              height="auto"
              padding={["40", "40", "40", "40"]}
              margin={["0", "0", "40", "0"]}
              custom={{ displayName: "Introduction" }}
            >
              <Element
                canvas
                is={ContainerNode}
                width="40%"
                height="100%"
                padding={["0", "20", "0", "20"]}
                custom={{ displayName: "Heading" }}
              >
                <TextNode
                  fontSize="23"
                  fontWeight="400"
                  text="Hello, World!"
                ></TextNode>
              </Element>
              <Element
                canvas
                is={ContainerNode}
                width="60%"
                height="100%"
                padding={["0", "20", "0", "20"]}
                custom={{ displayName: "Description" }}
              >
                <TextNode
                  fontSize="14"
                  fontWeight="400"
                  text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente neque excepturi cupiditate soluta ut quasi reiciendis hic! Consequatur illum quas iusto. Quidem, sapiente magnam possimus delectus deserunt quisquam aut nemo!"
                ></TextNode>
              </Element>
            </Element> */}
          </Element>
        </Frame>
      </Viewport>
    </CraftEditor>
  );
}

export default Editor;
