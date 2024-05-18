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
  Alpine.data('search', () => ({
    search: '',
    show_item(el) {
      return this.search === '' || el.textContent.includes(this.search)
    },
  }))
  Alpine.data('jobFilter', () => ({
    searchQuery: {
      keywords: '',
      place: '',
      category: '',
    },
    filters: {
      freelance: false,
      fullTime: false,
      internship: false,
      partTime: false,
    },
    jobs: [
      {
        id: 1,
        title: 'Web Developer',
        type: 'Freelance',
        place: 'Remote',
        category: 'IT',
      },
      {
        id: 2,
        title: 'Software Engineer',
        type: 'Full-time',
        place: 'New York',
        category: 'IT',
      },
      {
        id: 3,
        title: 'Project Manager',
        type: 'Part-time',
        place: 'San Francisco',
        category: 'Management',
      },
      {
        id: 4,
        title: 'Intern',
        type: 'Internship',
        place: 'Los Angeles',
        category: 'IT',
      },
      {
        id: 5,
        title: 'Graphic Designer',
        type: 'Freelance',
        place: 'Remote',
        category: 'Design',
      },
      {
        id: 6,
        title: 'Data Scientist',
        type: 'Full-time',
        place: 'Chicago',
        category: 'Data',
      },
    ],
    get filteredJobs() {
      return this.jobs.filter(job => {
        const keywordMatch = (job.title + job.place + job.category + job.type)
          .toLowerCase()
          .includes(this.searchQuery.keywords.toLowerCase())
        const placeMatch = job.place
          .toLowerCase()
          .includes(this.searchQuery.place.toLowerCase())
        const categoryMatch = job.category
          .toLowerCase()
          .includes(this.searchQuery.category.toLowerCase())
        const typeMatch =
          (this.filters.freelance && job.type === 'Freelance') ||
          (this.filters.fullTime && job.type === 'Full-time') ||
          (this.filters.internship && job.type === 'Internship') ||
          (this.filters.partTime && job.type === 'Part-time') ||
          (!this.filters.freelance &&
            !this.filters.fullTime &&
            !this.filters.internship &&
            !this.filters.partTime)

        return keywordMatch && placeMatch && categoryMatch && typeMatch
      })
    },
  }))
})
