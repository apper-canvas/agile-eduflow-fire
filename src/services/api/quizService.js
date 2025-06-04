import quizData from '../mockData/quizzes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let quizzes = [...quizData]

const quizService = {
  async getAll() {
    await delay(300)
    return [...quizzes]
  },

  async getById(id) {
    await delay(200)
    const quiz = quizzes.find(q => q.id === id)
    if (!quiz) {
      throw new Error('Quiz not found')
    }
    return { ...quiz }
  },

  async create(quizData) {
    await delay(400)
    const newQuiz = {
      ...quizData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    quizzes.push(newQuiz)
    return { ...newQuiz }
  },

  async update(id, updates) {
    await delay(350)
    const index = quizzes.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error('Quiz not found')
    }
    quizzes[index] = { ...quizzes[index], ...updates }
    return { ...quizzes[index] }
  },

  async delete(id) {
    await delay(250)
    const index = quizzes.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error('Quiz not found')
    }
    const deleted = quizzes.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default quizService