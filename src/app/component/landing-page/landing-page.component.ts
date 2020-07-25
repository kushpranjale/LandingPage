import { LeadService } from './../../Services/lead.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  leadGroup: FormGroup;
  email_add = '';
  spinner = false;
  btn_status = false;
  email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  @ViewChild('someModal') someModal: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private leadService: LeadService
  ) {}

  ngOnInit(): void {
    this.leadGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern(this.email_pattern)],
      ],
      mobile_no: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
    });
  }
  onSubmit(myForm: any) {
    if (this.leadGroup.valid) {
      this.spinner = true;

      this.email_add = this.leadGroup.value.email;
      console.log(this.email_add);

      this.leadService.addLead(this.leadGroup.value).subscribe((response) => {
        // $(this.someModal.nativeElement).modal('show');
        myForm.resetForm();
        this.leadGroup.reset();
        this.btn_status = true;
        this.spinner = false;

        console.log(response);
      });
    } else return;
  }
}
