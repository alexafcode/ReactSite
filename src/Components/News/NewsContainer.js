import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../../store/news/actions";

class NewsContainer extends React.Component {
  render() {
    return <div />;
  }
  componentDidMount() {
    this.props.fetchData();
  }
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    news: state.NewsReducers.news,
    loading: state.NewsReducers.loading,
    error: state.NewsReducers.error,
    errorMessage: state.NewsReducers.errorMessage
  };
};

const mapDispatchToProps = {
  fetchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
