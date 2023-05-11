import { NgModule } from "@angular/core";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryComponent } from "./category.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";

@NgModule({
    declarations: [
        CategoryComponent,
        CategoryCreateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'categories/create', component: CategoryCreateComponent, canActivate: [AuthGuard] },
        ])
    ],
    exports: [
        CategoryComponent,
        CategoryCreateComponent,
    ]
})
export class CategoriesModule { }