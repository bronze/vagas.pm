import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import focus from '@alpinejs/focus'
import ui from '@alpinejs/ui'

window.Alpine = Alpine

Alpine.plugin(collapse)
Alpine.plugin(focus)
Alpine.plugin(ui)

document.addEventListener('alpine:init', () => {
  Alpine.data('categorias', () => ({}))
  Alpine.data('jobFilter_backup', () => ({
    searchQuery: {
      keywords: '',
      location: '',
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
        uid: 1,
        title: 'Web Developer',
        role: 'Freelance',
        location: 'Remote',
        category: 'IT',
      },
      {
        uid: 2,
        title: 'Software Engineer',
        role: 'Full-time',
        location: 'New York',
        category: 'IT',
      },
      {
        uid: 3,
        title: 'Project Manager',
        role: 'Part-time',
        location: 'San Francisco',
        category: 'Management',
      },
      {
        uid: 4,
        title: 'Intern',
        role: 'Internship',
        location: 'Los Angeles',
        category: 'IT',
      },
      {
        uid: 5,
        title: 'Graphic Designer',
        role: 'Freelance',
        location: 'Remote',
        category: 'Design',
      },
      {
        uid: 6,
        title: 'Data Scientist',
        role: 'Full-time',
        location: 'Chicago',
        category: 'Data',
      },
    ],

    get filteredJobs() {
      return this.jobs.filter(job => {
        const keywordMatch = (
          job.title +
          job.location +
          job.category +
          job.role
        )
          .toLowerCase()
          .includes(this.searchQuery.keywords.toLowerCase())
        const placeMatch = job.location
          .toLowerCase()
          .includes(this.searchQuery.location.toLowerCase())
        const categoryMatch = job.category
          .toLowerCase()
          .includes(this.searchQuery.category.toLowerCase())
        const typeMatch =
          (this.filters.freelance && job.role === 'Freelance') ||
          (this.filters.fullTime && job.role === 'Full-time') ||
          (this.filters.internship && job.role === 'Internship') ||
          (this.filters.partTime && job.role === 'Part-time') ||
          (!this.filters.freelance &&
            !this.filters.fullTime &&
            !this.filters.internship &&
            !this.filters.partTime)

        return keywordMatch && placeMatch && categoryMatch && typeMatch
      })
    },
    async fetchJobs() {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbzJaWR9GG_sLn1dkbgum3AeM1LmLS1Nktkrn8K0pFrlkip0mPn9JRdQQcvrbF-IL-Do/exec',
        )
        const jsonData = await response.json()
        this.jobs = jsonData.data // Assuming `data` is the array containing job objects
        console.log('Fetched jobs:', this.jobs) // Log fetched jobs
        // console.log(this.jobs[0].location)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    },
    init() {
      this.fetchJobs()
    },
  }))
  Alpine.data('jobFilter2', () => ({
    searchQuery: {
      keywords: '',
      location: '',
      category: '',
    },
    filters: {
      freelance: false,
      fullTime: false,
      internship: false,
      partTime: false,
    },
    query: '',
    selected: null,
    frameworks: [
      {
        id: 1,
        name: 'Design',
        disabled: false,
      },
      {
        id: 2,
        name: 'Product Management',
        disabled: false,
      },
      {
        id: 3,
        name: 'Programação Front-end',
        disabled: false,
      },
      {
        id: 4,
        name: 'Programação Back-end',
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
    jobs: [],
    get filteredJobs() {
      if (!Array.isArray(this.jobs)) {
        console.error('Jobs data is not an array:', this.jobs)
        return []
      }

      return this.jobs.filter(job => {
        const keywordMatch = (job.job + job.location + job.category + job.role)
          .toLowerCase()
          .includes(this.searchQuery.keywords.toLowerCase())
        const placeMatch = job.location
          .toLowerCase()
          .includes(this.searchQuery.location.toLowerCase())
        const categoryMatch = job.category
          .toLowerCase()
          .includes(this.searchQuery.category.toLowerCase())
        const typeMatch =
          (this.filters.freelance &&
            job.role.toLowerCase().includes('freelance')) ||
          (this.filters.fullTime &&
            job.role.toLowerCase().includes('tempo integral')) ||
          (this.filters.internship &&
            job.role.toLowerCase().includes('estágio')) ||
          (this.filters.partTime &&
            job.role.toLowerCase().includes('meio expediente')) ||
          (!this.filters.freelance &&
            !this.filters.fullTime &&
            !this.filters.internship &&
            !this.filters.partTime)

        return keywordMatch && placeMatch && categoryMatch && typeMatch
      })
    },
    init() {
      this.jobs = JSON.parse(this.$el.getAttribute('data-jobs')) // Access jobs data passed from Astro.js
      console.log(this.jobs)
    },
    selectFramework(framework) {
      this.selected = framework
      this.searchQuery.category = framework.name
      this.filterJobs()
    },
    filterJobs() {
      // The filter function will automatically run due to reactivity in Alpine.js
    },
  }))
})
