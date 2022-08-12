import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../../services/myservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: MyserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  email: String = "";
  password: String = "";
  error: boolean = false;
  msgError: String = "";
  listErrors: any = {
    "someError": "Ups, algo salío mal, intente de nuevo.",
    "inputEmpty": "Por favor, llene todos los campos."
  }


  login() {
    if (this.validate()) {
      this.apiService.logIn({
        email: this.email,
        password: this.password
      }).subscribe(
        data => {
          localStorage.setItem('acces_token', data['token']);
          localStorage.setItem('username', data['username']);
          this.router.navigate(['']); // go to home
        },
        err => {
          this.error = true;
          this.msgError = this.listErrors['someError'];
        },
        () => console.log("Processing Complete...")
      );
    }
  }

  // Validate that empty fields are not sent
  validate() {
    let inputList: any = { 'email': this.email, 'password': this.password };
    for (var i in inputList) {
      if (inputList[i] === undefined || inputList[i] === "") {
        this.error = true;
        this.msgError = this.listErrors['inputEmpty'];
        return false;
      }
    }
    this.error = false;
    return true;
  }
} 