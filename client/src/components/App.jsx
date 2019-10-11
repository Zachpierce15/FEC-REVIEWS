/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewList from './MapOverData.jsx';
import ReviewStars from './ReviewStars.jsx';
import Pagination from './pagination.jsx';
import SearchBar from './SearchBar.jsx';
import stars from './styleSheet.css';
import MainReviewStars from './mainReview.jsx';

// ------------------------- STYLED COMPONENTS -------------------------
const ReviewsBack = styled.button`
  color: var(--color-text-link, #008489) !important;
  font-family: var(--font-font_family, Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif) !important;
  text-decoration-line: var(--font-link-text-decoration-line, none) !important;
  background: transparent !important;
  border: 0px !important;
  cursor: pointer !important;
  margin: 0px !important;
  padding: 0px !important;
  float: right;
  font-size: initial;
  line-height: 0px;
`;

const MainDiv = styled.div`
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    font-size: 16px;
    line-height: 1.43;
    color: #484848;
    background-color: #fff;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    max-width: 696px;
    padding-left: 30px
`;

const AfterSearch = styled.div`
      margin-top: 16px;
    margin-bottom: 16px;
`;

const LineAfter = styled.div`
    border-bottom: solid;
    border-bottom-width: var(--border-rule-border-width, 1px) !important;
    border-bottom-color: var(--color-divider, #EBEBEB) !important;
`;

const AllReviewsDiv = styled.div`
    width: 30% !important;
    float: left !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
    min-height: 1px !important;
    position: relative !important;
    display: contents;
`;


const AllReviewsSpan = styled.span`
      margin: 0px !important;
    word-wrap: break-word !important;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    font-size: 24px !important;
    font-weight: 800 !important;
    line-height: 12px;
    padding-left: 20px;
    padding-right: 211px;
    color: #484848 !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    display: inline-flex;
`;

const StarSpan = styled.span`
  padding-left: 20px;
  padding-right: 211px;
  display: inline-flex;
  line-height: 1.25em !important;

`;

