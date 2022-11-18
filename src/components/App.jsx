import { Component } from 'react';
import { fetchImages } from './api/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

// Бібліотека для сповіщень
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    modalImage: '',
    showModal: false,
    totalHits: 0,
    
  };


  componentDidUpdate = (_, prevState) => {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    )
    {
      this.setState({ isLoading: true });
      fetchImages(this.state.query, this.state.page)
        .then(data => {
          this.setState(prevState => ({
            images:
                [...prevState.images, ...data.hits],
            showModal: this.page < Math.ceil(data.totalHits/12),
             
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, images:[] });
  };

  handleLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = modalImage => {
    if (!modalImage) {
      this.setState({ modalImage: '', showModal: false });
      return;
    }
    this.setState({ modalImage, showModal: true });
  };
  

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery images={this.state.images} openModal={this.toggleModal} />
          
          <LoadMore onLoadMore={this.handleLoadMore} />
      
        {this.state.showModal && (
          <Modal
            modalImage={this.state.modalImage}
            closeModal={this.toggleModal} 
          />
        )}
        <ToastContainer autoClose={1000}/>
      </>
    );
  }
}
