// 1. Tipos avanzados (tipo de unión e intersección)
type TaskStatus = "pending" | "resolved" | "rejected"; // Tarea pendiente, resuelta o rechazada

interface Task {
  id: number; // ID único de la tarea
  description: string; // Descripción de la tarea
  status: TaskStatus; // Estado de la tarea usando el tipo de unión definido
}

// Intersección de tipos entre Promise y Thenable
type PromiseLike<T> = Promise<T> | Thenable<T>;

// 2. Utility types (Pick, Partial, Omit, Readonly)
type PickType<T, K extends keyof T> = {
  [P in K]: T[P]; // Seleccionamos solo las propiedades especificadas
};

// Excluimos las propiedades y usamos Pick para crear un nuevo tipo
type OmitType<T, K extends keyof T> = PickType<T, Exclude<keyof T, K>>;

// Todas las propiedades pueden estar presentes o no
type PartialType<T> = {
  [P in keyof T]?: T[P];
};

// Las propiedades no pueden ser modificadas después de ser definidas
type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P];
};

// 3. Interfaces y tipos de funciones
interface Logger {
  log(message: string): void;
}

// Opciones de configuración del logger: permite elegir el nivel de logging
type LoggerOptions = {
  level?: "info" | "warn" | "error";
};

// Creamos un logger para registrar los mensajes
function createLogger(options: LoggerOptions): Logger {
    const logger = {
      log: (message: string) => {
        if (options.level === "info") {
          console.info(message); // Log de información
        } else if (options.level === "warn") {
          console.warn(message); // Log de advertencia
        } else if (options.level === "error") {
          console.error(message); // Log de error
        } else {
          console.log(message);
        }
      },
    };
    return logger;
}

// 4. Generics para crear clases y funciones reutilizables

// Clase genérica Queue que puede almacenar elementos de cualquier tipo
class Queue<T> {
  private data: T[] = []; 

  enqueue(item: T): void {
    this.data.push(item); // Añadir elemento a la cola
  }

  dequeue(): T | undefined {
    return this.data.shift(); // Remover el primer elemento de la cola
  }

  get size(): number {
    return this.data.length; // Retornar tamaño de la cola
  }
}

// 5. Programación Orientada a Objetos (POO) y la herencia, polimorfismo, abstracción y encapsulación
class TaskQueue extends Queue<Task> {
  // Método para procesar todas las tareas en la cola
  processTasks(): void {
    while (this.size > 0) {
      const task = this.dequeue(); // Remover tarea de la cola
      if (task) {
        this.processTask(task); // Procesar la tarea
      }
    }
  }

  private processTask(task: Task): void {
    // Aquí procesamos la tarea
    console.log(`Procesando tarea: ${task.description}`);
  }
}

// 6. Manejo de null y undefined con narrowing
function processTask(task: Task | null | undefined): void {
  if (task) {
    // Aquí task es de tipo Task
    // Si task no es null o undefined, se puede usar
    console.log(task.description);
  } else {
    console.log("Task is null or undefined");
  }
}

// Simulación de un Event Loop en Node.js
const logger = createLogger({ level: "info" });

// Creamos una cola de tareas
const taskQueue = new TaskQueue();

// Añadimos algunas tareas a la cola
logger.log("Añadiendo tareas al queue");
taskQueue.enqueue({ id: 1, description: "Tarea 1", status: "pending" });
taskQueue.enqueue({ id: 2, description: "Tarea 2", status: "pending" });
taskQueue.enqueue({ id: 3, description: "Tarea 3", status: "pending" });

logger.log("Procesando tareas");
taskQueue.processTasks();

// Definimos una promesa (microtarea) con setTimeout (macrotarea)
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Microtask 1 resolved");
  }, 0); // Ejecutar después de 0 milisegundos (macrotarea)
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Microtask 2 resolved");
    }, 100); // Ejecutar después de 100 milisegundos (macrotarea)
  });

// Usamos process.nextTick (microtarea) para ejecutarla antes de la próxima macrotarea
process.nextTick(() => logger.log("Microtask con process.nextTick ejecutada"));

// Callback: función que recibe un callback y lo ejecuta
function tareaConCallback(callback: () => void) {
    logger.log("Ejecutando tarea con callback");
    callback();
}

// Ejecutar tarea con callback
tareaConCallback(() => {
  logger.log("Callback ejecutado");
});

logger.log("Ejecutando macrotareas y microtareas");

// setTimeout simula una macrotarea que se ejecutará después de 50ms
setTimeout(() => {
  logger.log("Macrotarea con setTimeout ejecutada");
}, 50);

// setImmediate simula una macrotarea que se ejecuta después del ciclo del Event Loop
setImmediate(() => {
  logger.log("Macrotarea con setImmediate ejecutada");
});

// Las promesas se resuelven como microtareas
promise1.then(logger.log);
promise2.then(logger.log);

logger.log("Event Loop finalizado");
