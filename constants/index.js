import { getFromLocalStorage } from '../utils/index.js'

export const API = () => {
    const language = getFromLocalStorage('prefferedLanguage')
    return `https://${language}.wikipedia.org/w/rest.php/v1/search/page?limit=20&`
}