import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Container,
  Alert,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [leaveReason, setLeaveReason] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [leaveData, setLeaveData] = useState({}); // key: phone number, value: date[]
  const allowedLeaves = 4;

  // Holidays list (Month is 0-indexed)
  const holidays = [
    new Date(2025, 3, 22),
    new Date(2025, 4, 1),
    new Date(2025, 6, 15),
  ];

  const isHoliday = (date) =>
    holidays.some((holiday) => holiday.toDateString() === date.toDateString());

  const tileClassName = ({ date, view }) => {
    if (view === "month" && isHoliday(date)) return "highlight-holiday";
    return null;
  };

  const handleLeaveApply = () => {
    if (!phoneNumber.trim()) {
      return alert("Please enter phone number.");
    }

    if (!leaveReason.trim()) {
      return alert("Please enter a reason.");
    }

    const userLeaves = leaveData[phoneNumber] || [];
    const alreadyApplied = userLeaves.some(
      (d) => new Date(d).toDateString() === date.toDateString()
    );

    if (alreadyApplied) {
      return alert("Leave already applied for this date.");
    }

    if (userLeaves.length >= allowedLeaves) {
      return alert("Leave limit reached.");
    }

    const updatedLeaves = {
      ...leaveData,
      [phoneNumber]: [...userLeaves, date],
    };

    setLeaveData(updatedLeaves);
    setLeaveReason("");
    alert("Leave applied successfully!");
  };

  const currentLeaves = leaveData[phoneNumber] || [];
  const leavesUsed = currentLeaves.length;
  const currentMonthHolidays = holidays.filter(
    (d) => d.getMonth() === date.getMonth()
  ).length;

  return (
    <div className="calendar-page">
      <header className="bg-primary text-white py-5 text-center">
        <Container>
          <h1 className="display-4">Calendar</h1>
          <p className="lead">Your shift schedule and holidays</p>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <h3 className="text-center mb-4">Calendar with Holidays</h3>
          <div className="calendar-container mb-4 d-flex justify-content-center">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={tileClassName}
            />
          </div>

          <Row className="text-center mb-5">
            <Col md={3}>
              <Card className="p-3 shadow-sm">
                <h5>Total Leaves Allowed</h5>
                <p>{allowedLeaves} per month</p>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="p-3 shadow-sm">
                <h5>Leaves Used</h5>
                <p>{leavesUsed}</p>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="p-3 shadow-sm">
                <h5>Holidays This Month</h5>
                <p>{currentMonthHolidays}</p>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="p-3 shadow-sm">
                <h5>Is Today a Holiday?</h5>
                <p>{isHoliday(new Date()) ? "Yes" : "No"}</p>
              </Card>
            </Col>
          </Row>

          <h4 className="text-center mb-3">Apply for Leave</h4>
          <Form>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Selected Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={date.toDateString()}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="Enter reason for leave"
                  />
                </Form.Group>

                <Button
                  variant="success"
                  onClick={handleLeaveApply}
                  disabled={leavesUsed >= allowedLeaves}
                >
                  Apply Leave
                </Button>
              </Col>
            </Row>
          </Form>

          <div className="text-center mt-5">
            <Alert variant="info">
              Dates highlighted in <span className="highlight-holiday">red</span> are holidays.
            </Alert>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CalendarPage;
