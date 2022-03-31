const player = {
    x: 0,
    y: 0,

    /**
     * Двигает игрока по переданному направлению.
     * @param {x: int, y: int} nextPoint Следубщая точка пользователя.
     */

    move(nextPoint) {
        if (nextPoint.x >= 0 && nextPoint.x < 10 && nextPoint.y >= 0 && nextPoint.y < 10){
            this.x = nextPoint.x;
            this.y = nextPoint.y;
        } else {
            return;
        }

        
    }
}