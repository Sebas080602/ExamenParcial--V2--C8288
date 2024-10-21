// 1. Importar los hooks de React y generar los datos simulados
import React, { useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef } from 'react';

// Definimos la estructura de los datos del tablero
interface BoardData {
    id: number;
    name: string;
    description: string;
}

// Generamos un estado inicial con algunos tableros predefinidos
const initialBoards: BoardData[] = [
    { id: 1, name: 'Board 1', description: 'Description for Board 1' },
    { id: 2, name: 'Board 2', description: 'Description for Board 2' },
    { id: 3, name: 'Board 3', description: 'Description for Board 3' },
    { id: 4, name: 'Board 4', description: 'Description for Board 4' },
    { id: 5, name: 'Board 5', description: 'Description for Board 5' },
    { id: 6, name: 'Board 6', description: 'Description for Board 6' },
    { id: 7, name: 'Board 7', description: 'Description for Board 7' },
    { id: 8, name: 'Board 8', description: 'Description for Board 8' },
    { id: 9, name: 'Board 9', description: 'Description for Board 9' },
    { id: 10, name: 'Board 10', description: 'Description for Board 10' },
];

// Función para generar un número aleatorio (utilizada para generar ID de tableros aleatorios)
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función que genera datos simulados de un tablero
function generateRandomBoardData(): BoardData {
    const randomId = getRandomInt(1, 10);
    const randomName = `Board ${randomId}`;
    const randomDescription = `Description for ${randomName}`;
    return { id: randomId, name: randomName, description: randomDescription };
}

// 2. Manejo del estado con useReducer y useContext para crear un estado global

// Definimos las acciones que nuestro reducer manejará
type Action =
    | { type: 'ADD_BOARD'; payload: BoardData }
    | { type: 'DELETE_BOARD'; payload: number }
    | { type: 'UPDATE_BOARD'; payload: BoardData };

// Definimos la estructura inicial de nuestro reducer
function boardReducer(state: BoardData[], action: Action): BoardData[] {
    switch (action.type) {
        case 'ADD_BOARD':
            return [...state, action.payload];
        case 'DELETE_BOARD':
            return state.filter(board => board.id !== action.payload);
        case 'UPDATE_BOARD':
            return state.map(board =>
                board.id === action.payload.id ? action.payload : board
            );
        default:
            return state;
    }
}

// Creamos un contexto para gestionar el estado global de los tableros
const BoardContext = React.createContext<{
    boards: BoardData[];
    dispatch: React.Dispatch<Action>;
}>({
    boards: [],
    dispatch: () => null,
});

// Hook personalizado que encapsula el uso del contexto
function useBoardContext() {
    return useContext(BoardContext);
}

// 3. Manejo de interacciones del usuario (añadir, eliminar y actualizar tableros)
function useBoardInteraction() {
    const { dispatch } = useBoardContext();

    const handleAddBoard = useCallback(() => {
        const newBoard = generateRandomBoardData();
        dispatch({ type: 'ADD_BOARD', payload: newBoard });
    }, [dispatch]);

    const handleDeleteBoard = useCallback((boardId: number) => {
        dispatch({ type: 'DELETE_BOARD', payload: boardId });
    }, [dispatch]);

    const handleUpdateBoard = useCallback((updatedBoard: BoardData) => {
        dispatch({ type: 'UPDATE_BOARD', payload: updatedBoard });
    }, [dispatch]);

    return { handleAddBoard, handleDeleteBoard, handleUpdateBoard };
}

// 4. Optimización con useMemo y useCallback para evitar renders innecesarios
function useSortedAndFilteredBoards(filter: string, sort: string) {
    const { boards } = useBoardContext();

    // Filtramos y ordenamos los tableros, usando useMemo para evitar cálculos innecesarios
    const filteredBoards = useMemo(() => {
        return boards.filter(board =>
            board.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [boards, filter]);

    const sortedBoards = useMemo(() => {
        return filteredBoards.sort((a, b) =>
            sort === 'name' ? a.name.localeCompare(b.name) : a.id - b.id
        );
    }, [filteredBoards, sort]);

    return sortedBoards;
}

// 5. Componente principal de la aplicación
function App() {
    // Estado global manejado con useReducer
    const [boards, dispatch] = useReducer(boardReducer, initialBoards);

    // Manejamos el filtro y la ordenación
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('name');

    // Utilizamos los hooks personalizados y las interacciones de usuario
    const { handleAddBoard, handleDeleteBoard } = useBoardInteraction();
    const sortedBoards = useSortedAndFilteredBoards(filter, sort);

    return (
        <BoardContext.Provider value={{ boards, dispatch }}>
            <div>
                {/* Filtro y ordenación */}
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filtrar tableros"
                />
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="name">Ordenar por Nombre</option>
                    <option value="id">Ordenar por ID</option>
                </select>
                
                {/* Botón para añadir tablero */}
                <button onClick={handleAddBoard}>Añadir Tablero</button>

                {/* Lista de tableros */}
                <ul>
                    {sortedBoards.map((board) => (
                        <li key={board.id}>
                            {board.name} - {board.description}
                            <button onClick={() => handleDeleteBoard(board.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </BoardContext.Provider>
    );
}

// 6. Exportamos el componente principal
export default App;
