import { Component, OnDestroy, OnInit } from '@angular/core';
import {Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ILogin } from 'src/app/components/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  //Declaracion de variables
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  hide = true;

  getErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl!.hasError('required')) {
      return 'Ingrese el correo electronico';
    }

    return emailControl!.hasError('email')
      ? 'Elcorreo electronico no es valido'
      : '';
  }

  ngOnInit(): void {
    //Aqui vamos a hacer el llamado de la version
    /* this.AuthSVC.version().subscribe(res=>{
      this.version = res;
    })*/
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin():void {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue: ILogin = { // Asegura que formValue sea del tipo ILogin
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    this.subscription.add(
      this.loginService.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
