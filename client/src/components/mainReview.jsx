/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import stars from './styleSheet.css';


// ---------------------- Styling ------------------------------------
const StarSpan = styled.span`
  float: right;
  padding-left: 10px;
  padding-right: 10px;
`;
// ------------------------------------ COMPONENT -------------------------------

class MainReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let accuracy = 0;
    let communication = 0;
    let cleanliness = 0;
    let checkIn = 0;
    let location = 0;
    let value = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.props.ratings.length; i++) {
      const review = this.props.ratings[i];
      accuracy += review.accuracy;
      communication += review.communication;
      cleanliness += review.cleanliness;
      checkIn += review.check_in;
      location += review.location;
      value += review.value;
    }
    const allReviews = ((accuracy
      + communication
      + cleanliness
      + checkIn
      + location
      + value) / (this.props.ratings.length * 6)) * 20;
    return (
      <StarSpan>
        <div className={stars.starRating} title="70%">
          <div className={stars.backStars}>
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />

            <div className={stars.frontStars} style={{ width: `${allReviews}%` }}>
              <i className="fas fa-star" aria-hidden="true" />
              <i className="fas fa-star" aria-hidden="true" />
              <i className="fas fa-star" aria-hidden="true" />
              <i className="fas fa-star" aria-hidden="true" />
              <i className="fas fa-star" aria-hidden="true" />
            </div>
          </div>
        </div>
      </StarSpan>
    );
  }
}
export default MainReviewStars;
