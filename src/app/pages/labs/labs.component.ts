
import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'todoapp';

  objetosVacio = signal([]); 

  objetoSignal = signal({
    id: 0,
    nombre: 'radio',
    tipo: 'A',
    costo: 200
  }); 

  objetos = signal([
    {
      id: 0,
      nombre: 'Radio',
      tipo: 'Clase A',
      costo: 1300  
    },
    {
      id: 1,
      nombre: 'Televisión',
      tipo: 'Clase B',
      costo: 300
    },
    {
      id: 2,
      nombre: 'Play Station',
      tipo: 'Clase C',
      costo: 450
    }


  ])

  tasks = [
    "Instalar el angular CLI",
    "Construir proyecto",
    "Construir "
  ]

  nameIf = signal('Alexander');
  ageIf = signal(20);


  name = 'Alexander';
  age = 20;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png'

  person = signal({
    name: 'Alexander',
    apellido: 'Chavez',
    age: 24,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });


  persons = [
    {
      name: 'Alexander',
      apellido: 'Chavez',
      age: 24,
      avatar: 'https://w3schools.com/howto/img_avatar.png'
    },
    {
      name: 'Alex',
      apellido: 'Sifuentes',
      age: 20,
      avatar: 'https://w3schools.com/howto/img_avatar.png'
    }
  ]

  colorCtrl = new FormControl('');

  widthCtrl = new FormControl(50, {
    nonNullable: true
    });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      // console.log('Event', this.colorCtrl.value)
      console.log(value);
    });
  }
  /*
  changeColor(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    console.log(newValue);
  }*/

  word = signal('palabra');

  onSendAlert(){
    alert("Enviando Alerta");
  }

  onSendDoubleAlert(){
    alert("Enviando doble Alerta");
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.word.set(newValue);
    // console.log(event);
  }

  changeHandlerName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person().name = newValue;
  }

  // My event
  changeHandlerAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value);
    this.person().age = newValue;
  }

  // Event age platzi
  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value);
    this.person.update(prevState => {
      return {
        ...prevState,
        age: newValue
      }
    });
    }
  
  // Event name platzi
  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    });
  }


  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  mockData = signal(
    [{
      nombre : 'Alex',
      apellido : 'Sifuentes',
      age: 24 
    },
    {
      nombre : 'Alexander',
      apellido : 'Chavez',
      age: 24 
    },
    {
      nombre : 'Cris',
      apellido : 'Dominguez',
      age: 23
    },
    {
      nombre : 'Evalart',
      apellido : 'Rojas',
      age: 25
    },
  ]
  );

}
