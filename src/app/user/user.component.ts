import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../service/user.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import { User } from '../model/User';
import { UpdateUserDto } from '../model/UpdateUserDto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public formUsername!: FormGroup;
  public formPassword!: FormGroup;
  isSuccess: boolean = false;
  hide = true;
  user!: User;
  updateUserDto!: UpdateUserDto;

  ngOnInit(): void {
    this.getUser();
    this.formUsername = new FormGroup({ username: new FormControl("")});
    this.formPassword = new FormGroup({
      password: new FormControl(""),
      confirmPassword: new FormControl("", {
      validators: [this.controlConfirmPassword()]
      })
    });
  }


  //Méthodes
  private controlConfirmPassword(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      let passWordToCheck = '';
      if(this.formPassword != undefined) {
        passWordToCheck = this.formPassword?.get('password')?.value;
      }
      let confirmPassword = control.value;
      return passWordToCheck === confirmPassword ? null : {notSame: true};
    }
  }

  public updateUser() {
    this.updateUserDto = {
      id: this.user.id, 
      username: this.formUsername.value.username, 
      password: this.formPassword.value.password
    };
    console.log(this.updateUserDto);

    this.userService.updateUser(this.updateUserDto).subscribe({
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => {
          this.isSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        }
      }
    );
  }

  public getUser(): void {
    this.userService.getCurrentUser().subscribe(
      {
        next: (response: User) => {
          this.user = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error);
        }
      }
    )
  }
}
