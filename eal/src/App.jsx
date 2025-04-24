import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './assets/components/home';
import AddWorkerPage from './assets/components/addworker';
import Navbar from './assets/components/navbar';
/*import Details from './assets/components/details';
import Dashboard from './assets/components/data';*/
import GetDetails from './assets/components/getdetails'
import Safety from './assets/components/safefy';
import Appointment from './assets/components/appointments';
import CalendarPage from './assets/components/calender';
import Emergency from './assets/components/emergency';
import Details from './assets/components/details';




function App() {
  const router = createBrowserRouter([
   {
      path: '/addworkers',
      element: (
        <>
          <Navbar />
          <AddWorkerPage/>
        </>
      ),
    },
    {
      path: '/getdetails',
      element: (
        <>
          <Navbar />
          <GetDetails/>
        </>
      ),
    },
    {
      path: '/details',
      element: (
        <>
          <Navbar />
          <Details/>
        </>
      ),
    },
    {
      path: '/calendar',
      element: (
        <>
         
          <CalendarPage/>
        </>
      ),
    },
    {
      path: '/emergency',
      element: (
        <>
         
          <Emergency/>
        </>
      ),
    },
    {
      path: '/safety',
      element: (
        <>
          
          <Safety/>
        </>
      ),
    },
    {
      path: '/appointments',
      element: (
        <>
          
          <Appointment/>
        </>
      ),
    },
    {
      path: '/',
      element: (
        <>
          <Navbar/>
          <Home/>
        </>
      ),
    },

/*{
      path: '/Dashboard',
      element: (
        <>
          <Navbar />
          <Dashboard/>
        </>
      ),
    }*/
  ])

  return (
    <>
      <div>
        <RouterProvider router={router}/>

      </div>
      
    </>
  )
}

export default App
