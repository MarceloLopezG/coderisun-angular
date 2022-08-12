import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../../services/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: MyserviceService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  // Variable
  dataList: any;


  getData() {
    this.apiService.getData().subscribe((data) => {
      this.dataList = data;
    });

    return this.dataList;
  }


  logout() {
    return this.apiService.logOut().subscribe((data) => {
      localStorage.clear();
      this.router.navigate(['login']); // go to login
    });
  }
}