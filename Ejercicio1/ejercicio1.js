var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Creamos un logger para registrar los mensajes
function createLogger(options) {
    var logger = {
        log: function (message) {
            if (options.level === "info") {
                console.info(message); // Log de información
            }
            else if (options.level === "warn") {
                console.warn(message); // Log de advertencia
            }
            else if (options.level === "error") {
                console.error(message); // Log de error
            }
            else {
                console.log(message);
            }
        },
    };
    return logger;
}
// 4. Generics para crear clases y funciones reutilizables
// Clase genérica Queue que puede almacenar elementos de cualquier tipo
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.data.push(item); // Añadir elemento a la cola
    };
    Queue.prototype.dequeue = function () {
        return this.data.shift(); // Remover el primer elemento de la cola
    };
    Object.defineProperty(Queue.prototype, "size", {
        get: function () {
            return this.data.length; // Retornar tamaño de la cola
        },
        enumerable: false,
        configurable: true
    });
    return Queue;
}());
// 5. Programación Orientada a Objetos (POO) y la herencia, polimorfismo, abstracción y encapsulación
var TaskQueue = /** @class */ (function (_super) {
    __extends(TaskQueue, _super);
    function TaskQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Método para procesar todas las tareas en la cola
    TaskQueue.prototype.processTasks = function () {
        while (this.size > 0) {
            var task = this.dequeue(); // Remover tarea de la cola
            if (task) {
                this.processTask(task); // Procesar la tarea
            }
        }
    };
    TaskQueue.prototype.processTask = function (task) {
        // Aquí procesamos la tarea
        console.log("Procesando tarea: ".concat(task.description));
    };
    return TaskQueue;
}(Queue));
// 6. Manejo de null y undefined con narrowing
function processTask(task) {
    if (task) {
        // Aquí task es de tipo Task
        // Si task no es null o undefined, se puede usar
        console.log(task.description);
    }
    else {
        console.log("Task is null or undefined");
    }
}
// Simulación de un Event Loop en Node.js
var logger = createLogger({ level: "info" });
// Creamos una cola de tareas
var taskQueue = new TaskQueue();
// Añadimos algunas tareas a la cola
logger.log("Añadiendo tareas al queue");
taskQueue.enqueue({ id: 1, description: "Tarea 1", status: "pending" });
taskQueue.enqueue({ id: 2, description: "Tarea 2", status: "pending" });
taskQueue.enqueue({ id: 3, description: "Tarea 3", status: "pending" });
logger.log("Procesando tareas");
taskQueue.processTasks();
// Simulación de microtareas y macrotareas
var promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Microtask 1 resolved");
    }, 0); // Macrotarea
});
var promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Microtask 2 resolved");
    }, 100); // Macrotarea
});
// Usamos process.nextTick (microtarea) para ejecutarla antes de la próxima macrotarea
process.nextTick(function () { return logger.log("Microtask con process.nextTick ejecutada"); });
// Ejemplo de callback función que recibe un callback y lo ejecuta
function tareaConCallback(callback) {
    logger.log("Ejecutando tarea con callback");
    callback();
}
// Ejecutar tarea con callback
tareaConCallback(function () {
    logger.log("Callback ejecutado");
});
logger.log("Ejecutando macrotareas y microtareas");
// setTimeout simula una macrotarea que se ejecutará después de 50ms
setTimeout(function () {
    logger.log("Macrotarea con setTimeout ejecutada");
}, 50);
// setImmediate simula una macrotarea que se ejecuta después del ciclo del Event Loop
setImmediate(function () {
    logger.log("Macrotarea con setImmediate ejecutada");
});
// Las promesas se resuelven como microtareas
promise1.then(logger.log);
promise2.then(logger.log);
logger.log("Event Loop finalizado");
