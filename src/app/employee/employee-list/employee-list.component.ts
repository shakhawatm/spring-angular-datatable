import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/api.response';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<ApiResponse>;

  constructor(private employeeService: EmployeeService,
    private router: Router) { 
      setTimeout(function(){
        $(function(){
          $('#tblEmployee').DataTable();
        });
      },500); 
    }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    setTimeout(function(){
      $(function(){
        $('#tblEmployee').DataTable();
    });
    },500);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.employees = this.employeeService.getEmployees();
        },
        error => console.log(error)
      );
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }

}
