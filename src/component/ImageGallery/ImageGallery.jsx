import ImageCard from "./ImageCard";

const ImageGallery = ({ images }) => {
  const uniqueImages = images.filter(
    (image, index, self) => index === self.findIndex((img) => img.id === image.id)
  );

  return (
    <>
      <ul>
        {uniqueImages.map((image) => (
          <li key={image.id}>
            <ImageCard image={image} />
          </li>
        ))}

      </ul>
    </>
  );
};

export default ImageGallery;
