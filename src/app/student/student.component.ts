import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentdata } from './student.model';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  //hide
  showadd!: boolean;
  showupdate!: boolean;
  studentmodelobj:studentdata=new studentdata
  formValue!: FormGroup
  allstudentdata:any;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:  ['',Validators.required],
      email: ['',Validators.required],
    })
    this.getdata()
  }
  //to hide on add
  add() {
    this.showadd = true;
    this.showupdate = false;
  }
  //to hide on edit button
  edit(data:any) {
    this.showadd = false;
    this.showupdate = true;
    this.studentmodelobj.id = data.id;
  this.formValue.controls['name'].setValue(data.name)
  this.formValue.controls['email'].setValue(data.email)


  }
//update on edit
update(){
  this.studentmodelobj.name = this.formValue.value.name;
  this.studentmodelobj.email= this.formValue.value.email;

  this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
    this.formValue.reset();
    this.getdata();
   alert("Dados forma atualizados com sucesso");
  },
  err=>{
alert("Algo de errado nao esta certo")
  })
    }
  addstudent(){
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email= this.formValue.value.email;
    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
     // console.log(res)
    this.getdata();
    this.formValue.reset()
     alert("Dados adicionados com sucesso");
    },
err=>{
  alert("Algo de errado nao esta certo!");
})
  }

//getdata to render 
getdata(){
  this.api.getstudent()
  .subscribe(res=>{
    this.allstudentdata=res;
  })
}

//delete

deletestud(data:any){
  if(confirm('Tem certeza que voce quer deletar ?'))
  this.api.deletestudent(data.id)
  .subscribe(res=>{
alert("Dados deletados com sucesso");
this.getdata();
  })
}

}
