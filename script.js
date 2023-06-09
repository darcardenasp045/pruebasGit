// Variables para almacenar la posición actual del caballo
    let currentRowHorse = 0;
    let currentColHorse = 1;
    let currentRowHPawn = 1;
    let currentColPawn = 1;
    let selectedPiece = null;
    let possibleMoves = [];

    //FUNCION PARA LOS POSIBLES MOVIMIENTOS

    function highlightPossibleMoves() {
        const row = parseInt(selectedPiece.parentElement.dataset.row);
        const col = parseInt(selectedPiece.parentElement.dataset.col);
    
        // Obtener las celdas posibles a las que la pieza puede moverse
        possibleMoves = getValidMoves(row, col);
    
        // Resaltar las celdas posibles
        possibleMoves.forEach(move => {
            const cell = getCellElement(move.row, move.col);
            
            cell.classList.add("possible-move");
        });
        }


    // FUNCION PARA CREAR EL TABLERO Y LAS FLECHAS
    function createChessBoard() {
    const board = document.getElementById('board');
    let isWhite = true;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;

        if (isWhite) {
            cell.classList.add('box-color-white')
        } else {
            cell.classList.add('box-color-black')
        }

        board.appendChild(cell);
        isWhite = !isWhite;
        }
        isWhite = !isWhite;
    }
    }

    

    // Función para agregar la imagen del caballo a la celda especificada
    // function addHorseImage(row, col) {
    // const cell = getCellElement(row, col);
    // const horseImg = document.createElement('img');
    // horseImg.src = 'horse.png'; // Ruta de la imagen del caballo
    // horseImg.className = 'piece';
    // cell.appendChild(horseImg);
    // }

    function addItem(propu, row, col, itemImg, srcImg, clas){
        var propu = getCellElement(row, col);
        var itemImg = document.createElement('img')
        itemImg.src = srcImg
        itemImg.className = clas
        propu.appendChild(itemImg)
    }

    // Función para obtener el elemento HTML de una celda según su posición (fila, columna)
    function getCellElement(row, col) {
    return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    function clearCell(row, col) {
    const cell = getCellElement(row, col);
    
    cell.classList.remove("selected");
    cell.classList.remove("possible-move");
    }

    // Función para mover el caballo a una nueva posición
    function moveHorse(row, col) {
    // Verificar si el movimiento es válido para el caballo
    if (isMoveValid(row, col)) {
        // Eliminar la imagen del caballo de la posición actual
        clearCell(currentRow, currentCol);

        // Actualizar la posición actual del caballo
        currentRow = row;
        currentCol = col;

        // Agregar la imagen del caballo en la nueva posición
        addHorseImage(currentRow, currentCol);
    } else {
        alert('Movimiento no válido');
    }
    }

 

    function getValidMoves(row, col) {
    const moves = [];

    // Movimientos posibles para un caballo en forma de L
    const possibleMoves = [
        { row: row - 2, col: col - 1 },
        { row: row - 2, col: col + 1 },
        { row: row - 1, col: col - 2 },
        { row: row - 1, col: col + 2 },
        { row: row + 1, col: col - 2 },
        { row: row + 1, col: col + 2 },
        { row: row + 2, col: col - 1 },
        { row: row + 2, col: col + 1 }
    ];

    // Verificar si cada movimiento es válido dentro del tablero
    possibleMoves.forEach(move => {
        if (isMoveWithinBoard(move.row, move.col)) {
        moves.push(move);
        }
    });

    return moves;
    }

    function isMoveWithinBoard(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    function clearSelection() {
    possibleMoves.forEach(move => {
        const cell = getCellElement(move.row, move.col);
        cell.classList.remove("possible-move");
    });

    selectedPiece = null;
    possibleMoves = [];
    }

    function movePiece(row, col) {
    const currentCell = getCellElement(currentRowHorse, currentColHorse);
    const targetCell = getCellElement(row, col);

    // Mover la imagen de la pieza a la nueva posición
    targetCell.appendChild(selectedPiece);
    selectedPiece = null;

    // Actualizar la posición actual de la pieza
    currentRowHorse = row;
    currentColHorse = col;
    }

    // Función para verificar si un movimiento es válido para el caballo
    function isMoveValid(row, col) {
    const rowDiff = Math.abs(row - currentRowHorse);
    const colDiff = Math.abs(col - currentColHorse);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    // Manejador de evento para el clic en una celda
    function handleCellClick(event) {
    const target = event.target;

    // Verificar si ya se ha seleccionado una pieza anteriormente
    if (selectedPiece) {
        const row = parseInt(target.dataset.row);
        const col = parseInt(target.dataset.col);

        // Verificar si la celda seleccionada es una de las posibles opciones de movimiento
        const isPossibleMove = possibleMoves.some(move => move.row === row && move.col === col);

        if (isPossibleMove) {
        // Mover la pieza a la posición seleccionada
        movePiece(row, col);

        // Limpiar la selección de la pieza y las celdas resaltadas
        clearSelection();
        } else {
            alert("Escoja una opcion valida")
        // Limpiar la selección de la pieza y las celdas resaltadas
        clearSelection();

        // Seleccionar la pieza si la celda contiene una imagen
        if (target.classList.contains('piece')) {
            selectedPiece = target;
            highlightPossibleMoves();
        }
        }
    } else {
        // Seleccionar la pieza si la celda contiene una imagen
        if (target.classList.contains('piece')) {
        selectedPiece = target;
        highlightPossibleMoves();
        }
    }
    }

    // Inicializar el tablero y agregar el evento de clic a las celdas
    createChessBoard();
    document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
    });

    // Agregar la imagen del caballo en la posición inicial (0, 0)
    // addHorseImage(currentRowHorse, currentColHorse);
    addItem('cel',currentRowHPawn, currentColPawn, "pawnImage", "./pawn.png",'peon')
    addItem('cell', currentRowHorse, currentColHorse, "horseImg", "./horse.png", 'piece')
    console.log(addItem)
    