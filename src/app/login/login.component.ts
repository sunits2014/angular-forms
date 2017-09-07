import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ModalTextService } from "../modal-text.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserForm } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ModalTextService],
  animations: [
    trigger('modalAnim', [
      transition(':enter',
        [
          style({ top: '-10%', opacity: '0' }),
          animate('.3s', style({ top: '0', opacity: '1' }))
        ]
      ),
      transition(':leave',
        [
          style({ top: '0', opacity: '1' }),
          animate('.3s', style({ top: '-10%', opacity: '0' }))
        ]
      )
    ])
  ]
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup;
  public formGrp: FormGroup;
  public textArray: any[];
  public textSelArray: any[];
  public modalActivated: boolean;
  public confIsOn: boolean;

  constructor(public modaltext: ModalTextService, public _fb: FormBuilder) { }

  ngOnInit() {   

    this.smokerInfo = "Yet to be validated";
    this.alcoholicInfo = "Yet to be validated";

    this.userForm = this._fb.group({
      name: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      habits: new FormGroup({
        smoker: new FormControl(''),
        alcoholic: new FormControl(''),
      }),      
      plan: new FormControl('',Validators.required),
    })

    this.formGrp = this._fb.group({
      newFormGroup: this._fb.array([])
    });

    this.btnaction('fields');

    this.modaltext.getModalText().subscribe(result => this.textArray = result);
  }

  // public addFields() {
  //   const dynamicControls = <FormArray>this.formGrp.controls['newFormGroup'];
  //   const addFields = this.oriForm();
  //   dynamicControls.push(addFields);
  // }

  public textColor: Object;
  public positiveText: boolean;

  public smokerInfo: string;
  public alcoholicInfo: string;

  public userFormSubmit() {
    console.log(this.userForm);
    let smokerValue = this.userForm.controls.habits.get('smoker').value;
    let alcoholicValue = this.userForm.controls.habits.get('alcoholic').value;
    if(smokerValue == true && alcoholicValue == true) {
      this.smokerInfo = "true";
      this.alcoholicInfo = "true";
      this.textColor = {
        'color':'green',
        'text-transform':'uppercase',
        'font-weight':'bold'
      }
    } else if(smokerValue == true && alcoholicValue == "" || alcoholicValue == undefined) {
      this.smokerInfo = "true";
      this.alcoholicInfo = "false";
      this.positiveText = true;
    }else if(smokerValue == undefined || smokerValue == "" && alcoholicValue == true) {
      this.smokerInfo = "false";
      this.alcoholicInfo = "true";
      this.positiveText = true;
    }
  }

  public oriForm() {
    return this._fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    })
  }

  public btnaction(param): void {
    this.modaltext.getModalText().subscribe(result => this.textArray = result);
    if (param == 'conf') {
      this.modalActivated = true;
      this.confIsOn = true;
      this.textSelArray = this.textArray.splice(0, 1);
    } else if (param == 'modal') {
      this.confIsOn = false;
      this.modalActivated = true;
      this.textSelArray = this.textArray.splice(1, 1);
    } else if (param == 'fields') {
      const dynamicControls = <FormArray>this.formGrp.controls['newFormGroup'];
      const addFields = this.oriForm();
      dynamicControls.push(addFields);
    }
  }

  public config = {
    wheelSpeed:3
  };

  public close() {
    this.textSelArray = [];
    this.modalActivated = false;
  }

  public deleteRow(rowIdx) {
    const dynamicControls = <FormArray>this.formGrp.controls['newFormGroup'];
    dynamicControls.removeAt(rowIdx);
  }

  public formSubmit() {
    console.log(this.formGrp.controls.newFormGroup.value);
    this.formGrp.controls.newFormGroup.reset();
    const dynamicControls = <FormArray>this.formGrp.controls['newFormGroup'];
    for (let i = 0; i = dynamicControls.length - 1; i--) {
      dynamicControls.removeAt(i);
    }
  }

}
