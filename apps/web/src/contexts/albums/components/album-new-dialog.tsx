/** biome-ignore-all lint/suspicious/noArrayIndexKey: <desnecessarie> */
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import SelectCheckBoxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Button from "../../../components/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";
import useAlbum from "../hooks/use-album";
import { type AlbumNewFromSchema, albumNewSchema } from "../schema";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

const AlbumNewDialog = ({ trigger }: AlbumNewDialogProps) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { photos, isLoadingPhotos } = usePhotos();
  const { createAlbum } = useAlbum();
  const [isCreatingAlbum, setIsCreatingAlbum] = React.useTransition();
  const form = useForm<AlbumNewFromSchema>({
    resolver: zodResolver(albumNewSchema),
  });

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photoIds") || [];
    if (selected) {
      form.setValue("photoIds", [...photosIds, photoId]);
    } else {
      form.setValue(
        "photoIds",
        photosIds.filter((id) => id !== photoId),
      );
    }
  }

  function handleSubmit(payload: AlbumNewFromSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload);
      setModalOpen(false);
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um Título"
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <div className="space-y-4">
              <Text as="p" className="mb-3" variant="label-small">
                Fotos cadastradas
              </Text>
              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                      imageClassName="w-20 h-20"
                      onSelectImage={(selected) =>
                        handleTogglePhoto(selected, photo.id)
                      }
                    />
                  ))}
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      className="w-20 h-20 rounded-lg"
                      key={`photo-loading-${index}`}
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center gap-3">
                  <SelectCheckBoxIllustration />
                  <Text className="text-center" variant="paragraph-medium">
                    Nenhum foto disponível para seleção
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isCreatingAlbum} variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={isCreatingAlbum}
              handling={isCreatingAlbum}
              type="submit"
            >
              {isCreatingAlbum ? "Criando" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumNewDialog;
