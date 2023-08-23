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
  public onSaveData: any
  public isData = false
 cepForm: FormGroup = this.fb.group({
    cep: [''],
    ddd: [''],
    gia: [''],
    logradouro: [''],
    bairro: [''],
    localidade: [''],
    complemento: [''],
    uf: [''],
    ibge: [{value: '', disabled: true}],
    siafi: [{value: '', disabled: true}],
  });

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit(): void {
    console.log()
    this.getDataSubmit()
  }

  public getViaCep() {
    this.appService.getViaCep().subscribe((e) => {
      const res = e;
      this.cepForm.patchValue({
        cep: res.cep,
        ddd: res.ddd,
        gia: res.gia,
        logradouro: res.logradouro,
        bairro: res.bairro,
        localidade: res.localidade,
        complemento: res.complemento,
        uf: res.uf,
        ibge: res.ibge,
        siafi: res.siafi,
      });
    });
  }

  public onSubmit() {
    let submitData = {
      isData: this.isData = true,
      data: this.cepForm.value
    }
    localStorage.setItem('SaveData', JSON.stringify(submitData));
  }

  public getDataSubmit(){
    this.onSaveData = JSON.parse((localStorage.getItem('SaveData')!));
    console.log(this.onSaveData)
    if (this.isData == false) {
      this.getViaCep()
    }
  }

}
