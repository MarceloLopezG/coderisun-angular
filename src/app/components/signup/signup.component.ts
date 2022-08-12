import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../services/myservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private apiService: MyserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  // Variables
  firstName: String = "";
  lastName: String = "";
  email: String = "";
  password: String = "";
  confirmPassword: String = "";
  error: boolean = false;
  msgError: string = "";
  listErrors: any = {
    "notMatch": "Las contraseñas no coinciden.",
    "inputEmpty": "Por favor, llene todos los campos.",
    "someError": "Ups, algo salío mal, intente de nuevo."
  }


  signup() {
    if (this.validate()) {
      this.apiService.signUp({
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password
      }).subscribe(
        data => {
          this.router.navigate(['login']); // go to login
        },
        err => {
          this.error = true;
          this.msgError = this.listErrors['someError'];
        },
        () => console.log("Successfully registered...")
      );
    }
  }


  validate() {
    let inputList: any = { 'firstName': this.firstName, 'lastName': this.lastName, 'email': this.email, 'password': this.password };
    // Validate that empty fields are not sent
    for (var i in inputList) {
      if (inputList[i] === undefined || inputList[i] === null || inputList[i] === "") {
        this.error = true;
        this.msgError = this.listErrors['inputEmpty'];
        return false;
      }
    }

    if (this.password === this.confirmPassword) {
      // Check if the entered passwords match.
      this.error = false;
      return true;
    } else {
      this.error = true;
      this.msgError = this.listErrors['notMatch'];
      return false;
    }
  }

  close() {
    this.error = false;
  }

} 