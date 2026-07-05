import cx from "classnames";
import type React from "react";
import { useNavigate } from "react-router";
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react";
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react";
import Button from "../../../components/button";
import ButtonIcon from "../../../components/button-icon";
import Skeleton from "../../../components/skeleton";

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
  previousPhotoId?: string;
  nextPhotoId?: string;
  loading?: boolean;
}

const PhotosNavigator = ({
  loading,
  previousPhotoId,
  nextPhotoId,
  className,
  ...props
}: PhotosNavigatorProps) => {
  const navigate = useNavigate();
  return (
    <div className={cx("flex gap-2", className)} {...props}>
      {!loading ? (
        <>
          <ButtonIcon
            icon={ArrowLeftIcon}
            variant="secondary"
            disabled={!previousPhotoId}
            onClick={() => navigate(`/fotos/${previousPhotoId}`)}
          />

          <Button
            disabled={!nextPhotoId}
            icon={ArrowRightIcon}
            variant="secondary"
            onClick={() => navigate(`/fotos/${nextPhotoId}`)}
          >
            Próxima Imagem
          </Button>
        </>
      ) : (
        <>
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-20" />
        </>
      )}
    </div>
  );
};

export default PhotosNavigator;
