import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, Heading, useColorModeValue } from '@chakra-ui/react'
import {} from 'react-icons/fa'
import { useUserContext } from '../../contexts/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import UserMenu from './UserMenu'
import { StatisticsCard, TwoColumnLayout } from '../dashboard/index'
import WelcomeCard from '../../components/common/WelcomeCard'
import SearchForm from '../../components/common/SearchForm'
import DataTable from '../../components/common/DataTable'
import PerformanceCard from '../../components/common/PerformanceCard'
import LeaderBoard from '../../components/common/LeaderBoard'
import performanceData from '../../data/StudentPerformanceData'
import students from '../../data/students'
import CourseCard from '../../components/common/CourseCard'
import { courses } from '../../data/courses'
import Calendar from '../../components/common/Calendar'
import { options } from '../../data'
import CardInfoList from '../../components/common/CardInfoList '

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, isLoadingUser } = useUserContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')
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

  const CurrentViewComponent = viewComponents[currentView] || DefaultView

  return (
    <Box bg={useColorModeValue('', '')} justifyItems={'center'}>
      <UserMenu onMenuToggle={handleMenuToggle} changeView={changeView} />
      <TwoColumnLayout isMenuOpen={isMenuOpen}>
        <CurrentViewComponent data={studentsData} />
      </TwoColumnLayout>
    </Box>
  )
}

export default Dashboard

// Define each view component separately
const DashboardView = ({ data }) => {
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
    console.log('Search criteria:', criteria)
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
          onSearch={handleSearch}
          handleSearchCriteria={handleSearchCriteriaFunction}
        />
        <DataTable data={data} fetchData={fetchData} />
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

const DefaultView = () => {
  return <div>Default Content</div>
}

const viewComponents = {
  dashboard: DashboardView,
  students: StudentsView,
  teachers: TeachersView,
}
