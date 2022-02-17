import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../../../home/service/authenticate.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticateService: AuthenticateService, public dialogRef: MatDialogRef<LogoutComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout() {
    this.authenticateService.logout();
    this.dialogRef.close();
  }
}
