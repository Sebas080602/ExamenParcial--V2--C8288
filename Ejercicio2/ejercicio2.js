"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Importar los hooks de React y generar los datos simulados
var react_1 = require("react");
// Generamos un estado inicial con algunos tableros predefinidos
var initialBoards = [
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Función que genera datos simulados de un tablero
function generateRandomBoardData() {
    var randomId = getRandomInt(1, 10);
    var randomName = "Board ".concat(randomId);
    var randomDescription = "Description for ".concat(randomName);
    return { id: randomId, name: randomName, description: randomDescription };
}
// Definimos la estructura inicial de nuestro reducer
function boardReducer(state, action) {
    switch (action.type) {
        case 'ADD_BOARD':
            return __spreadArray(__spreadArray([], state, true), [action.payload], false);
        case 'DELETE_BOARD':
            return state.filter(function (board) { return board.id !== action.payload; });
        case 'UPDATE_BOARD':
            return state.map(function (board) {
                return board.id === action.payload.id ? action.payload : board;
            });
        default:
            return state;
    }
}
// Creamos un contexto para gestionar el estado global de los tableros
var BoardContext = react_1.default.createContext({
    boards: [],
    dispatch: function () { return null; },
});
// Hook personalizado que encapsula el uso del contexto
function useBoardContext() {
    return (0, react_1.useContext)(BoardContext);
}
// 3. Manejo de interacciones del usuario (añadir, eliminar y actualizar tableros)
function useBoardInteraction() {
    var dispatch = useBoardContext().dispatch;
    var handleAddBoard = (0, react_1.useCallback)(function () {
        var newBoard = generateRandomBoardData();
        dispatch({ type: 'ADD_BOARD', payload: newBoard });
    }, [dispatch]);
    var handleDeleteBoard = (0, react_1.useCallback)(function (boardId) {
        dispatch({ type: 'DELETE_BOARD', payload: boardId });
    }, [dispatch]);
    var handleUpdateBoard = (0, react_1.useCallback)(function (updatedBoard) {
        dispatch({ type: 'UPDATE_BOARD', payload: updatedBoard });
    }, [dispatch]);
    return { handleAddBoard: handleAddBoard, handleDeleteBoard: handleDeleteBoard, handleUpdateBoard: handleUpdateBoard };
}
// 4. Optimización con useMemo y useCallback para evitar renders innecesarios
function useSortedAndFilteredBoards(filter, sort) {
    var boards = useBoardContext().boards;
    // Filtramos y ordenamos los tableros, usando useMemo para evitar cálculos innecesarios
    var filteredBoards = (0, react_1.useMemo)(function () {
        return boards.filter(function (board) {
            return board.name.toLowerCase().includes(filter.toLowerCase());
        });
    }, [boards, filter]);
    var sortedBoards = (0, react_1.useMemo)(function () {
        return filteredBoards.sort(function (a, b) {
            return sort === 'name' ? a.name.localeCompare(b.name) : a.id - b.id;
        });
    }, [filteredBoards, sort]);
    return sortedBoards;
}
// 5. Componente principal de la aplicación
function App() {
    // Estado global manejado con useReducer
    var _a = (0, react_1.useReducer)(boardReducer, initialBoards), boards = _a[0], dispatch = _a[1];
    // Manejamos el filtro y la ordenación
    var _b = (0, react_1.useState)(''), filter = _b[0], setFilter = _b[1];
    var _c = (0, react_1.useState)('name'), sort = _c[0], setSort = _c[1];
    // Utilizamos los hooks personalizados y las interacciones de usuario
    var _d = useBoardInteraction(), handleAddBoard = _d.handleAddBoard, handleDeleteBoard = _d.handleDeleteBoard;
    var sortedBoards = useSortedAndFilteredBoards(filter, sort);
    return value = {};
    {
        boards, dispatch;
    }
}
 >
    { /* Filtro y ordenación */}
    < input;
type = "text";
value = { filter: filter };
onChange = {}(e);
setFilter(e.target.value);
placeholder = "Filtrar tableros"
    /  >
    value;
{
    sort;
}
onChange = {}(e);
setSort(e.target.value);
    >
        value;
"name" > Ordenar;
por;
Nombre < /option>
    < option;
value = "id" > Ordenar;
por;
ID < /option>
    < /select>;
{ /* Botón para añadir tablero */ }
onClick;
{
    handleAddBoard;
}
 > Añadir;
Tablero < /button>;
{ /* Lista de tableros */ }
({ sortedBoards: sortedBoards, : .map(function (board) { return key = { board: board, : .id } >
        { board: board, : .name } - { board: board, : .description }
        < button; }, onClick = {}(), handleDeleteBoard(board.id)) } > Eliminar < /button>
    < /li>);
/ul>
    < /div>
    < /BoardContext.Provider>;
;
// 6. Exportamos el componente principal
exports.default = App;
