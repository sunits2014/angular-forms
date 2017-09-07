import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-fields',
  templateUrl: './new-fields.component.html',
  styleUrls: ['./new-fields.component.css']
})
export class NewFieldsComponent implements OnInit {

  constructor() { }

  @Input('group') public newForm: FormGroup;

  ngOnInit() {
  }

}
