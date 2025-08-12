import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet,Footer,Sidebar],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css'
})
export class PublicLayout {

}