const FormPicDiv = styled.div`
  border: solid;
  border-radius: 5px;
  border-width: thin;
  display: inline-box;
`;
// ------------------------ COMPONENT ----------------------------------

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewsData: [],
      pages: [],
      displayedReviews: [],
      pageNumber: 0,
      searched: false,
      searchReviews: [],
      startData: [],
      startChunks: [],
      query: '',
    };
    this.changePage = this.changePage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    axios.get(`/reviews?randomListing=${Math.floor(Math.random() * 100) + 1}`)
      .then((data) => {
        const groupedData = [];
        for (let i = 0; i < data.data.length; i += 5) {
          const myChunk = data.data.slice(i, i + 5);
          groupedData.push(myChunk);
        }
        this.setState({
          reviewsData: data.data,
          pages: groupedData,
          displayedReviews: groupedData[0],
          pageNumber: 0,
        });
      })
      .catch((err) => {
        console.log('THIS IS AN ERROR', err);
      });
  }
  // ------------------------ Search functions ------------------------

  onSearchHandler(chunksArray, filteredData, oldData, oldChunks, searchWord) {
    if (filteredData.length === 0) {
      this.setState({
        pages: chunksArray,
        displayedReviews: [],
        pageNumber: 0,
        searched: true,
        searchReviews: filteredData,
        startData: oldData,
        startChunks: oldChunks,
        query: searchWord,
      });
    } else {
      this.setState({
        pages: chunksArray,
        displayedReviews: chunksArray[0],
        pageNumber: 0,
        searched: true,
        searchReviews: filteredData,
        startData: oldData,
        startChunks: oldChunks,
        query: searchWord,
      });
    }
  }

  onClickHandler(e) {
    e.preventDefault();
    const startingChunks = this.state.startChunks;
    this.setState({
      pages: startingChunks,
      displayedReviews: startingChunks[0],
      pageNumber: 0,
      searchReviews: [],
      searched: false,
    });
  }
  // ------------------------ Pagination Functions --------------------------

  changePage(page) {
    const currentPages = this.state.pages;
    const newPage = page - 1;
    this.setState({
      displayedReviews: currentPages[newPage],
      pageNumber: newPage,
    });
  }

  goBack() {
    let currentPage = this.state.pageNumber;
    currentPage -= 1;
    this.setState({
      displayedReviews: this.state.pages[currentPage],
      pageNumber: currentPage,
    });
  }

  goForward() {
    let currentPage = this.state.pageNumber;
    currentPage += 1;
    this.setState({
      displayedReviews: this.state.pages[currentPage],
      pageNumber: currentPage,
    });
  }
  // ----------------------- Render function -------------------------

  render() {
    if (this.state.searched === false) {
      return (
        <MainDiv>
          <div style={{ marginBottom: '12px' }}>
            <AllReviewsDiv>
              <AllReviewsSpan>
                {this.state.reviewsData.length}
                {' '}
                  Reviews
                <MainReviewStars ratings={this.state.reviewsData} />
              </AllReviewsSpan>
            </AllReviewsDiv>
            <FormPicDiv>
              <SearchBar
                search={this.onSearchHandler}
                reviews={this.state.reviewsData}
                pages={this.state.pages}
                state={this.state}
              />
            </FormPicDiv>
          </div>

          <AfterSearch>
            <LineAfter />
          </AfterSearch>

          <ReviewStars style={{ borderBottom: 'solid' }} ratings={this.state.reviewsData} />

          <div>
            <ReviewList
              reviews={this.state.displayedReviews}
              searched={this.state.searched}
              query={this.state.query}
            />
          </div>

          <nav>
            <Pagination
              pages={this.state.pages}
              changePage={this.changePage}
              goBack={this.goBack}
              goForward={this.goForward}
              page={this.state.pageNumber}
            />
          </nav>

        </MainDiv>
      );
    }
    if (this.state.searched && this.state.displayedReviews.length > 0) {
      return (
        <MainDiv>

          <div>
            <AllReviewsDiv>
              <AllReviewsSpan>
                {this.state.reviewsData.length}
                {' '}
                    Reviews
                <MainReviewStars ratings={this.state.reviewsData} />
              </AllReviewsSpan>
            </AllReviewsDiv>
            <FormPicDiv>
              <SearchBar
                search={this.onSearchHandler}
                reviews={this.state.reviewsData}
                pages={this.state.pages}
                state={this.state}
              />
            </FormPicDiv>
          </div>

          <AfterSearch>
            <LineAfter />
          </AfterSearch>

          <div>
            {this.state.searchReviews.length}
            {' '}
            guests have mentioned
            {' "'}
            <span style={{ fontWeight: 'bold' }}>
              {this.state.query}
            </span>
            {'"'}
          </div>

          <div>
            <span>
              <ReviewsBack
                type="button"
                onClick={e => this.onClickHandler(e)}
              >
                Back to all reviews
              </ReviewsBack>
            </span>
          </div>

          <AfterSearch>
            <LineAfter />
          </AfterSearch>

          <div>
            <ReviewList
              reviews={this.state.displayedReviews}
              searched={this.state.searched}
              query={this.state.query}
            />
          </div>
          <nav>
            <Pagination
              pages={this.state.pages}
              changePage={this.changePage}
              goBack={this.goBack}
              goForward={this.goForward}
              page={this.state.pageNumber}
            />
          </nav>

        </MainDiv>
      );
    }
    return (
      <MainDiv>
        <div style={{ marginBottom: '12px' }}>
          <AllReviewsDiv>
            <AllReviewsSpan>
              {this.state.reviewsData.length}
              {' '}
                Reviews
              <MainReviewStars ratings={this.state.reviewsData} />
            </AllReviewsSpan>
          </AllReviewsDiv>
          <FormPicDiv>
            <SearchBar
              search={this.onSearchHandler}
              reviews={this.state.reviewsData}
              pages={this.state.pages}
              state={this.state}
            />
          </FormPicDiv>
        </div>

        <AfterSearch>
          <LineAfter />
        </AfterSearch>

        <div>
            None of our guests have mentioned
          {' "'}
          <span style={{ fontWeight: 'bold' }}>
            {this.state.query}
          </span>
          {'"'}
        </div>

        <div>
          <span>
            <ReviewsBack
              type="button"
              onClick={e => this.onClickHandler(e)}
            >
                Back to all reviews
            </ReviewsBack>
          </span>
        </div>
      </MainDiv>
    );
  }
}
export default App;
