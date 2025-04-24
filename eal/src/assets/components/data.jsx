// 2. components/Dashboard.js
{/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThermometerHalf, FaTint, FaEye, FaGasPump, FaMountain, FaArrowAltCircleUp, FaLightbulb, FaWalking, FaWind, FaCogs } from 'react-icons/fa';

const iconMap = {
  temperature: <FaThermometerHalf size={30} className="me-2 text-danger" />,
  humidity: <FaTint size={30} className="me-2 text-primary" />,
  irSensor: <FaEye size={30} className="me-2 text-info" />,
  mq2Analog: <FaGasPump size={30} className="me-2 text-warning" />,
  mq2Digital: <FaGasPump size={30} className="me-2 text-warning" />,
  altitude: <FaMountain size={30} className="me-2 text-secondary" />,
  pressure: <FaArrowAltCircleUp size={30} className="me-2 text-dark" />,
  ldrValue: <FaLightbulb size={30} className="me-2 text-warning" />,
  pirSensor: <FaWalking size={30} className="me-2 text-success" />,
  accelX: <FaCogs size={30} className="me-2 text-secondary" />,
  accelY: <FaCogs size={30} className="me-2 text-secondary" />,
  accelZ: <FaCogs size={30} className="me-2 text-secondary" />,
};

function Dashboard() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/data/latest");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div className="row">
      {Object.entries(data).filter(([key]) => key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v').map(([key, value]) => (
        <div key={key} className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-body d-flex align-items-center">
              {iconMap[key] || <FaWind size={30} className="me-2" />}
              <div>
                <h5 className="card-title text-capitalize">{key}</h5>
                <p className="card-text fs-4 fw-semibold">{value}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;*/}