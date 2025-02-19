import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./component/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./component/ImageGallery/ImageGallery";
import Loader from "./component/Loader/Loader";
import LoadMoreBtn from "./component/LoadMoreBtn/LoadMoreBtn";

function App() {
  const KEY = "EDQlrnIEQ_NrkKvjtjVS0rM0jqjFEHM6C-Vg9Y-RbyU";
  const URL = "https://api.unsplash.com/";
  const [query, setQuery] = useState("Kharkiv");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(() => {
    const savedImage = localStorage.getItem("images");
    return savedImage ? JSON.parse(savedImage) : [];
  });
  const [isLoading, setIsLoading] = useState(false);


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

  return (
    <>
      <SearchBar setQuery={setQuery} />
      <Toaster />
      {isLoading && page === 1 ? <Loader /> : <ImageGallery images={images} />}
      {images.length > 0 && (
        <LoadMoreBtn isLoading={isLoading} loadMoreImages={loadMore} />
      )}
    </>
  );
}

export default App;
