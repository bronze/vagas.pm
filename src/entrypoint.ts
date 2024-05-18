import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import focus from '@alpinejs/focus'
import ui from '@alpinejs/ui'

window.Alpine = Alpine

Alpine.plugin(collapse)
Alpine.plugin(focus)
Alpine.plugin(ui)

document.addEventListener('alpine:init', () => {
  Alpine.data('categorias', () => ({
    query: '',
    selected: null,
    frameworks: [
      {
        id: 1,
        name: 'Designer',
        disabled: false,
      },
      {
        id: 2,
        name: 'Product Manager',
        disabled: false,
      },
      {
        id: 3,
        name: 'Programador Front-end',
        disabled: false,
      },
      {
        id: 4,
        name: 'Programador Back-end',
        disabled: false,
      },
      {
        id: 5,
        name: 'Redator',
        disabled: false,
      },
      {
        id: 6,
        name: 'Marketing',
        disabled: false,
      },
    ],
    get filteredFrameworks() {
      return this.query === ''
        ? this.frameworks
        : this.frameworks.filter(framework => {
            return framework.name
              .toLowerCase()
              .includes(this.query.toLowerCase())
          })
    },
  }))
})
