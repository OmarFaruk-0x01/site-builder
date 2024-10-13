import { useNode } from "@craftjs/core";
import {
  ActionIcon,
  Group,
  Paper,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";

import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import useCourses from "~/hooks/use-courses";
import { FeaturedCourseType } from "../presets/FeaturedCourseNode";

type FeaturedCourseContentProps = {};

export default function FeaturedCourseContent({}: FeaturedCourseContentProps) {
  const [_courses] = useCourses();
  const {
    courses,
    courseIds,
    title,
    subtitle,
    actions: { setProp },
  } = useNode((state) => ({
    title: state.data.props.title as string,
    subtitle: state.data.props.subtitle as string,
    courses: state.data.props.courses as FeaturedCourseType[],
    courseIds: (state.data.props.courses as FeaturedCourseType[])?.map((c) =>
      c.id.toString()
    ),
  }));

  const selectData = useMemo(
    () =>
      _courses
        .filter((c) => !courseIds.includes(c.id.toString()))
        .map((c) => ({ label: c.title, value: c.id.toString() })),
    [_courses, courseIds]
  );

  return (
    <Stack>
      <TextInput
        label="Title"
        onChange={(ev) => {
          // @ts-ignore
          setProp((props) => {
            props.title = ev.target.value;
          });
        }}
        value={title}
      />
      <Textarea
        label="Description"
        value={subtitle}
        onChange={(ev) => {
          // @ts-ignore
          setProp((props) => {
            props.subtitle = ev.target.value;
          });
        }}
        autosize
      />
      <span className="text-md">Courses</span>
      <Select
        data={selectData}
        onChange={(courseId) => {
          const course = _courses.find((c) => c.id.toString() == courseId);
          //   @ts-ignore
          setProp((props) => {
            props.courses.push({
              id: parseInt(course?.id as string),
              title: course?.title,
              description: course?.description,
              thumbnail: course?.image,
            } as FeaturedCourseType);
          });
        }}
        disabled={selectData.length == 0}
      />
      {courses.map((course) => (
        <Paper p="xs" radius="sm" withBorder>
          <Group justify="space-between">
            <span>{course.title}</span>
            <ActionIcon
              variant="transparent"
              color="red"
              onClick={() => {
                //   @ts-ignore
                setProp((props) => {
                  props.courses = (
                    props.courses as FeaturedCourseType[]
                  )?.filter((c) => c.id != course.id);
                });
              }}
            >
              <Trash2 />
            </ActionIcon>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}

FeaturedCourseContent.Placeholder = () => {
  return <></>;
};
