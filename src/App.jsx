import React from 'react';
import { PageProvider, usePage } from './context/PageContext';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import ScrollProgressBar from './components/layout/ScrollProgressBar';
import Loader from './components/Loader/Loader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import MembersPage from './pages/MembersPage';
import JoinUsPage from './pages/JoinUsPage';
import './styles/global.css';

function PageRouter() {
  const { currentPage } = usePage();

  const pages = {
    home:           <HomePage />,
    about:          <AboutPage />,
    events:         <EventsPage />,
    'event-detail': <EventDetailPage />,
    members:        <MembersPage />,
    joinus:         <JoinUsPage />,
  };

  return pages[currentPage] || <HomePage />;
}

export default function App() {
  return (
    <PageProvider>
      <Loader />
      <ScrollProgressBar />
      <Navbar />
      <PageRouter />
      <Footer />
    </PageProvider>
  );
}
