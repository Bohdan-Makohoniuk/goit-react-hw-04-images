import React, { useState } from 'react';
import { fetchImages } from './api/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

// Бібліотека для сповіщень
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
      if (!query) {
        return;
      }
        setIsLoading(true);
        fetchImages(query, page)
        .then(data => {
            setImages(totalHits => (page === 1 ? [...data.totalHits] : [...images, ...data.totalHits]));
            setTotalHits(totalHits => (page === 1 ? totalHits - data.totalHits.length : totalHits - [...data.totalHits].length));
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [query, page,images]);



  const handleSubmit = query => {
    setQuery('');
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const toggleModalimg = () => {
    setShowModal(!showModal);
  };

  const toggleModal = ({ modalImage }) => {
    setModalImage({ ...modalImage });
    toggleModalimg();
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={toggleModal} />

      {showBtn && <LoadMore onLoadMore={handleLoadMore} />}

      {showModal && <Modal modalImage={modalImage} closeModal={toggleModal} />}
      <ToastContainer autoClose={1000} />
    </>
  );
}

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoading: false,
//     modalImage: '',
//     showModal: false,
//     totalHits: 0,
//     showBtn:false,
//   };

  // componentDidUpdate = (_, prevState) => {
  //   if (
  //     this.state.query !== prevState.query ||
  //     this.state.page !== prevState.page
  //   ) {
  //     this.setState({ isLoading: true });
  //     fetchImages(this.state.query, this.state.page)
  //       .then(data => {
  //         this.setState(prevState => ({

  //           images: [...prevState.images, ...data.hits],
  //           showBtn: this.state.page < Math.ceil(data.totalHits / 12),
  //         }));
  //       })
  //       .finally(() => {
  //         this.setState({ isLoading: false });
  //       });
  //   }
  // };

// handleSubmit = query => {
//   this.setState({ query, page: 1, images: [] });
// };

// handleLoadMore = () => {
//   this.setState(state => ({ page: state.page + 1 }));
// };

// toggleModal = modalImage => {
//   if (!modalImage) {
//     this.setState({ modalImage: '', showModal: false });
//     return;
//   }
//   this.setState({ modalImage, showModal: true });
// };

//   render() {
// return (
//   <>
//     <Searchbar onSubmit={this.handleSubmit} />
//     {this.state.isLoading && <Loader />}
//     <ImageGallery images={this.state.images} openModal={this.toggleModal} />

//     {this.state.showBtn && <LoadMore onLoadMore={this.handleLoadMore} />}

//     {this.state.showModal && (
//       <Modal
        // modalImage={this.state.modalImage}
//         closeModal={this.toggleModal}
//       />
//     )}
//     <ToastContainer autoClose={1000} />
//   </>
// );
//   }
// }
