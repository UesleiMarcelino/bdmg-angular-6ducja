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
  public onSaveData: any;
  public isData = false;
  cepForm: FormGroup = this.fb.group({
    cep: [''],
    ddd: [''],
    gia: [''],
    logradouro: [''],
    bairro: [''],
    localidade: [''],
    complemento: [''],
    uf: [''],
    ibge: { value: '', disabled: true },
    siafi: { value: '', disabled: true },
  });

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit(): void {
    this.onSaveData = JSON.parse(localStorage.getItem('SaveData')!);

    if (this.onSaveData !== null) {
      this.isData = true;
    }
    this.getViaCep();
  }

  public getViaCep() {
    if (this.isData) {
      this.formCep(this.onSaveData);
    } else {
      this.appService.getViaCep().subscribe((res) => {
        this.formCep(res);
      });
    }
  }

  public formCep(res: any) {
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
  }

  public onSubmit() {
    let submitData = this.cepForm.value;
    localStorage.setItem('SaveData', JSON.stringify(submitData));
  }
}
