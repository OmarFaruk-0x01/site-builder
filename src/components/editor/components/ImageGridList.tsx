import { ImageSettingType } from "../node-settings/Image";

type ImageGridListProps = {
  contents: {
    title: string;
    details: string;
    image: ImageSettingType;
    imageHref: string;
  }[];
};

export default function ImageGridList({ contents }: ImageGridListProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white w-full p-10">
        <ul
          role="list"
          className="flex items-center justify-center grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 xl:gap-x-8 flex-wrap"
        >
          {contents?.map((content, index) => (
            <li
              key={index}
              className="min-w-[320px] max-w-[320px] relative flex flex-col items-center"
            >
              <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt={content.image.alt}
                  src={content.image.src}
                  className="pointer-events-none object-cover group-hover:opacity-75"
                />
                <a
                  type="button"
                  className="absolute inset-0 focus:outline-none text-center"
                  href={content.imageHref}
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <span className="sr-only">
                    View details for {content.title}
                  </span>
                </a>
              </div>
              <h3 className="pointer-events-none truncate text-xl font-medium text-gray-900 text-center mt-3">
                {content.title}
              </h3>
              <p className="pointer-events-none text-sm font-medium text-gray-500 text-center px-2 mt-3">
                {content.details}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
