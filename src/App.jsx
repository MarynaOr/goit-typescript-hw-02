import { useState } from "react";
import "./App.css";
// import { useEffect } from "react";
import SearchBar from "./component/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./component/ImageGallery/ImageGallery";
import Loader from "./component/Loader/Loader";
import LoadMoreBtn from "./component/LoadMoreBtn/LoadMoreBtn";
// import LoadMore from "./component/LoadMore/LoadMore";

function App() {
  const KEY = "EDQlrnIEQ_NrkKvjtjVS0rM0jqjFEHM6C-Vg9Y-RbyU";
  const URL = "https://api.unsplash.com/";
  const [query, setQuery] = useState("ukraine");

  const [images, setImages] = useState(() => {
    const savedImage = localStorage.getItem("images");

    if (!savedImage || savedImage === "undefined") {
      return [];
    }
    return JSON.parse(savedImage);
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchImg = async () => {
    try {
      const response = await fetch(
        `${URL}search/photos?query=${query}&client_id=${KEY}`
      );
      const data = await response.json();
      setImages(data.results);
      localStorage.setItem("images", JSON.stringify(data.results));
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   setIsLoading(true);

  //   fetchImg();
  // }, [query]);

  return (
    <>
      <SearchBar setQuery={setQuery} />
      <Toaster />
      {isLoading ? <Loader /> : <ImageGallery images={images} />}
      <LoadMoreBtn
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        loadMoreImages={fetchImg}
      />
    </>
  );
}

export default App;
