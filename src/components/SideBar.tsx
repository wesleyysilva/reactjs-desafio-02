import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SidebarProps {
  handle: (id: number) => void;
  genreId: number;
}

export function SideBar({ handle, genreId }: SidebarProps) {
  // Complete aqui

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handle(genre.id)}
            selected={genreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}