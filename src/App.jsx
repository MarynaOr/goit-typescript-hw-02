import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const KEY = "EDQlrnIEQ_NrkKvjtjVS0rM0jqjFEHM6C-Vg9Y-RbyU";
  const URL = "https://api.unsplash.com/";
  const [query, setQuery] = useState("Kharkiv");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [images, setImages] = useState(() => {
    const savedImage = localStorage.getItem("images");
    return savedImage ? JSON.parse(savedImage) : [];
  });

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${URL}search/photos?query=${query}&page=${page}&client_id=${KEY}`
        );
        const data = await response.json();

        setImages((prevImages) => [...prevImages, ...data.results]);
        localStorage.setItem(
          "images",
          JSON.stringify([...images, ...data.results])
        );
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImg();
  }, [query, page]);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <SearchBar setQuery={setQuery} />
      <Toaster />
      {isLoading && page === 1 ? (
        <Loader />
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
