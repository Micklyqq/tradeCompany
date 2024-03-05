import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {RoleService} from "../services/role.service";

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {

  private hasView = false;

  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef,
    private roleService:RoleService,
  ) { }

  @Input() set appHasRole(params:{roles:string[],officeId:number|null}){
    const hasRole = this.roleService.hasRole(params);

    if(hasRole && !this.hasView){
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
    else if(!hasRole && this.hasView){
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
