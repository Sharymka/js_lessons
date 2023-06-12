let mover = {
    /**
     * Получает и отдает направление от пользователя.
     * @param {int} Возвращает направдение, введенное пользлвателем.
     *  */   
     getDirection() {
        const availableDirections = [1, 2, 3, 4, 6,7, 8, 9];
        while(true) {
            let direction = parseInt(prompt('Введите число (1, 2, 3, 4, 6, 7, 8  или 9), куда хотите переместится,'));
            if (isNaN(direction)) {
                return null;
            }

            if(!availableDirections.includes(direction)) {
                alert('Для перемещения необходимо ввести одно из чисел 1, 2, 3, 4, 6, 7, 8  или 9');
                continue;
            }
            return direction;
        }
    },

    /**
     * Отдает следующую точку в которой будет находится пользователь после движения.
     * @param {int} direction Направление движения игрока.
     * @return {{x: int, y: int}} Следующая позиция игрока.
     */
    getNextPosition(direction) {
        const nextPosition = {
            x: player.x,
            y: player.y
        };
        switch(direction) {
            case 1:
                nextPosition.x--;
                nextPosition.y++;
                break;
            case 2:
                nextPosition.y++;
                break;
            case 3:
                nextPosition.x++;
                nextPosition.y++;
                break;    
            case 4:
                nextPosition.x--;
                break;
            case 6:
                nextPosition.x++;
                break;
            case 7:
                nextPosition.x--;
                nextPosition.y--;
                break; 
            case 8:
                nextPosition.y--;
                break;
            case 9:
                nextPosition.x++;
                nextPosition.y--;
                break;     
        }
        return nextPosition;
    }
};