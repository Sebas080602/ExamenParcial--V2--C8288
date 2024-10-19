// Definimos una clase base para eventos usando POO
class Event {
  constructor(id, title, description, date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = new Date(date);
  }

  // Métodos para modificar los detalles del evento
  editTitle(newTitle) {
    this.title = newTitle; // Modifica el título del evento
  }

  editDescription(newDescription) {
    this.description = newDescription; // Modifica la descripción del evento
  }

  editDate(newDate) {
    this.date = new Date(newDate); // Modifica la fecha del evento
  }
}

// Clase EventManager para manejar la lista de eventos y las acciones correspondientes
class EventManager {
  constructor() {
    this.events = []; // Inicializamos un array vacío para almacenar los eventos
  }

  // Método para crear un nuevo evento utilizando una Promesa
  createEvent(title, description, date) {
    return new Promise((resolve) => {
      const newEvent = new Event(this.events.length + 1, title, description, date);
      this.events.push(newEvent);
      resolve(newEvent); // Resolvemos la promesa con el evento recién creado
    });
  }

  // Método para editar un evento existente
  editEvent(id, title, description, date) {
    return new Promise((resolve, reject) => {
      const event = this.getEventById(id); // Obtenemos el evento por su ID
      if (event) {
        event.editTitle(title);
        event.editDescription(description);
        event.editDate(date);
        resolve(event);
      } else {
        reject("Evento no encontrado");
      }
    });
  }

  // Método para eliminar un evento
  deleteEvent(id) {
    return new Promise((resolve, reject) => {
      const index = this.events.findIndex((event) => event.id === id);
      if (index !== -1) {
        this.events.splice(index, 1); // Eliminamos el evento de la lista
        resolve(true);
      } else {
        reject("Evento no encontrado");
      }
    });
  }

  // Método para obtener un evento por ID
  getEventById(id) {
    return this.events.find((event) => event.id === id); // Buscamos y retornamos el evento por su ID
  }

  // Método para obtener todos los eventos
  getAllEvents() {
    return this.events; // Retornamos la lista completa de eventos
  }
}

// React Component para mostrar una lista de eventos
const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          {event.title} - {event.description} - {event.date.toLocaleDateString()}
          <button onClick={() => onEdit(event.id)}>Editar</button>
          <button onClick={() => onDelete(event.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

// Hook personalizado para manejar las interacciones de eventos
function useEventManager(eventManager) {
  const [events, setEvents] = React.useState(eventManager.getAllEvents()); // Estado para almacenar los eventos

  const handleCreateEvent = (title, description, date) => {
    eventManager.createEvent(title, description, date).then((newEvent) => {
      setEvents([...events, newEvent]); // Actualizamos el estado con el nuevo evento
    });
  };

  const handleEditEvent = (id, title, description, date) => {
    eventManager.editEvent(id, title, description, date).then((updatedEvent) => {
      const updatedEvents = events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      setEvents(updatedEvents); // Actualizamos el estado con la lista de eventos actualizada
    });
  };

  const handleDeleteEvent = (id) => {
    eventManager.deleteEvent(id).then(() => {
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents); // Actualizamos el estado con la lista filtrada
    });
  };

  return { events, handleCreateEvent, handleEditEvent, handleDeleteEvent };
}