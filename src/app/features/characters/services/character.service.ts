import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = 'https://rickandmortyapi.com/api/character';

  #state = signal<{
    data: Character[];
    loading: boolean;
    error: string | null;
  }>({
    data: [],
    loading: false,
    error: null,
  });

  characters = computed(() => this.#state().data);
  loading = computed(() => this.#state().loading);
  error = computed(() => this.#state().error);

  async getAllCharacters() {
    this.#state.update(s => ({ ...s, loading: true, error: null }));

    try {
      const response = await firstValueFrom(
        this._http.get<{ results: Character[] }>(this._apiUrl)
      );
      
      this.#state.update(s => ({ 
        ...s, 
        data: response.results, 
        loading: false 
      }));
    } catch (err) {
      this.#state.update(s => ({ 
        ...s, 
        loading: false, 
        error: 'Failed to fetch characters' 
      }));
    }
  }

  getCharacterById(id: string) {
    return this._http.get<Character>(`${this._apiUrl}/${id}`);
  }
}