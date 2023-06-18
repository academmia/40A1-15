import { Component, OnInit } from '@angular/core';
import { IProject } from './projects/project';
import { ProjectService } from './projects/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'starter-one';
  projects: IProject[] = [];

  constructor( private _projectService: ProjectService ){}

  ngOnInit(){                                                      
      this.projects = this._projectService.getProjects();
      console.log('App init::projects: ', this.projects);
    }

}
