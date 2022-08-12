import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../services/myservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})


export class UpdateAccountComponent implements OnInit {

  constructor(private apiService: MyserviceService, private router: Router, private activeRoute: ActivatedRoute) { }

  // Variables
  dataList: any;
  username:any;
  firstName: String = "";
  lastName: String = "";
  email: String = "";
  password: String = "";
  confirmPassword: String = "";
  error: boolean = false;
  msgError: string = "";
  listErrors: any = {
    "notMatch": "Las contraseñas no coinciden.",
    "inputEmpty": "Por favor, llene todos los campos."
  }


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    return this.apiService.getData().subscribe((data) => {
      this.dataList = data;
      // Assign values ​​to variables.
      // These values ​​will be displayed in the inputs.
      Object.entries(data).forEach(([key, value], index) => {
        this.firstName = value.first_name;
        this.lastName = value.last_name;
        this.email = value.email;
      });
    });
  }


  updateAccount() {  
    // Retrieve the username of the user using params.
    this.activeRoute.paramMap.subscribe(params => {
      this.username = params.get("username");
    });


    if (this.validate()) {
      this.apiService.updateAccount({
        username: this.username,
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password
      }).subscribe((data) => {
        this.router.navigate(['']); // go to home
      })
    }
  }


  // Validate that empty fields are not sent
  validate() {
    let inputList: any = { 'firstName': this.firstName, 'lastName': this.lastName, 'email': this.email, 'password': this.password };
    for (var i in inputList) {
      if (inputList[i] === undefined || inputList[i] === null || inputList[i] === "") {
        this.error = true;
        this.msgError = this.listErrors['inputEmpty'];
        return false;
      }
    }

    // Check if the entered passwords match.
    if (this.password === this.confirmPassword) {
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