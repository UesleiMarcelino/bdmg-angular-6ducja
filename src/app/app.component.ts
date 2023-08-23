import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
import { CepListModel } from './cep-list-model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  public res: any
  public cepForm: FormGroup = this.fb.group({
    cep: [''],
  });

 userForm = new FormGroup<CepListModel>({
    cep: new FormControl(''),

  });

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit(): void {
    this.getViaCep();
  }

  public getViaCep() {
    this.appService.getViaCep().subscribe((e) => {
      this.res = e
      this.cepForm.patchValue({
        cep: this.res.cep
      })
      console.log(this.cepForm.value)
    });
  }

  public onSubmit() {
    console.log(this.cepForm.value);
  }
}
