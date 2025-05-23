import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, imageUrl, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={s.Modal}
      overlayClassName={s.Overlay}
    >
      <img src={imageUrl} alt="Large view" className={s.modalImage} />
    </Modal>
  );
};

export default ImageModal;
