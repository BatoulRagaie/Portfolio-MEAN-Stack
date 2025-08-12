import { Component, OnInit } from '@angular/core';
import { IProject } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit{

  project!: IProject;
  projects!: IProject[];
  groupedProjects: { category: string; projects: IProject[] }[] = [];
  selectedCategory: string = 'All';
  


  constructor(private _projectS: ProjectsService, private router:Router) { }

  ngOnInit(): void {

    this._projectS.getProjects().subscribe(data => {
      this.projects = data;
      this.groupProjectsByCategory();
    });
    
  }
  
  groupProjectsByCategory() : void {
      const groups: { [key: string]: IProject[] } = {};
  
      this.projects.forEach(project => {
        if (!groups[project.category]) {
          groups[project.category] = [];
        }
        groups[project.category].push(project);
      });
  
      this.groupedProjects = Object.keys(groups).map(cat => ({
        category: cat,
        projects: groups[cat]
      }));
    }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  filteredProjects(): IProject[] {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  goToProject(link: string): void {
    this.router.navigate(['/project', link]);
  }

  getImage(image:string): string|null{
    return this._projectS.getImageUrl(image);
  }
}
