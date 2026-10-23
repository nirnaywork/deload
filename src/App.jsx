// App composes the long page from focused sections and wraps it in one shared form-dialog provider.
import { FormProvider } from './components/FormContext.jsx';
import CursorFollower from './components/CursorFollower.jsx';
import IntroLoader from './components/IntroLoader.jsx';
import FormModal from './components/FormModal.jsx';
import Navbar from './components/Navbar.jsx';
import HeroSection from './sections/HeroSection.jsx';
import ServicesSection from './sections/ServicesSection.jsx';
import ProcessSection from './sections/ProcessSection.jsx';
import WorkSection from './sections/WorkSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import { agencyName } from './data/config.js';

// A provider makes one dialog available to every nested CTA without passing callbacks through every section.
function App() {
  return (
    <FormProvider>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <IntroLoader />
      <CursorFollower />
      <Navbar />
      <main id="main-content">
        <HeroSection agencyName={agencyName} />
        <ServicesSection />
        <ProcessSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer agencyName={agencyName} />
      <FormModal />
    </FormProvider>
  );
}

export default App;
