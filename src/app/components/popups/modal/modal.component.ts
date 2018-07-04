import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.template.html',
  styleUrls: ['./modal.styles.scss']
})
export class ModalComponent implements OnInit {
  public dateToSend: any = {};
  public timeToSend: any = {};
  public timeToSendSchedule: any = {};

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  public ngOnInit(): void {
  }
}
