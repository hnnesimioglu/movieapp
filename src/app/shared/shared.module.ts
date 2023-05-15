import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading/loading.component";
import { AlertComponent } from "./alert/alert.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        LoadingComponent,
        AlertComponent
    ], imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        LoadingComponent,
        AlertComponent
    ]
})
export class SharedModule { }