export const castMovieToCover = ({ movieData, type }) => ({
    id: movieData.id,
    title: type === 'movie' ? movieData.title : movieData.name,
    decimal_rating: movieData.vote_average,
    release_date: type === 'movie' ? movieData.release_date : movieData.first_air_date,
    poster_url: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`,
    item_type: type,
    short_desc: movieData.overview,
});

export const castMovieToDetailsPage = ({ movieData, type })  => {
    movieData.backdrop_path = `https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`;
    movieData.poster_path = `https://image.tmdb.org/t/p/w780/${movieData.poster_path}`;
    movieData.production_companies = movieData.production_companies.map((c) => {
        if (!c.logo_path) return c;

        c.logo_path = `https://image.tmdb.org/t/p/w185/${c.logo_path}`;
        return c;
    });
    movieData.isFuture = () => {
        return Date.parse(movieData.release_date ?? movieData.first_air_date) > Date.now();
    };

    try {
        let eventDate = (new Date(movieData.release_date ?? movieData.first_air_date))
            .toISOString()
            .replace(/ /g, '')
            .replace(/:/g, '')
            .replace(/-/g, '')
            .replace(/\./g, '');

        movieData.eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${movieData.title ?? movieData.name} - Vizyon Tarihi&dates=${eventDate}/${eventDate}&details=${movieData.homepage}&sf=true&output=xml`;
    } catch (e) {
        console.log(e)
    }

    if (type === 'tv') {
        movieData.seasons = movieData.seasons.filter(s => s.poster_path).map(s => {
            s.poster_path = `https://image.tmdb.org/t/p/w500/${s.poster_path}`;
            return s;
        });
    }

    return {
        release_date: movieData.release_date ?? movieData.first_air_date,
        title: movieData.title ?? movieData.name,
        isFuture: movieData.isFuture,
        production_companies: movieData.production_companies,
        tagline: movieData.tagline,
        overview: movieData.overview,
        status: movieData.status,
        backdrop_path: movieData.backdrop_path,
        homepage: movieData.homepage,
        id: movieData.id,
        item_type: type,
        poster_path: movieData.poster_path,
        imdb_id: movieData.imdb_id,
        genres: movieData.genres,
        vote_average: movieData.vote_average,
        runtime: movieData.runtime ?? movieData.episode_run_time[0],
        seasons: type === 'tv' ? movieData.seasons : null
    };
};

export const getUserFavMovies = async ({ userFavs, apiEndpoint, apiKey }) => {
    let movies = [];
    let tvs = [];

    for (const fav of userFavs) {
        const res = await fetch(`${apiEndpoint}/${fav.type}/${fav.item_id}?api_key=${apiKey}&language=tr-TR`)
            .then((res) => res.json());

        if (String(res?.id) !== String(fav.item_id)) continue;
        let data = {
            id: res.id,
            title: fav.type === 'movie' ? res.title : res.name,
            decimal_rating: res.vote_average,
            release_date: fav.type === 'movie' ? res.release_date : res.first_air_date,
            poster_url: `https://image.tmdb.org/t/p/w500/${res.poster_path}`,
            item_type: fav.type
        };

        if (fav.type === 'movie') {
            movies.push(data);
        } else {
            tvs.push(data);
        }
    }

    return [ ...movies, ...tvs ];
};