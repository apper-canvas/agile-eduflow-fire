import progressData from '../mockData/progress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let progress = [...progressData]

const progressService = {
  async getAll() {
    await delay(300)
    return [...progress]
  },

  async getById(id) {
    await delay(200)
    const progressItem = progress.find(p => p.id === id)
    if (!progressItem) {
      throw new Error('Progress record not found')
    }
    return { ...progressItem }
  },

  async create(progressData) {
    await delay(400)
    const newProgress = {
      ...progressData,
      id: Date.now().toString(),
      lastActivityDate: new Date().toISOString()
    }
    progress.push(newProgress)
    return { ...newProgress }
  },

  async update(id, updates) {
    await delay(350)
    const index = progress.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Progress record not found')
    }
    progress[index] = { ...progress[index], ...updates }
    return { ...progress[index] }
  },

  async delete(id) {
    await delay(250)
    const index = progress.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Progress record not found')
    }
    const deleted = progress.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default progressService