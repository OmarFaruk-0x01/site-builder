import { useNode } from "@craftjs/core";
import { Flex, FlexProps } from "@mantine/core";

type FlexNodeProps = FlexProps & {};

export default function FlexNode({ children, ...props }: FlexNodeProps) {
  const {
    connectors: { drag, connect },
  } = useNode();

  return (
    <Flex {...props} ref={(ref) => connect(drag(ref!))}>
      {children}
    </Flex>
  );
}
