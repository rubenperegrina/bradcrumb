import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Child1Component } from './pages/child1/child1.component';
import { Child2Component } from './pages/child2/child2.component';

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    data: {
      breadCrum: "Home"
    },
    children: [
      {
        path: "child1",
        component: Child1Component,
        data: {
          breadCrum: "Child1"
        },
        children: [
          {
            path: "child2",
            component: Child2Component,
            data: {
              breadCrum: "Child2"
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
