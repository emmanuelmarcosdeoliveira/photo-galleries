import React from "react";
import { useParams } from "react-router";
import Button from "../components/button";
import Container from "../components/container";
import ImagePreview from "../components/image-preview";
import Skeleton from "../components/skeleton";
import Text from "../components/text";
import AlbumsListSelectable from "../contexts/albums/components/albuns-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import usePhoto from "../contexts/photos/hooks/use-photo";
import type { Photo } from "../contexts/photos/models/photo";

const PagePhotoDetails = () => {
  const { id } = useParams();
  const { photo, isLoadingPhoto, nextPhotoId, previousPhotoId, deletePhoto } =
    usePhoto(id);

  const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition();

  const { albums, isLoadingAlbums } = useAlbums();

  if (!isLoadingPhoto && !photo) {
    return <div>Foto não encontrada</div>;
  }

  function handleDeletePhoto() {
    setIsDeletingPhoto(async () => {
      // biome-ignore lint/style/noNonNullAssertion: < o elemento sempre ira existir >
      await deletePhoto(photo!.id);
    });
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">
            {photo?.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotosNavigator
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
          loading={isLoadingPhoto}
        />
      </header>
      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-84" />
          )}
          {!isLoadingPhoto ? (
            <Button
              variant="destructive"
              disabled={isDeletingPhoto}
              onClick={handleDeletePhoto}
            >
              {isDeletingPhoto ? "Excluindo..." : "Excluir"}
            </Button>
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>
        <div className="py-3">
          <Text className="mb-6" variant="heading-medium" as="h3">
            Álbuns
          </Text>
          <AlbumsListSelectable
            photo={photo as Photo}
            albums={albums}
            loading={isLoadingAlbums}
          />
        </div>
      </div>
    </Container>
  );
};

export default PagePhotoDetails;
