import { Image } from "../App/App";

interface ImgOpnMdal{
  image: Image,
   openModal: (imageUrl: string)=> void,
   
}

const ImageCard: React.FC<ImgOpnMdal> = ({ image, openModal }) => {
  return (
    <div className="image-card" onClick={() => openModal(image.urls.full)}>
      <img src={image.urls.small} alt={image.alt_description || 'Image'} />
    </div>
  );
};

export default ImageCard;
