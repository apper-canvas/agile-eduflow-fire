import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { courseService, quizService, studentService, progressService } from '../services'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [courses, setCourses] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [students, setStudents] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    modules: []
  })
  
  // Quiz form state
  const [quizForm, setQuizForm] = useState({
    title: '',
    courseId: '',
    timeLimit: 30,
    passingScore: 70,
    questions: []
  })

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: 0
  })

  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showQuizForm, setShowQuizForm] = useState(false)

  // Load data based on active tab
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        switch (activeTab) {
          case 'courses':
            const coursesData = await courseService.getAll()
            setCourses(coursesData || [])
            break
          case 'quizzes':
            const [quizzesData, coursesData2] = await Promise.all([
              quizService.getAll(),
              courseService.getAll()
            ])
            setQuizzes(quizzesData || [])
            setCourses(coursesData2 || [])
            break
          case 'students':
            const studentsData = await studentService.getAll()
            setStudents(studentsData || [])
            break
          case 'analytics':
            const [progressData, studentsData2, coursesData3] = await Promise.all([
              progressService.getAll(),
              studentService.getAll(),
              courseService.getAll()
            ])
            setProgress(progressData || [])
            setStudents(studentsData2 || [])
            setCourses(coursesData3 || [])
            break
          default:
            break
        }
      } catch (err) {
        setError(err.message)
        toast.error(`Failed to load ${activeTab}: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [activeTab])

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const newCourse = await courseService.create({
        ...courseForm,
        enrolledStudents: [],
        createdBy: 'admin',
        createdAt: new Date().toISOString()
      })
      setCourses(prev => [...(prev || []), newCourse])
      setCourseForm({ title: '', description: '', modules: [] })
      setShowCourseForm(false)
      toast.success('Course created successfully!')
    } catch (err) {
      toast.error('Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateQuiz = async (e) => {
    e.preventDefault()
    if (!quizForm.title.trim() || !quizForm.courseId || quizForm.questions.length === 0) {
      toast.error('Please fill in all required fields and add at least one question')
      return
    }

    setLoading(true)
    try {
      const newQuiz = await quizService.create(quizForm)
      setQuizzes(prev => [...(prev || []), newQuiz])
      setQuizForm({
        title: '',
        courseId: '',
        timeLimit: 30,
        passingScore: 70,
        questions: []
      })
      setShowQuizForm(false)
      toast.success('Quiz created successfully!')
    } catch (err) {
      toast.error('Failed to create quiz')
    } finally {
      setLoading(false)
    }
  }

  const addQuestion = () => {
    if (!newQuestion.question.trim()) {
      toast.error('Please enter a question')
      return
    }

    const question = {
      ...newQuestion,
      id: Date.now(),
      options: newQuestion.type === 'multiple-choice' ? newQuestion.options.filter(opt => opt.trim()) : []
    }

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, question]
    }))

    setNewQuestion({
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0
    })

    toast.success('Question added!')
  }

  const removeQuestion = (questionId) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }))
    toast.success('Question removed!')
  }

  const tabs = [
    { id: 'courses', label: 'Courses', icon: 'BookOpen' },
    { id: 'quizzes', label: 'Quizzes', icon: 'ClipboardCheck' },
    { id: 'students', label: 'Students', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ]

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-3 text-surface-600 dark:text-surface-400">Loading...</span>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )
    }

    switch (activeTab) {
      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Course Management</h3>
              <button
                onClick={() => setShowCourseForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Create Course</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses?.length > 0 ? courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ApperIcon name="BookOpen" className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      {course.enrolledStudents?.length || 0} students
                    </span>
                  </div>
                  <h4 className="font-semibold text-surface-900 dark:text-white mb-2">{course.title}</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-surface-500">{course.modules?.length || 0} modules</span>
                    <button className="text-primary hover:text-primary-dark transition-colors">
                      <ApperIcon name="ExternalLink" className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <ApperIcon name="BookOpen" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-400">No courses found. Create your first course!</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'quizzes':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Quiz Management</h3>
              <button
                onClick={() => setShowQuizForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary to-secondary-light text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Create Quiz</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes?.length > 0 ? quizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ApperIcon name="ClipboardCheck" className="w-6 h-6 text-secondary" />
                    </div>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      {quiz.timeLimit}min
                    </span>
                  </div>
                  <h4 className="font-semibold text-surface-900 dark:text-white mb-2">{quiz.title}</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
                    {quiz.questions?.length || 0} questions • {quiz.passingScore}% to pass
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-surface-500">
                      Course: {courses?.find(c => c.id === quiz.courseId)?.title || 'Unknown'}
                    </span>
                    <button className="text-secondary hover:text-secondary-dark transition-colors">
                      <ApperIcon name="ExternalLink" className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <ApperIcon name="ClipboardCheck" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-400">No quizzes found. Create your first quiz!</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'students':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Student Management</h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students?.length > 0 ? students.map((student) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 dark:text-white">{student.name}</h4>
                      <p className="text-surface-500 dark:text-surface-400 text-sm">{student.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-600 dark:text-surface-400">Enrolled Courses:</span>
                      <span className="font-medium text-surface-900 dark:text-white">{student.enrolledCourses?.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-600 dark:text-surface-400">Completed Modules:</span>
                      <span className="font-medium text-surface-900 dark:text-white">{Object.keys(student.completedModules || {}).length}</span>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <ApperIcon name="Users" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-400">No students enrolled yet.</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Progress Analytics</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Students', value: students?.length || 0, icon: 'Users', color: 'text-primary' },
                { label: 'Active Courses', value: courses?.length || 0, icon: 'BookOpen', color: 'text-secondary' },
                { label: 'Avg. Completion', value: '78%', icon: 'TrendingUp', color: 'text-accent' },
                { label: 'Quiz Success Rate', value: '85%', icon: 'Award', color: 'text-green-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <ApperIcon name={stat.icon} className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-surface-600 dark:text-surface-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {progress?.length > 0 ? progress.slice(0, 6).map((progressItem) => {
                const student = students?.find(s => s.id === progressItem.studentId)
                const course = courses?.find(c => c.id === progressItem.courseId)
                
                return (
                  <motion.div
                    key={`${progressItem.studentId}-${progressItem.courseId}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-surface-900 dark:text-white">{student?.name || 'Unknown Student'}</h4>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">{course?.title || 'Unknown Course'}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{progressItem.completionPercentage || 0}%</span>
                    </div>
                    <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressItem.completionPercentage || 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400">
                      <span>Quiz Results: {progressItem.quizResults?.length || 0}</span>
                      <span>Last Active: {progressItem.lastActivityDate ? new Date(progressItem.lastActivityDate).toLocaleDateString() : 'Never'}</span>
                    </div>
                  </motion.div>
                )
              }) : (
                <div className="col-span-full text-center py-12">
                  <ApperIcon name="BarChart3" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-400">No progress data available yet.</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-surface-200 dark:border-surface-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Course Form Modal */}
      <AnimatePresence>
        {showCourseForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCourseForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Create New Course</h3>
                <button
                  onClick={() => setShowCourseForm(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Enter course description"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCourseForm(false)}
                    className="flex-1 px-4 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Creating...' : 'Create Course'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Form Modal */}
      <AnimatePresence>
        {showQuizForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuizForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Create New Quiz</h3>
                <button
                  onClick={() => setShowQuizForm(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateQuiz} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Quiz Title *
                    </label>
                    <input
                      type="text"
                      value={quizForm.title}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      placeholder="Enter quiz title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Course *
                    </label>
                    <select
                      value={quizForm.courseId}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, courseId: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select a course</option>
                      {courses?.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      value={quizForm.timeLimit}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      min="1"
                      max="180"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Passing Score (%)
                    </label>
                    <input
                      type="number"
                      value={quizForm.passingScore}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Questions Section */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                    Questions ({quizForm.questions.length})
                  </h4>

                  {/* Add Question Form */}
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4 mb-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Question
                        </label>
                        <input
                          type="text"
                          value={newQuestion.question}
                          onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                          className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="Enter your question"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Question Type
                          </label>
                          <select
                            value={newQuestion.type}
                            onChange={(e) => setNewQuestion(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                            <option value="short-answer">Short Answer</option>
                          </select>
                        </div>

                        {newQuestion.type === 'multiple-choice' && (
                          <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                              Correct Answer
                            </label>
                            <select
                              value={newQuestion.correctAnswer}
                              onChange={(e) => setNewQuestion(prev => ({ ...prev, correctAnswer: parseInt(e.target.value) }))}
                              className="w-full px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                            >
                              {newQuestion.options.map((_, index) => (
                                <option key={index} value={index}>Option {index + 1}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      {newQuestion.type === 'multiple-choice' && (
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Answer Options
                          </label>
                          <div className="grid md:grid-cols-2 gap-2">
                            {newQuestion.options.map((option, index) => (
                              <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...newQuestion.options]
                                  newOptions[index] = e.target.value
                                  setNewQuestion(prev => ({ ...prev, options: newOptions }))
                                }}
                                className="px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-sm"
                                placeholder={`Option ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={addQuestion}
                        className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
                      >
                        <ApperIcon name="Plus" className="w-4 h-4" />
                        <span>Add Question</span>
                      </button>
                    </div>
                  </div>

                  {/* Questions List */}
                  {quizForm.questions.length > 0 && (
                    <div className="space-y-3">
                      {quizForm.questions.map((question, index) => (
                        <div key={question.id} className="bg-white dark:bg-surface-700 rounded-lg p-4 border border-surface-200 dark:border-surface-600">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-surface-900 dark:text-white mb-2">
                                {index + 1}. {question.question}
                              </p>
                              <p className="text-sm text-surface-600 dark:text-surface-400">
                                Type: {question.type.replace('-', ' ')}
                                {question.type === 'multiple-choice' && ` • ${question.options.length} options`}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeQuestion(question.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 pt-4 border-t border-surface-200 dark:border-surface-700">
                  <button
                    type="button"
                    onClick={() => setShowQuizForm(false)}
                    className="flex-1 px-4 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || quizForm.questions.length === 0}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-secondary to-secondary-light text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Creating...' : 'Create Quiz'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature