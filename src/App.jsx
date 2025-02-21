import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const KEY = "EDQlrnIEQ_NrkKvjtjVS0rM0jqjFEHM6C-Vg9Y-RbyU";
  const URL = "https://api.unsplash.com/";
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImg = async (newQuery, newPage) => {
    if (!newQuery) return;

    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(
        `${URL}search/photos?query=${newQuery}&page=${newPage}&client_id=${KEY}`
      );
      const data = await response.json();

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

  const handleSearchSubmit = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    fetchImg(newQuery, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImg(query, nextPage);
  };

  const openModal = (imageUrl) => {
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

      {images.length > 0 && <LoadMoreBtn isLoading={isLoading} loadMoreImages={loadMore} />}
      <ImageModal isOpen={modalIsOpen} imageUrl={selectedImage} onRequestClose={closeModal} />
    </>
  );
}

export default App;
