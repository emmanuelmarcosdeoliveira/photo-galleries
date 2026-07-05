import React from "react";
import SearchIcon from "../assets/icons/search.svg?react";
import usePhotos from "../contexts/photos/hooks/use-photos";
import { debounce } from "../helpers/util";
import InputText from "./input-text";

const PhotosSearch = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { filters } = usePhotos();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      filters.setQ(value);
    }, 300),
    [filters.setQ],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar Fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default PhotosSearch;
