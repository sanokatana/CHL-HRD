import { createApp } from 'vue'
import App from '@/App.vue'
import store from './store'
import { registerPlugins } from '@core/utils/plugins'

// Styles
import '@core-scss/template/index.scss'
import '@layouts/styles/index.scss'

// Create vue app
const app = createApp(App)


// Register plugins
registerPlugins(app)

app.use(store)
// Mount vue app
app.mount('#app')
