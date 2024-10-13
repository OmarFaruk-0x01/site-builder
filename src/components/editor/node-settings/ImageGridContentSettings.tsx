import { useNode } from "@craftjs/core";
import {
  Accordion,
  ActionIcon,
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Trash2 } from "lucide-react";
import { ImageGridContentType } from "../presets/ImageGridNode";
import Image from "./Image";

type ImageGridContentSettingProps = {};

export default function ImageGridContentSetting({}: ImageGridContentSettingProps) {
  const {
    contents,
    actions: { setProp },
  } = useNode((state) => ({
    contents: state.data.props.contents as ImageGridContentType[],
  }));

  const onAddNewContent = () => {
    // @ts-ignore
    setProp((props) => {
      props.contents.push({
        title: "Example 1",
        details:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, recusandae quas ea, deleniti repellat dolore excepturi iure ullam molestias corporis officiis earum animi tenetur iste neque ipsa iusto atque! Eaque!",
        image: {
          src: "data:image/png;base64,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",
          alt: "image",
        },
      } as ImageGridContentType);
    });
  };

  return (
    <Stack>
      <Accordion chevronPosition="left">
        {contents.map((content, index) => (
          <Accordion.Item key={index} value={index.toString()}>
            <Accordion.Control>
              <Group justify="space-between">
                <span>Content {index + 1}</span>
                <ActionIcon
                  variant="outline"
                  color="red"
                  onClick={() => {
                    // @ts-ignore
                    setProp((props) => {
                      props.contents.splice(index, 1);
                    });
                  }}
                >
                  <Trash2 />
                </ActionIcon>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  onFileChange={(file) => {
                    // @ts-ignore
                    setProp((props) => {
                      props.contents[index].image.src =
                        URL.createObjectURL(file);
                    });
                  }}
                  onAltChange={(text) => {
                    // @ts-ignore
                    setProp((props) => {
                      props.contents[index].image.alt = text;
                    });
                  }}
                />

                <TextInput
                  label="Image Link to URL"
                  type="url"
                  value={content.imageHref}
                  onChange={(ev) => {
                    // @ts-ignore
                    setProp((props) => {
                      props.contents[index].imageHref = ev.target.value;
                    });
                  }}
                />

                <TextInput
                  label="Title"
                  value={content.title}
                  onChange={(ev) => {
                    // @ts-ignore
                    setProp((props) => {
                      props.contents[index].title = ev.target.value;
                    });
                  }}
                />
                <Textarea
                  label="Description"
                  value={content.details}
                  autosize
                  minRows={4}
                  onChange={(ev) => {
                    // @ts-ignore
                    setProp((props) => {
                      props.contents[index].details = ev.target.value;
                    });
                  }}
                />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <Button size="xs" onClick={onAddNewContent}>
        Add Content
      </Button>
    </Stack>
  );
}

ImageGridContentSetting.Placeholder = () => {
  return <></>;
};
