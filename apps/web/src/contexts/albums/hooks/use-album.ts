import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../helpers/api";
import usePhotoAlbums from "../../photos/hooks/use-photo-albums";
import usePhotos from "../../photos/hooks/use-photos";
import type { Album } from "../models/album";
import type { AlbumNewFromSchema } from "../schema";

export default function useAlbum() {
  const queryClient = useQueryClient();
  const { photos } = usePhotos();
  const { managePhotoOnAlbum } = usePhotoAlbums();
  async function createAlbum(payload: AlbumNewFromSchema) {
    try {
      const { data: album } = await api.post<Album>("/albums", {
        title: payload.title,
      });
      if (payload.photoIds && payload.photoIds.length > 0) {
        await Promise.all(
          payload.photoIds.map((photoId) => {
            const photosAlbumsIds =
              photos
                .find((photo) => photo.id === photoId)
                ?.albums?.map((album) => album.id) || [];

            return managePhotoOnAlbum(photoId, [...photosAlbumsIds, album.id]);
          }),
        );
      }
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Album criado com sucesso");
    } catch (error) {
      toast.error("error ao criar álbum");
      throw error;
    }
  }
  return {
    createAlbum,
  };
}
