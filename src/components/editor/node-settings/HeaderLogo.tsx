import { useNode } from "@craftjs/core";
import { Select, Stack, TextInput } from "@mantine/core";
import { HeaderLogoType } from "../presets/HeaderNode/HeaderNode";
import Image from "./Image";

type HeaderLogoProps = {};

function HeaderLogo({}: HeaderLogoProps) {
  const {
    logo,

    actions: { setProp },
  } = useNode((state) => ({
    logo: state.data.props.logo as HeaderLogoType,
  }));

  return (
    <Stack>
      <Select
        data={[
          { label: "Image", value: "image" },
          { label: "Text", value: "text" },
        ]}
        value={logo?.isImage ? "image" : "text"}
        onChange={(value) => {
          // @ts-ignore
          setProp((props) => {
            props.logo.isImage = value === "image";
          });
        }}
      />

      {logo?.isImage ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          onFileChange={(file) => {
            // @ts-ignore
            setProp((props) => {
              props.logo.src = URL.createObjectURL(file);
            });
          }}
          onAltChange={(text) => {
            // @ts-ignore
            setProp((props) => {
              props.logo.alt = text;
            });
          }}
        />
      ) : (
        <>
          <TextInput
            label="Logo Text"
            value={logo.text}
            onChange={(ev) => {
              // @ts-ignore
              setProp((props) => {
                props.logo.src = "";
                props.logo.alt = "";
                props.logo.text = ev.target.value;
              });
            }}
          />
        </>
      )}
    </Stack>
  );
}

function Placeholder() {
  return <></>;
}

HeaderLogo.Placeholder = Placeholder;

export default HeaderLogo;
