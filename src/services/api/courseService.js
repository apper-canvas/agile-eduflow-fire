import courseData from '../mockData/courses.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let courses = [...courseData]

const courseService = {
  async getAll() {
    await delay(300)
    return [...courses]
  },

  async getById(id) {
    await delay(200)
    const course = courses.find(c => c.id === id)
    if (!course) {
      throw new Error('Course not found')
    }
    return { ...course }
  },

  async create(courseData) {
    await delay(400)
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    courses.push(newCourse)
    return { ...newCourse }
  },

  async update(id, updates) {
    await delay(350)
    const index = courses.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error('Course not found')
    }
    courses[index] = { ...courses[index], ...updates }
    return { ...courses[index] }
  },

  async delete(id) {
    await delay(250)
    const index = courses.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error('Course not found')
    }
    const deleted = courses.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default courseService