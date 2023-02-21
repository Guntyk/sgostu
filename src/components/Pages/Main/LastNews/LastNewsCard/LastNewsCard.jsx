import "./LastNewsCard.css";

export default function LastNewsCard({ newspaper }) {
  return (
    <div className="last-news-card">
      <div className="news-img-wrapper">
        <img className="news-img" src="https://via.placeholder.com/500.png/09f/fff" alt="" />
      </div>
      <span className="news-card-date">{newspaper.date}</span>
      <span className="news-card-title">{newspaper.title}</span>
      <p className="news-card-description">{newspaper.description}</p>
      <a href="#" className="news-link">
        Детальніше
      </a>
    </div>
  );
}
