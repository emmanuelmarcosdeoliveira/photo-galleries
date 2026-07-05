/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";

interface PhotosListProps {
  photos: Photo[];
  loading?: boolean;
}

const PhotosList = ({ photos, loading }: PhotosListProps) => {
  return (
    <div className="space-y-6">
      <Text
        className="flex items-center justify-end gap-1 text-accent-span"
        variant="paragraph-large"
        as="div"
      >
        Total:{" "}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )}
      </Text>
      {!loading && photos?.length > 0 && (
        <div className="grid grid-cols-4  gap-9">
          {photos.map((photo) => (
            <PhotoWidget key={photo.id} photo={photo} />
          ))}
        </div>
      )}
      {loading && (
        <div className="grid grid-cols-4  gap-9">
          {Array.from({ length: 8 }).map((_, index) => (
            <PhotoWidget
              key={`photo-loading-${index}`}
              photo={{} as Photo}
              loading
            />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div>
          <Text
            className="justify-center flex items-center h-full"
            variant="paragraph-large"
          >
            Nenhuma foto encontrada
          </Text>
        </div>
      )}
    </div>
  );
};

export default PhotosList;
