import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold mb-2" style="color: var(--text-primary);">
            Character Database
          </h1>
          <p class="text-sm" style="color: var(--text-secondary);">
            Browse through the multiverse
          </p>
        </div>
        <button 
          (click)="loadData()" 
          class="refresh-btn px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
          🔄 Refresh Data
        </button>
      </div>

      @if (service.loading()) {
        <div class="flex justify-center items-center h-64">
          <div class="portal-spinner"></div>
        </div>
      } @else if (service.error()) {
        <div class="error-box p-6 rounded-xl border-l-4">
          ⚠️ {{ service.error() }}
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (char of service.characters(); track char.id) {
            <div [routerLink]="['/character', char.id]" 
                 class="character-card group rounded-xl cursor-pointer overflow-hidden border transition-all duration-300">
              
              <div class="relative overflow-hidden">
                <img [src]="char.image" [alt]="char.name" 
                     class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span [class]="'status-badge absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full uppercase ' + 
                               (char.status === 'Alive' ? 'status-alive' : char.status === 'Dead' ? 'status-dead' : 'status-unknown')">
                  {{ char.status }}
                </span>
              </div>

              <div class="p-5">
                <h3 class="font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform duration-300" 
                    style="color: var(--text-primary);">
                  {{ char.name }}
                </h3>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded" style="background-color: var(--bg-dark); color: var(--text-secondary);">
                    ID: {{ char.id }}
                  </span>
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full text-center py-16 empty-state rounded-xl">
              <div class="text-6xl mb-4">🌌</div>
              <p style="color: var(--text-secondary);">No characters found. Click refresh to try again.</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .refresh-btn {
      background: linear-gradient(135deg, var(--portal-green), var(--portal-blue));
      color: var(--bg-space);
      border: none;
    }
    
    .refresh-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(68, 175, 105, 0.4);
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
    
    .error-box {
      background-color: rgba(255, 0, 110, 0.1);
      border-color: var(--toxic-pink);
      color: var(--text-primary);
    }
    
    .character-card {
      background-color: var(--bg-card);
      border-color: var(--border-default);
    }
    
    .character-card:hover {
      border-color: var(--portal-green);
      box-shadow: 0 10px 40px rgba(68, 175, 105, 0.2);
      transform: translateY(-4px);
    }
    
    .status-badge {
      backdrop-filter: blur(8px);
    }
    
    .status-alive {
      background-color: rgba(68, 175, 105, 0.9);
      color: var(--bg-space);
      box-shadow: 0 0 10px rgba(68, 175, 105, 0.5);
    }
    
    .status-dead {
      background-color: rgba(255, 0, 110, 0.9);
      color: white;
      box-shadow: 0 0 10px rgba(255, 0, 110, 0.5);
    }
    
    .status-unknown {
      background-color: rgba(167, 169, 190, 0.9);
      color: var(--bg-space);
    }
    
    .empty-state {
      background-color: var(--bg-card);
      border: 2px dashed var(--border-default);
    }
  `]
})
export class CharacterListComponent implements OnInit {
  protected readonly service = inject(CharacterService);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getAllCharacters();
  }
}
