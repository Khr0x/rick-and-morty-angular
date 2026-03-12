import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen" style="background-color: var(--bg-space);">
      <!-- Header -->
      <header class="border-b sticky top-0 z-50 backdrop-blur-sm" 
              style="background-color: rgba(26, 26, 46, 0.95); border-color: var(--border-default);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Logo / Title -->
            <div class="flex items-center space-x-3">
              <div class="text-2xl font-bold">
                <span style="color: var(--portal-green);">Rick</span>
                <span style="color: var(--text-primary);"> & </span>
                <span style="color: var(--morty-yellow);">Morty</span>
              </div>
              <div class="h-6 w-px" style="background-color: var(--border-default);"></div>
              <span class="text-sm font-medium" style="color: var(--text-secondary);">
                Character Explorer
              </span>
            </div>

            <!-- User Info -->
            <div class="flex items-center space-x-3">
              <span class="text-sm" style="color: var(--text-secondary);">
                Dimension C-137
              </span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                   style="background: linear-gradient(135deg, var(--portal-green), var(--portal-blue));">
                🔬
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .nav-link {
      color: var(--text-secondary);
    }
    
    .nav-link:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }
    
    .nav-link.active-link {
      background-color: var(--bg-card);
      color: var(--portal-green);
      box-shadow: 0 0 20px rgba(68, 175, 105, 0.3);
    }
  `]
})
export class MainLayoutComponent {}
