import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'



const i18n = createI18n({
    locale: 'fr', // set locale
    fallbackLocale: 'en', // set fallback locale
    allowComposition: true, // you need to specify that!
    messages: {
        en: {
            hello: 'Hello bilingual world!'
        },
        fr: {
            hello: 'Bonjour, le monde！'
        }
    }

})
console.log(i18n.allowComposition) // output is true



const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
