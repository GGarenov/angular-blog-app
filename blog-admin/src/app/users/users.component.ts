import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersArray: Array<any> = [];

  constructor(private subService: UsersService) {}

  ngOnInit(): void {
    this.subService.loadData().subscribe((val) => {
      this.usersArray = val;
      console.log(this.usersArray);
    });
  }

  onDelete(id: string) {
    this.subService.deleteData(id);
  }
}
