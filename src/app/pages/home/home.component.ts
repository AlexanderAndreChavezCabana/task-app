import { CommonModule } from '@angular/common';
import { Component, computed, effect, numberAttribute, signal, inject, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../../models/task.model';
import { Person } from '../../models/person.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  /*
  numeros: number[] = [];
  numerosPares: number[] = [];
  arrayFullName: string[] = [];
  newDataName: string[] = [];
  dataJson: any = '';

  constructor(){
    this.numeros = [1, 2, 3, 4, 5, 6]
    this.numerosPares = this.numeros.filter(numeros => numeros%2 === 0);
    console.log("Event", this.numerosPares); 
    this.consultFullName(2);

    // Consulta Dato
    this.consultPerson(3);
  }*/

  /*


  consultFullName(num: number){
    this.arrayFullName = ['Alexander', 'Chavez', 'Cabana'];
    this.newDataName = this.arrayFullName.filter((item, posicion) => posicion !== num);
    console.log('Array restante', this.newDataName);
  }
  */
  /*
  consultPerson(identificador: number){
    this.persons.update((persons) => persons.filter((person, position) => position !== identificador));
    for(let n=0; n < this.persons().length; n++){
      console.log("Nombre: ", this.persons()[n].name);
    }
  */
    // console.log('Event', this.persons());
    /*
    const personResult = this.persons()[0];
    if (personResult) {
      console.log('Event Person', personResult.name);
    } else {
      console.log('No person found');
    }
    
  }*/

  // Pruebas
  /*
  persons = signal<Person[]>([
    {
      id: Date.now(),
      name: 'Alexander',
      status: true
    },
    {
      id: Date.now(),
      name: 'Bert',
      status: false
    },
    {
      id: Date.now(),
      name: 'Jose',
      status: false
    },
    {
      id: Date.now(),
      name: 'Mario',
      status: true
    }
  ]);
  */
  // Fin pruebas
/*
  tasks = signal<Task []>([
    {
      id: Date.now(),
      title: "Instalar el angular CLI",
      completed: true,
      editing: false
    },
    {
      id: 2,
      title: "Crear proyecto",
      completed: false,
      editing: false
    },
    {
      id: 3,
      title: "Crear componente",
      completed: true,
      editing: false
    },
    {
      id: 4,
      title: "Crear servicio",
      completed: false,
      editing: false
    }
  ]); */

  tasks = signal<Task[]>(
    []
  );
  /*
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    // this.tasks.update((tasks) => [...tasks, newTask]); // Registrar al último
    // this.tasks.update((tasks) => [newTask, ...tasks]); // Registrar al primero 
    this.addTask(newTask); 
  }
  */
  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      editing: false
    }
    this.tasks.update((tasks) => [newTask, ...tasks]);
  }
  
  DeleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }
  
  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      });
    });
  }

  updateTaskEditingMode(index: number){
    if (this.tasks()[index].completed) return;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index){
          return {
            ...task,
            editing: true  
          }
        }
        return {
          ...task,
          editing: false
        }
      });
    });
  }

  updateTaskTitle(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index){
          return {
            ...task,
            title: newValue,
            editing: false
          }
        }
        return task
      });
    });
  }
  escapeTask(index: number, event: Event){
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index){
          return {
            ...task,
            editing: false
          }
        }
        return task
      })
    })
  }
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  changeChandler(){
    if (this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value;
      if(value.trim() !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }else{
        alert('Ingresa un valor por favor')
      }
    }
  }

  // filter = signal('all');
  filter =  signal<'all'| 'completed' | 'pending'>('all');

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if (filter == 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;
  });

  /*
  changeFilter(filter: string){
    this.filter.set(filter);
  }*/
  changeFilter(filter: 'all' | 'completed' | 'pending'){
    this.filter.set(filter);
  }

  constructor() {
    /*
    effect(() => { // Especie de espia que ejecuta
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }); */
  }

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  injector = inject(Injector);

  trackTasks() {
    effect(() => {
      const tasks = this.tasks;
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector });
  }


}
