import homeView from './views/homeView.js'
import resultView from './views/resultView.js'
import { API } from './constants/index.js'
import { saveToLocalStorage, setStaticTextLanguage, saveToLocalStorageWithJson, getFromLocalStorage, checkUniqueLocalStorageValue, getFromLocalStorageWithJson } from './utils/index.js'


window.addEventListener('DOMContentLoaded', _ => {

    const menuButtons = document.querySelectorAll('.menu-button')
    const darkMode = document.getElementById('darkMode')
    const languageButtons = document.querySelectorAll('.language-item')
    let searchElement
    const app = document.getElementById('app')
    setStaticTextLanguage()
    renderPage(homeView)
    menuButtonsAction()
    setTheme()
    setLanguage()

    document.getElementById('favoriteWindow').addEventListener('click', _ => window.location.href = 'favorites.html')

    document.getElementById('returnHome').addEventListener('click', _ => {
        renderPage(homeView)
    })


    function menuButtonsAction() {
        menuButtons.forEach(menuButton => {
            menuButton.addEventListener('click', _ => {
                const toggle = menuButton.dataset.toggle;
                if (toggle) {
                    console.log(toggle);
                    const element = document.getElementById(toggle)
                    element.classList.toggle('active')
                }
            })
        })
    }

    function setLanguage() {
        languageButtons.forEach(languageButton => {
            languageButton.addEventListener('click', _ => {
                const language = languageButton.dataset.language
                languageButton.parentElement.parentElement.classList.remove('active')
                saveToLocalStorage('prefferedLanguage', language)
                setStaticTextLanguage()
            })
        })
    }

    function renderPage(view) {
        app.innerHTML = view.render()
        searchElement = document.querySelectorAll('.search')
        search()
    }

    function search() {
        searchElement.forEach(item => {
            const searchButton = item.querySelector('button')
            const searchTerm = item.querySelector('input')
            searchButton.addEventListener('click', _ => {
                fetch(`${API()}q=${searchTerm.value}`)
                    .then(response => response.json())
                    .then(data => {
                        saveToLocalStorageWithJson('log', {
                            time: Date.now(),
                            key: searchTerm.value,
                            type: 'search'
                        })
                        renderPage(resultView)
                        listSearchResults(data.pages)
                        document.querySelector('.search-result input').value = searchTerm.value
                    })
            })
        })
    }

    function listSearchResults(results) {
        const resultsElement = document.querySelector('.results')
        results.forEach(result => {
            const { key, title, thumbnail, description } = result
            const redirectUrl = `https://en.wikipedia.org/wiki/${key}`
            const div = document.createElement('div')
            const descriptionElement = document.createElement('div')

            const favorite = document.createElement('div')

            favorite.innerHTML = `<span class="material-icons">favorite</span>`

            if (!checkUniqueLocalStorageValue('favorites', 'key', key)) {
                favorite.classList.add('favorite')
            }

            favorite.addEventListener('click', _ => {
                if (checkUniqueLocalStorageValue('favorites', 'key', key)) {
                    saveToLocalStorageWithJson('favorites', {
                        key,
                        title,
                        thumbnail,
                        description
                    })
                    favorite.classList.add('favorite')
                } else {
                    const articles = getFromLocalStorageWithJson('favorites')
                    localStorage['favorites'] = JSON.stringify(articles.filter(article => article.key != key))
                    favorite.classList.remove('favorite')
                }
            })

            div.className = 'result'
            descriptionElement.className = 'description'


            if (thumbnail) {
                const image = document.createElement('img')
                image.addEventListener('click', _ => {
                    window.open(redirectUrl, '_blank')
                })
                image.src = thumbnail.url.replaceAll('//', 'https://')
                div.appendChild(image)
            }
            descriptionElement.innerHTML = `
                <a href="${redirectUrl}" target="_blank"><h3>${title}</h3></a>
                <a href="${redirectUrl}" target="_blank"><p>${description}</p></a>
            `
            descriptionElement.appendChild(favorite)
            div.appendChild(descriptionElement)
            resultsElement.appendChild(div)
        })
    }

    function setTheme() {
        darkMode.addEventListener('click', async _ => {
            const result = await window.myAPI.setDarkMode()
            console.log(result);
        })
    }

    if (getFromLocalStorage('searchTerm')) {
        const value = getFromLocalStorage('searchTerm')
        fetch(`${API()}q=${value}`)
            .then(response => response.json())
            .then(data => {
                renderPage(resultView)
                listSearchResults(data.pages)
                document.querySelector('.search-result input').value = value
            })
        delete localStorage['searchTerm']
    }



})