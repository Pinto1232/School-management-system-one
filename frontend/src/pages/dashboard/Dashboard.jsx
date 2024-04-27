import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, Heading, useColorModeValue } from '@chakra-ui/react'
import {} from 'react-icons/fa'
import { useUserContext } from '../../contexts/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import UserMenu from './UserMenu'
import { TwoColumnLayout } from '../dashboard/index'
import WelcomeCard from '../../components/common/WelcomeCard'
import SearchForm from '../../components/common/SearchForm'
import DataTable from '../../components/common/DataTable'
import PerformanceCard from '../../components/common/PerformanceCard'
import LeaderBoard from '../../components/common/LeaderBoard'
import performanceData from '../../data/StudentPerformanceData'
import students  from  '../../data/students' 
import CourseCard from '../../components/common/CourseCard'
import Calendar from '../../components/common/Calendar'
import { options, courses } from '../../data'
import CardInfoList from '../../components/common/CardInfoList '

const viewComponents = {
  dashboard: DashboardView,
  students: StudentsView,
  teachers: TeachersView,
}

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
function DashboardView({ data }) {
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
    <Box align={'start'} justifyContent={'center'} flexWrap="wrap">
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
        <DataTable  data={data} fetchData={fetchData} />
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
        <Box bg="green.200" p={4}>
          <LeaderBoard 
           students={students}
          />
        </Box>
        <Box bg="blue.200" p={4}>
          <Heading>Bottom Left</Heading>
        </Box>
        <Box bg="purple.200" p={4}>
          <Heading>Bottom Right</Heading>
        </Box>
      </Grid>
    </Box>
  )
}

function StudentsView({ data }) {
  // Student-specific components
}

function TeachersView({ data }) {
  // Teacher-specific components
}

function DefaultView() {
  return <div>Default Content</div>
}
