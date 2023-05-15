
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom'
import AdminLogin from "./Components/Administrator/administrator/admin";
import Dashboard from "./Components/Administrator/administrator/dashboard";
import Home from './Components/UserInterface/Home';
import VehicleDetails from './Components/UserInterface/vehicleDetails';
import BookingSummary from './Components/UserInterface/BookingSummary';
import PaymentGateway from './Components/UserInterface/PaymentGateway';

function App() {
  return (
    <div>
    <Router>
      <Routes>
       
        <Route element={<AdminLogin/>} path="/adminlogin" />
        <Route element={<Home/>} path="/home" />
        <Route element={<Dashboard/>} path="/dashboard/*" />
        <Route element={<VehicleDetails/>} path="/vehicledetails" />
        <Route element={<BookingSummary/>} path="/bookingsummary" />
        <Route element={<PaymentGateway/>} path="/paymentgateway" />
       
      </Routes>
    </Router>
    </div>
  );
}

export default App;
