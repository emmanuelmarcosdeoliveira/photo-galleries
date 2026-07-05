import cx from "classnames";
import type { ComponentProps } from "react";
import { Link, useLocation } from "react-router";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import AlbumNewDialog from "../contexts/albums/components/album-new-dialog";
import PhotoNewDialog from "../contexts/photos/components/photo-new-dialog";
import Button from "./button";
import Container from "./container";
import Divider from "./divider";
import PhotosSearch from "./photos-search";

interface MainHeaderProps extends ComponentProps<typeof Container> {}

const MainHeader = ({ className, ...props }: MainHeaderProps) => {
  const { pathname } = useLocation();
  return (
    <Container
      className={cx("flex justify-between mt-9 items-center gap-10", className)}
      as="header"
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      {pathname === "/" && (
        <>
          <PhotosSearch />
          <Divider orientation="vertical" className="h-10" />
        </>
      )}

      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>Nova Foto</Button>} />
        <AlbumNewDialog
          trigger={<Button variant="secondary">Criar Album</Button>}
        />
      </div>
    </Container>
  );
};

export default MainHeader;
