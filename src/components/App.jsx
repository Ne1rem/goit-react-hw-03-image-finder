import React, { Component } from "react";
import { SearchBar } from "./SearchParts/SearchBar";
import { ImageGallery } from "./SearchParts/ImageGallery";
import { findQuery } from "./SearchParts/API";
import { InfinitySpin } from 'react-loader-spinner';

export class App extends Component {
  state = {
    query: "",
    images: [],
    loading: false,
    page: 1,
  };
  changeQuery = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
    })
  }
  async componentDidMount() {
    const savedImages = localStorage.getItem('savedImages');
    if (savedImages !== null) {
      this.setState({ images: JSON.parse(savedImages) }); 
    }
    
    this.setState({ loading: true }); 
    const newQuery = this.state.query;
    const page = this.state.page;

    const response = await findQuery(newQuery, page);
    const images = response.data.hits;

    this.setState({
      images,
      loading: false,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      localStorage.setItem('query-search', JSON.stringify(this.state.query));
      localStorage.setItem('page-query', JSON.stringify(this.state.page));
      const newQuery = this.state.query;
      const page = this.state.page;
      this.setState({ loading: true }); 
      const response = await findQuery(newQuery, page);
      const images = response.data.hits;

      this.setState({
        images: images,
        loading: false,
      });
    }
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading } = this.state; 
    return (
      <div>
        <SearchBar searchItems={this.changeQuery} />
        {loading ? (
          <InfinitySpin 
          width='200'
          color="#4fa94d"
        />
        ) : (
          <ImageGallery images={this.state.images} loadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
