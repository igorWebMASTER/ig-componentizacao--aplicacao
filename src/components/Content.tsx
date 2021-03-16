import { api } from '../services/api';
import { MovieCard } from '../components/MovieCard';
import {useState, useEffect} from 'react'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface propsContent{
  onSelectedGenreId:number;
}

export function Content({onSelectedGenreId} : propsContent) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  // useEffect(() => {
  //   api.get<GenreResponseProps[]>('genres').then(response => {
  //     setGenres(response.data);
  //   });
  // }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${onSelectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [onSelectedGenreId]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${onSelectedGenreId}`).then(response => {
      setMovies(response.data);
    });
    
    
  }, [onSelectedGenreId])

  return(
    <>
    <header>
    <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
  </header>

  <main>
    <div className="movies-list">
      {movies.map(movie => (
        <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
      ))}
    </div>
  </main>
  </>
  )
}