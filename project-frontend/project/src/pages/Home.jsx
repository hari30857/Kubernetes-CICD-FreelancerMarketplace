import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer'; // Ensure the path to Footer is correct
import TopFreelancersSection from '../components/Freelancers';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-800 to-black rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-4">Find the Perfect Freelance Services</h1>
        <p className="text-xl mb-8">Connect with talented freelancers and get your projects done</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleNavigation('/jobs')}
            className="bg-white text-black hover:bg-gray-100 btn-primary px-6 py-2 rounded"
          >
            Find Work
          </button>
          <button
            onClick={() => handleNavigation('/freelancers')} // Navigate to '/freelancers'
            className="border-2 border-white text-white hover:bg-white hover:text-black btn-primary px-6 py-2 rounded bg-transparent"
          >
            Hire Freelancers
          </button>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card hover:shadow-lg p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">Post a Job</h3>
          <p className="text-gray-600">
            Share your project details and get matched with top talent
          </p>
        </div>
        <div className="card hover:shadow-lg p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">Choose Freelancers</h3>
          <p className="text-gray-600">
            Browse profiles, reviews, and proposals then choose the best fit
          </p>
        </div>
        <div className="card hover:shadow-lg p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">Pay Safely</h3>
          <p className="text-gray-600">
            Only pay for work when it has been completed and you're 100% satisfied
          </p>
        </div>
      </section>

      {/* Top Freelancers Section */}
      <TopFreelancersSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
