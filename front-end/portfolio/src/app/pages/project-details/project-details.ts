import { Component, OnInit } from '@angular/core';
import { IProject } from '../../models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [DatePipe,CommonModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css'
})
export class ProjectDetails implements OnInit {

  project: IProject | null = null;
  image: string | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private _projectS: ProjectsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const link = params.get('link');
      if (link) {
        this.loadProjectByLink(link);
      }
    });
  }

  loadProjectByLink(link: string) {
    this.loading = true;
    this._projectS.getProjectByLink(link).subscribe({
      next: (proj) => {
        this.project = proj;
        this.image = this._projectS.getImageUrl(this.project.image);
        this.loading = false;

      },
      error: (err) => {
        this.errorMessage = 'Project not found or error loading project.';
        this.loading = false;
      }
    });
  }

}
