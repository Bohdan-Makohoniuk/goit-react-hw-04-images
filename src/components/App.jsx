import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar'



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

handleSubmit = query => {
    this.setState({ query, page: 1 });
};
  
  
  handleLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  
// метод відображення модального вікна
  // toggleMpdal = () => {
  //   this.setState(({showModal}) => ({
  //     showModal: !showModal
  //   }))
  // }
  
  render() {
    


    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {/* {this.state.isLoading && <Loader />} */}
        {/* {showModal&&<Modal/>} */}
    </div>  
    )
  };
};
