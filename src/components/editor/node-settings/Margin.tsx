import { useNode } from "@craftjs/core";
import { Group, NumberInput, Text } from "@mantine/core";

type MarginProps = {};

function Margin({}: MarginProps) {
  const { margin, setProp } = useNode((state) => ({
    margin: state.data.props.margin as number[],
  }));

  return (
    <Group grow>
      <NumberInput
        size="xs"
        onChange={(value) =>
          setProp(
            (props) =>
              (props.margin = [
                value,
                props.margin[1],
                props.margin[2],
                props.margin[3],
              ])
          )
        }
        value={margin[0]}
      />
      <NumberInput
        size="xs"
        onChange={(value) =>
          setProp(
            (props) =>
              (props.margin = [
                props.margin[0],
                value,
                props.margin[2],
                props.margin[3],
              ])
          )
        }
        value={margin[1]}
      />
      <NumberInput
        size="xs"
        onChange={(value) =>
          setProp(
            (props) =>
              (props.margin = [
                props.margin[0],
                props.margin[1],
                value,
                props.margin[3],
              ])
          )
        }
        value={margin[2]}
      />
      <NumberInput
        size="xs"
        onChange={(value) =>
          setProp(
            (props) =>
              (props.margin = [
                props.margin[0],
                props.margin[1],
                props.margin[2],
                value,
              ])
          )
        }
        value={margin[3]}
      />
    </Group>
  );
}

function Placeholder() {
  const { margin } = useNode((state) => ({
    margin: state.data.props.margin as number[],
  }));

  return (
    <Text size="xs" c="gray.6">
      {margin[0]}px {margin[1]}px {margin[2]}px {margin[3]}px
    </Text>
  );
}

Margin.Placeholder = Placeholder;

export default Margin;
