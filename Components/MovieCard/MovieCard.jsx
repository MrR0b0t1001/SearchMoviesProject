import PropTypes from "prop-types";

const MoviesByCategory = ({
  movie: { id, original_title, release_date, poster_path },
}) => {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/400";

  return (
    <div className="movie" key={id}>
      <div>
        <p>{release_date}</p>
      </div>

      <div>
        <img src={posterUrl} alt={original_title} />
      </div>

      <div>
        <h3>{original_title}</h3>
      </div>
    </div>
  );
};

MoviesByCategory.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired, // Change to number
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    original_title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MoviesByCategory;
