import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  constructor(public loader: LoadingService) {}
}
