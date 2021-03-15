import { getFromLocalStorageWithJson, saveToLocalStorage, saveToLocalStorageWithJson } from './utils/index.js'

window.addEventListener('DOMContentLoaded', _ => {

    document.getElementById('back').addEventListener('click', _ => window.location.href = 'index.html')

    const logItems = document.getElementById('logItems')
    document.querySelectorAll('.remove-log-item').forEach(removeButton => {
        removeButton.addEventListener('click', _ => {
            const type = removeButton.dataset.time
            const date = new Date()
            const logs = getFromLocalStorageWithJson('log')

            switch (type) {
                case 'last1Hour':
                    const dayResult = logs.filter(log => log.time < date.setHours(date.getHours() - 1))
                    localStorage['log'] = JSON.stringify(dayResult)
                    break;
                case 'lastHour':
                    const lastHour = logs.filter(log => log.time < date.setHours(date.getHours() - 5))
                    localStorage['log'] = JSON.stringify(lastHour)
                    break;
                case 'last1Day':
                    const lastDay = logs.filter(log => log.time < date.setDate(date.getDate() - 1))
                    localStorage['log'] = JSON.stringify(lastDay)
                    break;
                case 'last1Year':
                    const lastYear = logs.filter(log => log.time < date.getFullYear(date.getFullYear() - 1))
                    localStorage['log'] = JSON.stringify(lastYear)
                    break;

                case 'all':
                    localStorage['log'] = JSON.stringify([])
                    break;
            }
            listLogs()
        })
    })

    listLogs()

    function listLogs() {
        const logs = getFromLocalStorageWithJson('log')
        logItems.innerHTML = ''
        if (logs.length > 0) {
            logs.forEach(log => {
                const date = new Date(log.time)
                const div = document.createElement('div')
                div.className = 'log-item'

                div.innerHTML = `
                    <b>${log.key}</b>
                    <p>${date.toLocaleDateString()} - ${date.toLocaleTimeString()} </p>
            `
                const button = document.createElement('button')
                button.innerHTML = `<span class='material-icons'>arrow_right_alt</span>`

                button.addEventListener('click', _ => {
                    if (log.type == 'search') {
                        saveToLocalStorage('searchTerm', log.key)
                        window.location.href = 'index.html'
                    }
                })

                div.appendChild(button)

                logItems.appendChild(div)

            })
        }

    }

})