import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, Heading, useColorModeValue } from '@chakra-ui/react'
import {} from 'react-icons/fa'
import { useUserContext } from '../../contexts/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import UserMenu from './UserMenu'
import {
  StatisticsCard,
  StudentTabs,
  TwoColumnLayout,
} from '../dashboard/index'
import WelcomeCard from '../../components/common/WelcomeCard'
import SearchForm from '../../components/common/SearchForm'
import DataTable from '../../components/common/DataTable'
import PerformanceCard from '../../components/common/PerformanceCard'
import LeaderBoard from '../../components/common/LeaderBoard'
import performanceData from '../../data/StudentPerformanceData'
import assignmentData from '../../data/assignmentData'
import announcements from '../../data/announcements'
import pdfFiles from '../../data/pdfFiles'
import allGradeData from '../../data/allGradeData'
import studentData from '../../data/studentData'
import myEvents from '../../data/myEvents'
import students from '../../data/students'
import CourseCard from '../../components/common/CourseCard'
import { courses } from '../../data/courses'
import Calendar from '../../components/common/Calendar'
import { options } from '../../data'
import CardInfoList from '../../components/common/CardInfoList '
import TaskDashboard from '../../components/common/TaskDashboard'
import ProjectTable from '../../components/common/ProjectTable'
import ActivityTracker from '../../components/common/ActivityTracker'
import UserProfile from '../../components/common/UserProfile'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, isLoadingUser } = useUserContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')
  const [searchCriteria, setSearchCriteria] = useState({})
  const [studentsData, setStudentsData] = useState([])

  useEffect(() => {
    if (!isLoadingUser && !user) {
      navigate('/login')
    }
  }, [user, isLoadingUser, navigate])

  const handleMenuToggle = (newState) => {
    setIsMenuOpen(newState)
  }

  const changeView = (view) => {
    setCurrentView(view)
  }

  /* Searching function */
  const handleSearchChange = (criteria) => {
    setSearchCriteria(criteria)
  }

  const CurrentViewComponent = viewComponents[currentView] || DefaultView

  return (
    <Box bg={useColorModeValue('', '')} justifyItems={'center'}>
      <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
      <TwoColumnLayout isMenuOpen={isMenuOpen}>
        <CurrentViewComponent
          data={studentsData}
          handleSearchChange={handleSearchChange}
          searchCriteria={searchCriteria}
        />
      </TwoColumnLayout>
    </Box>
  )
}

export default Dashboard

// Define each view component separately
const DashboardView = ({ data, handleSearchChange, searchCriteria }) => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users')
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const handleSearch = (searchData) => {
    console.log('Search data received:', searchData)
  }

  const handleSearchCriteriaFunction = (criteria) => {
    console.log('Search criteria set:', criteria)
  }
  return (
    <Box>
      <Box shadow="md">
        <WelcomeCard />
      </Box>

      <Flex align="center" m={4}>
        <CardInfoList />
      </Flex>

      <Box shadow="md">
        <SearchForm
          fields={[
            {
              name: 'search',
              placeholder: 'Search...',
              type: 'text',
              width: '1345px',
            },
          ]}
          onSearchChange={handleSearchChange}
          handleSearchCriteria={handleSearchCriteriaFunction} // Pass the correct function here
        />
        <DataTable data={data} searchCriteria={searchCriteria} />
      </Box>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
        p={4}
      >
        <Box>
          <Box>
            <PerformanceCard
              title="Student Performance"
              performanceData={performanceData}
            />
          </Box>
        </Box>
        <Box>
          <LeaderBoard students={students} />
        </Box>
      </Grid>

      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
        p={4}
      >
        <Box>
          <Box>
            <Calendar />
          </Box>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.name}
              description={course.description}
              imageUrl={course.imageUrl}
              duration={course.duration}
              level={course.level}
              onFavoriteToggle={course.onFavoriteToggle}
              badge={course.badge}
              rating={course.rating}
            />
          ))}
        </Box>
      </Grid>
      <StatisticsCard totalCourses={10} hoursSpent={120} achievements={5} />
    </Box>
  )
}

const StudentsView = ({ data }) => {
  console.log(data)
  return (
    <Box>
      <Box shadow="md">
        <WelcomeCard />
      </Box>
      <Box mt={4}>
        <StudentTabs
          assignmentData={assignmentData}
          courses={courses}
          announcements={announcements}
          myEvents={myEvents}
          allGradeData={allGradeData}
          studentData={studentData}
          pdfFiles={pdfFiles}
        />
      </Box>
      <Flex gap={2}>
        <Box flex="3">
          <ProjectTable />
        </Box>
      </Flex>
      {/* <Box><UserProfile /> </Box> */}
    </Box>
  )
}

const TeachersView = ({ data }) => {
  return (
    <Box>
      <Box shadow="md">
        <WelcomeCard />
      </Box>
    </Box>
  )
}

const Streaming = () => {
  return <div>Streaming Content</div>
}

const DefaultView = () => {
  return <div>Default Content</div>
}

const viewComponents = {
  dashboard: DashboardView,
  students: StudentsView,
  teachers: TeachersView,
}
