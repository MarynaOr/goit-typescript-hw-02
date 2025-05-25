import { useState } from "react";
// import "./App.css";
import './App.css'
import { Toaster } from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";

export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string | null;
}

interface APIResponse {
  results: Image[];
  total: number;
  total_pages: number;
}
function App() {
  const KEY = "EDQlrnIEQ_NrkKvjtjVS0rM0jqjFEHM6C-Vg9Y-RbyU";
  const URL = "https://api.unsplash.com/";
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);

  const fetchImg = async (
    newQuery: string,
    newPage: string | number
  ): Promise<void> => {
    if (!newQuery) return;

    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(
        `${URL}search/photos?query=${newQuery}&page=${newPage}&client_id=${KEY}`
      );
      // tyt
      const data = (await response.json()) as APIResponse;

      setImages((prevImages) => {
        const newImages = data.results.filter(
          (newImg) => !prevImages.some((img) => img.id === newImg.id)
        );

        return newPage === 1 ? newImages : [...prevImages, ...newImages];
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (newQuery: string): void => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    fetchImg(newQuery, 1);
  };

  const loadMore = (): void => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImg(query, nextPage);
  };

  const openModal = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />
      {isLoading && page === 1 ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {images.length > 0 && (
        <LoadMoreBtn isLoading={isLoading} loadMoreImages={loadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        imageUrl={selectedImage}
        onRequestClose={closeModal}
      />
    </>
  );
}

export default App;
