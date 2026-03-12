import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService, Character } from '../../services/character.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-4xl mx-auto">
      <button routerLink="/" class="back-btn mb-8 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 font-medium">
        ← Volver a la lista
      </button>

      @if (loading()) {
        <div class="flex justify-center p-20">
          <div class="portal-spinner"></div>
        </div>
      } @else if (character(); as char) {
        <div class="detail-card rounded-2xl shadow-2xl overflow-hidden border">
          <!-- Header con imagen destacada -->
          <div class="relative overflow-hidden bg-black">
            <div class="flex flex-col md:flex-row">
              <!-- Imagen del personaje - Más grande y visible -->
              <div class="md:w-2/5 relative">
                <div class="aspect-square md:aspect-auto md:h-[600px]">
                  <img [src]="char.image" [alt]="char.name" 
                       class="w-full h-full object-cover object-center image-glow">
                </div>
              </div>
              
              <!-- Información sobre la imagen -->
              <div class="flex-1 p-8 md:p-12 flex flex-col justify-between" style="background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-dark) 100%);">
                <div>
                  <h1 class="text-5xl md:text-6xl font-bold mb-4" style="color: var(--text-primary);">
                    {{ char.name }}
                  </h1>
                  <div class="flex flex-wrap items-center gap-3 mb-8">
                    <span [class]="'status-badge px-4 py-2 text-base font-bold rounded-full ' + 
                                   (char.status === 'Alive' ? 'status-alive' : char.status === 'Dead' ? 'status-dead' : 'status-unknown')">
                      {{ char.status }}
                    </span>
                    <span class="text-lg" style="color: var(--text-secondary);">{{ char.species }}</span>
                  </div>

                  <!-- Grid de información básica -->
                  <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="info-card-inline p-4 rounded-xl border">
                      <p class="text-xs uppercase font-semibold mb-1" style="color: var(--text-muted);">🧬 Especie</p>
                      <p class="text-base font-bold" style="color: var(--text-primary);">{{ char.species }}</p>
                    </div>
                    <div class="info-card-inline p-4 rounded-xl border">
                      <p class="text-xs uppercase font-semibold mb-1" style="color: var(--text-muted);">⚧ Género</p>
                      <p class="text-base font-bold" style="color: var(--text-primary);">{{ char.gender }}</p>
                    </div>
                  </div>

                  <!-- Ubicaciones compactas -->
                  <div class="space-y-3">
                    <div class="flex items-center gap-3 p-3 rounded-lg" style="background-color: var(--bg-space);">
                      <span class="text-2xl">🌍</span>
                      <div>
                        <p class="text-xs" style="color: var(--text-muted);">Origen</p>
                        <p class="font-semibold" style="color: var(--portal-green);">{{ char.origin.name }}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-lg" style="background-color: var(--bg-space);">
                      <span class="text-2xl">📍</span>
                      <div>
                        <p class="text-xs" style="color: var(--text-muted);">Ubicación</p>
                        <p class="font-semibold" style="color: var(--rick-blue);">{{ char.location.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-6 mt-6 border-t" style="border-color: var(--border-default);">
                  <div class="text-right">
                    <p class="text-xs uppercase font-semibold mb-1" style="color: var(--text-muted);">Character ID</p>
                    <p class="text-3xl font-bold" style="color: var(--portal-green);">#{{ char.id }}</p>
                  </div>
                  <div class="episode-badge">
                    <p class="text-3xl font-bold" style="color: var(--morty-yellow);">{{ char.episode.length }}</p>
                    <p class="text-xs" style="color: var(--text-muted);">Episodios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenido adicional -->
          <div class="p-8">
            <!-- Información detallada adicional -->
            <div class="info-card p-6 rounded-xl border mb-6">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-2xl">🧪</span>
                <h3 class="text-lg font-bold" style="color: var(--text-primary);">Tipo</h3>
              </div>
              <p class="text-base" style="color: var(--text-secondary);">
                {{ char.type || 'No hay información de tipo específico para este personaje.' }}
              </p>
            </div>

            <!-- Footer info -->
            <div class="pt-6 border-t" style="border-color: var(--border-default);">
              <div class="flex items-center justify-between text-xs" style="color: var(--text-muted);">
                <p>🕐 Creado: {{ formatDate(char.created) }}</p>
                <p>🌐 API ID: {{ char.id }}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .back-btn {
      background-color: var(--bg-card);
      color: var(--text-primary);
      border: 1px solid var(--border-default);
    }
    
    .back-btn:hover {
      background-color: var(--bg-hover);
      border-color: var(--portal-green);
      transform: translateX(-4px);
      box-shadow: 0 4px 12px rgba(68, 175, 105, 0.3);
    }
    
    .portal-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid var(--bg-card);
      border-top-color: var(--portal-green);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .detail-card {
      background-color: var(--bg-card);
      border-color: var(--border-default);
    }
    
    /* Imagen con efecto glow */
    .image-glow {
      transition: transform 0.5s ease;
    }
    
    .image-glow:hover {
      transform: scale(1.05);
    }
    
    /* Cards de información inline */
    .info-card-inline {
      background-color: rgba(26, 26, 46, 0.6);
      border-color: var(--border-default);
      transition: all 0.3s;
    }
    
    .info-card-inline:hover {
      border-color: var(--portal-green);
      box-shadow: 0 0 20px rgba(68, 175, 105, 0.15);
    }
    
    .info-card {
      background-color: var(--bg-dark);
      border-color: var(--border-default);
      transition: all 0.3s;
    }
    
    .info-card:hover {
      border-color: var(--portal-green);
      box-shadow: 0 0 20px rgba(68, 175, 105, 0.2);
    }
    
    /* Status badges */
    .status-badge {
      backdrop-filter: blur(8px);
      text-transform: uppercase;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .status-alive {
      background-color: rgba(68, 175, 105, 0.95);
      color: var(--bg-space);
      box-shadow: 0 0 20px rgba(68, 175, 105, 0.8);
    }
    
    .status-dead {
      background-color: rgba(255, 0, 110, 0.95);
      color: white;
      box-shadow: 0 0 20px rgba(255, 0, 110, 0.8);
    }
    
    .status-unknown {
      background-color: rgba(167, 169, 190, 0.95);
      color: var(--bg-space);
    }
    
    /* Episode badge */
    .episode-badge {
      text-align: center;
      padding: 0.75rem 1.5rem;
      background-color: var(--bg-space);
      border-radius: 12px;
      border: 2px solid var(--morty-yellow);
    }
  `]
})

export class CharacterDetailComponent {
  private readonly service = inject(CharacterService);
  id = input.required<string>(); 
  loading = signal(false);

  character = toSignal(
    toObservable(this.id).pipe(
      tap(() => this.loading.set(true)),
      switchMap((id) => 
        this.service.getCharacterById(id).pipe(
          catchError((err) => {
            console.error(err);
            this.loading.set(false);
            return EMPTY; 
          })
        )
      ),
      tap(() => this.loading.set(false))
    )
  );

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
