import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { courseService, quizService, studentService, progressService } from '../services'
import { 
  BookOpen, Users, TrendingUp, Award, Plus, Search, Filter, 
  Edit, Trash2, Eye, BarChart3, Calendar, Clock, User,
  GraduationCap, Sun, Moon, X, Check, AlertTriangle,
  Layers, ClipboardCheck, Smartphone, Twitter, Facebook,
  Linkedin, Youtube, ChevronRight, PlayCircle, Star,
  Target, Activity, FileText, Settings
} from 'lucide-react'

const HomePage = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('dashboard')
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  // Form States
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', category: '', level: '', duration: ''
  })
  const [quizForm, setQuizForm] = useState({
    title: '', courseId: '', questions: [], timeLimit: 30
  })
  const [studentForm, setStudentForm] = useState({
    name: '', email: '', enrolledCourses: []
  })

  // Load Data
  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [coursesData, studentsData, quizzesData, progressData] = await Promise.all([
        courseService.getAll(),
        studentService.getAll(),
        quizService.getAll(),
        progressService.getAll()
      ])
      setCourses(coursesData)
      setStudents(studentsData)
      setQuizzes(quizzesData)
      setProgress(progressData)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Modal Management
  const openModal = (type, item = null) => {
    setModalType(type)
    setSelectedItem(item)
    setShowModal(true)
    
    if (item) {
      if (type === 'course') setCourseForm(item)
      if (type === 'quiz') setQuizForm(item)
      if (type === 'student') setStudentForm(item)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setCourseForm({ title: '', description: '', category: '', level: '', duration: '' })
    setQuizForm({ title: '', courseId: '', questions: [], timeLimit: 30 })
    setStudentForm({ name: '', email: '', enrolledCourses: [] })
  }

  // CRUD Operations
  const handleSaveCourse = async () => {
    try {
      if (selectedItem) {
        await courseService.update(selectedItem.id, courseForm)
        toast.success('Course updated successfully!')
      } else {
        await courseService.create({ ...courseForm, id: Date.now() })
        toast.success('Course created successfully!')
      }
      loadAllData()
      closeModal()
    } catch (error) {
      toast.error('Failed to save course')
    }
  }

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.delete(id)
        toast.success('Course deleted successfully!')
        loadAllData()
      } catch (error) {
        toast.error('Failed to delete course')
      }
    }
  }

  const handleSaveQuiz = async () => {
    try {
      if (selectedItem) {
        await quizService.update(selectedItem.id, quizForm)
        toast.success('Quiz updated successfully!')
      } else {
        await quizService.create({ ...quizForm, id: Date.now() })
        toast.success('Quiz created successfully!')
      }
      loadAllData()
      closeModal()
    } catch (error) {
      toast.error('Failed to save quiz')
    }
  }

  const handleDeleteQuiz = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await quizService.delete(id)
        toast.success('Quiz deleted successfully!')
        loadAllData()
      } catch (error) {
        toast.error('Failed to delete quiz')
      }
    }
  }

  const handleSaveStudent = async () => {
    try {
      if (selectedItem) {
        await studentService.update(selectedItem.id, studentForm)
        toast.success('Student updated successfully!')
      } else {
        await studentService.create({ ...studentForm, id: Date.now() })
        toast.success('Student added successfully!')
      }
      loadAllData()
      closeModal()
    } catch (error) {
      toast.error('Failed to save student')
    }
  }

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      try {
        await studentService.delete(id)
        toast.success('Student removed successfully!')
        loadAllData()
      } catch (error) {
        toast.error('Failed to remove student')
      }
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  // Filtering
  const getFilteredData = (data, type) => {
    return data.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter || item.level === selectedFilter
      return matchesSearch && matchesFilter
    })
  }

  // Statistics
  const stats = [
    { 
      label: 'Active Courses', 
      value: courses.length, 
      icon: BookOpen, 
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    { 
      label: 'Total Students', 
      value: students.length, 
      icon: Users, 
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
    { 
      label: 'Completion Rate', 
      value: '94%', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-purple-600',
      change: '+2%'
    },
    { 
      label: 'Quiz Success', 
      value: '87%', 
      icon: Award, 
      color: 'from-orange-500 to-orange-600',
      change: '+5%'
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">EduFlow</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {['dashboard', 'courses', 'quizzes', 'students', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize transition-colors ${
                    activeTab === tab 
                      ? 'text-primary font-semibold' 
                      : 'text-surface-600 hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-4">
                Learning Management Dashboard
              </h1>
              <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                Manage courses, track student progress, and analyze learning outcomes with our comprehensive platform.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
                    {loading ? '...' : stat.value}
                  </div>
                  <div className="text-surface-600 dark:text-surface-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => openModal('course')}
                className="bg-gradient-to-r from-primary to-primary-light text-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300"
              >
                <Plus className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create Course</h3>
                <p className="text-primary-light">Add new educational content</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => openModal('quiz')}
                className="bg-gradient-to-r from-secondary to-secondary-light text-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300"
              >
                <ClipboardCheck className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create Quiz</h3>
                <p className="text-secondary-light">Design assessments</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => openModal('student')}
                className="bg-gradient-to-r from-accent to-orange-500 text-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300"
              >
                <User className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Add Student</h3>
                <p className="text-orange-200">Enroll new learners</p>
              </motion.button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New course created', item: 'Advanced React Development', time: '2 hours ago', icon: BookOpen },
                  { action: 'Quiz completed', item: 'JavaScript Fundamentals Quiz', time: '4 hours ago', icon: Award },
                  { action: 'Student enrolled', item: 'Sarah Johnson joined Web Development', time: '6 hours ago', icon: Users },
                  { action: 'Progress updated', item: 'Mobile App Development - 85% complete', time: '1 day ago', icon: TrendingUp }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                    <div className="w-10 h-10 bg-surface-100 dark:bg-surface-700 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-surface-900 dark:text-white font-medium">{activity.action}</p>
                      <p className="text-surface-600 dark:text-surface-400 text-sm">{activity.item}</p>
                    </div>
                    <span className="text-surface-500 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white">Courses</h2>
                <p className="text-surface-600 dark:text-surface-300">Manage your educational content</p>
              </div>
              <button
                onClick={() => openModal('course')}
                className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Course</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-800 text-surface-900 dark:text-white"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-800 text-surface-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredData(courses, 'course').map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('course', course)}
                        className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded text-surface-600 dark:text-surface-400">
                      {course.category}
                    </span>
                    <span className="text-surface-500">{course.enrolledStudents?.length || 0} students</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white">Quizzes</h2>
                <p className="text-surface-600 dark:text-surface-300">Create and manage assessments</p>
              </div>
              <button
                onClick={() => openModal('quiz')}
                className="flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Quiz</span>
              </button>
            </div>

            {/* Quizzes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  layout
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center">
                      <ClipboardCheck className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('quiz', quiz)}
                        className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{quiz.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Questions:</span>
                      <span className="text-surface-900 dark:text-white">{quiz.questions?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Time Limit:</span>
                      <span className="text-surface-900 dark:text-white">{quiz.timeLimit} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Attempts:</span>
                      <span className="text-surface-900 dark:text-white">{quiz.attempts || 0}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white">Students</h2>
                <p className="text-surface-600 dark:text-surface-300">Manage student enrollment and progress</p>
              </div>
              <button
                onClick={() => openModal('student')}
                className="flex items-center space-x-2 bg-accent hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Student</span>
              </button>
            </div>

            {/* Students Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <motion.div
                  key={student.id}
                  layout
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('student', student)}
                        className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{student.name}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">{student.email}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Enrolled Courses:</span>
                      <span className="text-surface-900 dark:text-white">{student.enrolledCourses?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Progress:</span>
                      <span className="text-surface-900 dark:text-white">{student.overallProgress || 0}%</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-surface-100 dark:bg-surface-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-accent to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.overallProgress || 0}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">Analytics Dashboard</h2>
              <p className="text-surface-600 dark:text-surface-300">Track performance and engagement metrics</p>
            </div>

            {/* Analytics Cards */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Course Completion Rates</h3>
                <div className="space-y-4">
                  {courses.slice(0, 5).map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <span className="text-surface-600 dark:text-surface-400">{course.title}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-surface-100 dark:bg-surface-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-surface-900 dark:text-white">
                          {Math.floor(Math.random() * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Student Engagement</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">Daily Active Users</span>
                    <span className="text-2xl font-bold text-surface-900 dark:text-white">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">Avg. Session Duration</span>
                    <span className="text-2xl font-bold text-surface-900 dark:text-white">45m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">Quiz Completion Rate</span>
                    <span className="text-2xl font-bold text-surface-900 dark:text-white">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-400">Course Enrollment</span>
                    <span className="text-2xl font-bold text-surface-900 dark:text-white">+12%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Top Performing Course', value: 'React Development', metric: '98% completion', icon: Star },
                { title: 'Most Active Student', value: 'Sarah Johnson', metric: '15 courses completed', icon: User },
                { title: 'Average Score', value: '85%', metric: 'Across all quizzes', icon: Target }
              ].map((metric, index) => (
                <div key={index} className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">{metric.title}</h3>
                  </div>
                  <p className="text-xl font-bold text-surface-900 dark:text-white mb-1">{metric.value}</p>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">{metric.metric}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
                  {selectedItem ? 'Edit' : 'Create'} {modalType}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalType === 'course' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white h-24"
                  />
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSaveCourse}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition-colors"
                    >
                      {selectedItem ? 'Update' : 'Create'} Course
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'quiz' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Quiz Title"
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({...quizForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  />
                  <select
                    value={quizForm.courseId}
                    onChange={(e) => setQuizForm({...quizForm, courseId: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Time Limit (minutes)"
                    value={quizForm.timeLimit}
                    onChange={(e) => setQuizForm({...quizForm, timeLimit: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  />
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSaveQuiz}
                      className="flex-1 bg-secondary hover:bg-secondary-dark text-white py-2 rounded-lg transition-colors"
                    >
                      {selectedItem ? 'Update' : 'Create'} Quiz
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'student' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  />
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSaveStudent}
                      className="flex-1 bg-accent hover:bg-orange-600 text-white py-2 rounded-lg transition-colors"
                    >
                      {selectedItem ? 'Update' : 'Add'} Student
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage