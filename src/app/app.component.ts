import { Component, OnInit, VERSION } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MaxLengthValidator,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  public onSaveData: any;
  public isData = false;
  public isBuscarCep = false;
  public submitted = false;
  cepForm: FormGroup = this.fb.group({
    cep: ['', Validators.required],
    ddd: ['', Validators.required],
    gia: [''],
    logradouro: ['', Validators.required],
    bairro: ['', Validators.required],
    localidade: ['', Validators.required],
    complemento: ['', Validators.required],
    uf: ['', Validators.required],
    ibge: [{ value: '', disabled: true }],
    siafi: [{ value: '', disabled: true }],
  });

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private snackBar: MatSnackBar
  ) {}

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

  public resetForm() {
    this.cepForm.reset();
    this.isBuscarCep = true;
  }

  public getbuscarCep(event: any) {
    if (this.isBuscarCep) {
      this.isBuscarCep = true;
      this.appService.getBuscarCep(event.target.value).subscribe((res: any) => {
        if (res.erro) {
          this.showMessage('CEP não encontrado', true);
        }
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
    if (this.cepForm.valid) {
      let submitData = this.cepForm.getRawValue();
      localStorage.setItem('SaveData', JSON.stringify(submitData));
      this.showMessage('Dados alterados e salvos com sucesso', false);
    } else {
      this.showMessage('Preencha os campos obrigatórios!', true);
    }
  }

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucess'],
    });
  }
}
