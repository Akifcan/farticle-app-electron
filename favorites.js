import { getFromLocalStorageWithJson } from './utils/index.js'

document.addEventListener('DOMContentLoaded', _ => {


    let result

    document.getElementById('back').addEventListener('click', _ => window.location.href = 'index.html')
    const favorites = document.getElementById('favorites')
    const trash = document.getElementById('trash')

    trash.addEventListener('drop', e => {
        e.preventDefault()
        const key = e.dataTransfer.getData("key")
        const removeKey = result.filter(favorite => favorite.key != key)
        localStorage['favorites'] = JSON.stringify(removeKey)
        listFavorites()
    })

    trash.addEventListener('dragover', e => {
        e.preventDefault()
    })




    listFavorites()

    function listFavorites() {
        favorites.innerHTML = ''
        result = getFromLocalStorageWithJson('favorites')
        result.forEach(favorite => {
            const div = document.createElement('div')
            const dragElement = document.createElement('img')
            dragElement.src = './images/icons/delete.png'

            dragElement.addEventListener('dragstart', e => {
                e.dataTransfer.setData("key", favorite.key)
            })

            div.className = 'favorite-item'

            const title = document.createElement('h2')
            title.textContent = favorite.title

            const button = document.createElement('button')
            button.innerHTML = `<span class="material-icons">book</span>Oku`
            button.addEventListener('click', _ => {
                window.open(`https://en.wikipedia.org/wiki/${favorite.key}`, '_blank')
            })




            div.appendChild(title)
            div.appendChild(button)
            div.appendChild(dragElement)
            favorites.appendChild(div)
        })
    }

})