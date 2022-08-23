import { Todo } from "./todo.class";

// Referencia en el HTML
const cantPendiente = document.querySelector('#cantPendientes');
let contador = 0;

export class TodoList {

    constructor () {

        // this.todos = [];
        this.cargarLocalStorage();
    }

    // Métodos
    nuevoTodo( todo ) {
        this.todos.push( todo ); 
        this.contadorPendientes(this.todos);
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
          this.todos = this.todos.filter( todo => todo.id != id ); 
          this.contadorPendientes(this.todos);
          this.guardarLocalStorage();
    }

    marcarCompletado( id  ) {

        for( const todo of this.todos ) {

            if ( todo.id == id ) {
                todo.completado = !todo.completado;
                this.contadorPendientes(this.todos);
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {  
        this.todos = this.todos.filter( todo => !todo.completado );
        this.contadorPendientes(this.todos); 
        this.guardarLocalStorage();                                 
    }

 /*
 * LOCALSTORAGE ---------------------------------------
*/

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify( this.todos ));

    }

    cargarLocalStorage(){

        // if( localStorage.getItem('todo')) {

        //     this.todos = JSON.parse(localStorage.getItem('todo'));

        //     console.log('cargarLocal:', this.todos );

        // } else {
        //     this.todos = [];
        // }

        this.todos =  (localStorage.getItem('todo')) 
                        ? JSON.parse(localStorage.getItem('todo')) 
                        : [];
        // this.todos = this.todos.map( obj => Todo.fromJson( obj )) 
        this.todos = this.todos.map( Todo.fromJson );  // cuando el argumento es igual al que voy a mandar en el callback se puede 
                                                      //simplificar                    
    }

    contadorPendientes( todos ) {
        if ( todos.length > 0 ) {
            contador = 0;
            for ( let i = 0; i < todos.length; i++ ) {
                if (todos[i].completado == false) {
                    contador = contador +1;
                }
            }
            return cantPendiente.innerText = `Pendiente(s):${contador}`;
        }
    }
}