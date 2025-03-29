import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './assets/components/home';
import AddWorkerPage from './assets/components/addworker';
import Navbar from './assets/components/navbar';
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
      path: '/details',
      element: (
        <>
          <Navbar />
          <Details/>
        </>
      ),
    },
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home/>
        </>
      ),
    }
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
