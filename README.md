
## Creare serviciu Angular with mock data



---


1. ## Cream un serviciu de date pentru furnizarea Proiectelor

> Interfata:

```ts
// projects/project.ts

export interface IProject {
    id: number,
    code: string,
    name: string,
    description: string,
    owner_id: number,
    owner_name: string,
    category_id: number,
    created_date: string,
    end_date: string
}

```

```ts
// projects/project.service.ts:

import { Injectable } from '@angular/core';
import { IProject } from './project';

@Injectable() 
export class ProjectService {
  getProjects(): IProject[] {
    return []
  }
}

```


## 2. Importam datele din db.json

> configuram typescriptul pentru a putea importa fisierele json ca modul

```json
// tsconfig.json
  
  "compilerOptions": {
    ...
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
    // "esModuleInterop": true  // include resolveJsonModule
  },
  ...

```


- inchidem fisierele si dam un restart la proiect;

- daca deja am importat module .json, atunci e posibil ca din cauza cashingului, IDE-ul inca sa afiseze warning
  - stergem linia de jos si o scriem din nou:
  - `import * as db from '../../db.json' `

- solutie pentru versiunile vechi de angular/typescript
```ts
// src/typings.d.ts

// declare module "*.json" {
//     const value: any;
//     export default value;
// }

```


> actualizam serviciul 

```ts
// projects/project.service.ts:

...
import db from '../../db.json'       // +

@Injectable()
export class ProjectService {
    projects: IProject[] = [];

    constructor(){
        this.projects = db['projects'];   // ~ (modificat) 
    }

    getProjects(): IProject[] {
        return this.projects
    }
}

```


## 3. Inregistram un provider pentru acest serviciu 

- Il vom face disponibil in toata aplicatia, inregistrandu-l in modul
[sau folosiim providedIn: rooter in @Injectable]
`@Injectable({ providedIn: 'root' })`

```ts
// app.module.ts:

import { ProjectService } from "projects/project.service";

...
@NgModule({
    ...
    providers: [ ProjectService ],
})
export class AppModule { }

```


---
## 4. Utilizam serviciul in componenta _app_

```ts
// app.component.ts

import { ..., OnInit } from '@angular/core';                    // ~
import { ProjectService } from './projects/project.service';    // +
import { IProject } from './projects/project';                  // +

...
export class AppComponent implements OnInit {
  ...
  projects: IProject[] = [];                                     // +

  constructor( private _projectService: ProjectService ){}       // +

ngOnInit(){                                                      // +
    this.projects = this._projectService.getProjects();
    console.log('App init::projects: ', this.projects);
  }
}

```


---
## 5. Actualizam view-ul componentei _app_

[snippet: project-list.html.md]

```html
<!-- app.component.html -->

  <main className="container pt-3">
      <div className="row justify-content-center">
          <h1 class="bg-primary p-3 text-center text-white"> {{ title }} </h1>
      </div>
      <div class="row justify-content-center text-white">
        <div class="col-8 m-1">
            <div *ngFor="let project of projects" 
              class="card card-inverse card-outline-default m-2"
              style="background-color: #555; border-color: #555;">
                <h4 class="card-header">
                    {{project.name}}
                    <span class="float-right badge badge-default">
                        {{project.code}}
                    </span>
                </h4>
                <div class="card-text p-2">{{project.description}}</div>
            </div>
        </div>
      </div>
  </main>

```

- daca nu afiseaza lista, e posibil sa fie nevoie de un restart 

- am pus si linia `console.log('ProjectService init: ', db);` in `project.service.ts`


