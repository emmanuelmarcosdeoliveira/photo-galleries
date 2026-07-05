/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
import { Link } from "react-router";
import Badge from "../../../components/badge";
import { buttonTextVariants, buttonVariants } from "../../../components/button";
import ImagePreview from "../../../components/image-preview";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../models/photo";

interface PhotoWidgetProps {
  photo: Photo;
  loading?: boolean;
}

const PhotoWidget = ({ photo, loading }: PhotoWidgetProps) => {
  return (
    <div className="flex flex-col gap-4">
      {!loading ? (
        <ImagePreview
          src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
          title={photo.title}
          imageClassName="w-[13.625rem] h-[13.625rem] rounded-lg"
        />
      ) : (
        <Skeleton className="w-54.5 h-54.5 rounded-lg" />
      )}
      <div className="flex flex-col gap-2">
        {!loading ? (
          <Text className="truncate" variant="paragraph-large">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="w-full h-6" />
        )}
        <div className="flex gap-1 min-h-5.5">
          {!loading ? (
            <>
              {photo.albums.slice(0, 2).map((album) => (
                <Badge size="xs" className="truncate" key={album.id}>
                  {album.title}
                </Badge>
              ))}
              {photo.albums.length > 2 && (
                <Badge size="xs"> + {photo.albums.length - 2}</Badge>
              )}
            </>
          ) : (
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                className="w-full h-5 rounded-sm"
                key={`album-loading${index}`}
              />
            ))
          )}
        </div>
      </div>
      {!loading ? (
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "px-2 py-2",
          })}
          to={`/fotos/${photo.id}`}
        >
          <Text
            className={buttonTextVariants({
              variant: "secondary",
              size: "sm",
            })}
          >
            Detalhes da imagem
          </Text>
        </Link>
      ) : (
        <Skeleton className="w-full h-10" />
      )}
    </div>
  );
};

export default PhotoWidget;
