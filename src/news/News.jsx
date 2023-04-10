import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      filteredArticles: [],
      searchQuery: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const apiKey = "c4377f542bee4e629a9343a0beb0f1b9";
    const apiUrl = `https://newsapi.org/v2/everything?q=trending&from=2023-04-09&to=2023-04-09&sortBy=popularity&apiKey=${apiKey}`;
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ articles: response.data.articles });
      })
      .catch((error) => console.error(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.articles !== this.state.articles) {
      const filtered = this.state.articles.filter((article) =>
        article.title
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase())
      );
      this.setState({ filteredArticles: filtered });
    }
  }

  handleInputChange(event) {
    const searchQuery = event.target.value;
    const filteredArticles = this.state.articles.filter((article) => {
      const title = article.title.toLowerCase();
      return title.indexOf(searchQuery.toLowerCase()) !== -1;
    });
    this.setState({ filteredArticles, searchQuery });
  }

  render() {
    return (
      <div className="container mt-3">
        <h1>Latest News</h1>
        <form>
          <div className="form-group">
            <input
              type="text"
              id="search-input"
              className="form-control"
              placeholder="Search..."
              value={this.state.searchQuery}
              onChange={this.handleInputChange}
            />
          </div>
        </form>
        <div className="row" id="news-container">
          {this.state.filteredArticles.map((article) => (
            <div className="col-md-4 flex mt-3" key={article.url}>
              <img
                className="w-100"
                src={article.urlToImage}
                alt={article.title}
              />
              <h5>{article.title}</h5>
              <p>{article.description}</p>
              <p>{article.author}</p>
              <a href={article.url} className="btn btn-primary">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
