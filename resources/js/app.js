require('./bootstrap');

require('alpinejs');

import { createApp } from "vue";
import router from './router'

import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS

createApp({}).use(SimpleTypeahead).use(router).mount('#app')
