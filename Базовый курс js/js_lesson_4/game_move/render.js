let renderer = {
    map: "",
    /**
     * Отображает игру в консоли.
     */
    render() {
    
        for (row = 0; row < config.rowscount; row++) {
            for (col = 0; col < config.colsCount; col++) { 
                if (player.y === row && player.x === col) {
                    this.map += 'o ';
                } else {
                    this.map += 'x ';
                }
            }
            this.map += '\n';
        }
        console.log(this.map);
    },

    clear() {
        // Чистим консоль.
        console.clear();
        //  Чистим карту.
        this.map = "";
    }
};