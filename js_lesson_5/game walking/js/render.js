let render = {

    renderBoard() {
        let result = this.generateBoard();
        document.body.insertAdjacentElement('afterbegin', result);
        this.renderUserPoint(player);
    },

    generateBoard() {

        let table = document.querySelector('table');
        console.dir(table);
        
        for (let row = 0; row < 10; row++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);
            for (let col = 0; col < 10; col++) {
                let td = document.createElement('td');
                td.classList.add('cell');
                td.setAttribute('data-x', `${row}`);
                td.setAttribute('data-y', `${col}`);
                tr.appendChild(td);
            }
            console.log('\n');
        }
        return table;
    },

    setUserCell(position) {
        return document.querySelector(`[data-x="${position.x}"][data-y="${position.y}"]`);

    }, 

    renderUserPoint(position) {
        let userCell = this.setUserCell(position);
        userCell.classList.add('redCell');

    }

}