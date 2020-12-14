import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course.component';
import { Step1Component } from './create-course/step1/step1.component';
import { Step2Component } from './create-course/step2/step2.component';
import { Step3Component } from './create-course/step3/step3.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'create-course', component: CreateCourseComponent , children:
  [
    { path: '', component: Step1Component },
    { path: 'step-2', component: Step2Component },
    { path: 'step-3', component: Step3Component },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
