"use client";

import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPrediction(null);
    setError("");

    const formData = new FormData(e.target);

    const sourceCity = formData.get("source_city");
    const destinationCity = formData.get("destination_city");
    const duration = Number(formData.get("duration"));
    const daysLeft = Number(formData.get("days_left"));

    if (sourceCity === destinationCity) {
      setError("Source city and destination city cannot be the same.");
      return;
    }

    if (duration < 0 || duration > 50) {
      setError("Duration must be between 0 and 50 hours.");
      return;
    }

    if (daysLeft < 0 || daysLeft > 49) {
      setError("Days left must be between 0 and 49 days.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError("Backend API URL is not configured.");
      return;
    }

    const data = {
      airline: formData.get("airline"),
      source_city: sourceCity,
      departure_time: formData.get("departure_time"),
      stops: formData.get("stops"),
      arrival_time: formData.get("arrival_time"),
      destination_city: destinationCity,
      class: formData.get("class"),
      duration: duration,
      days_left: daysLeft
    };

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          `Backend returned an invalid response. Status: ${response.status}`
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Prediction failed.");
      }

      if (
        result.predicted_price === undefined ||
        result.predicted_price === null
      ) {
        throw new Error("Backend did not return a predicted price.");
      }

      setPrediction(Number(result.predicted_price));
    } catch (err) {
      setError(err.message || "Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flight-page">
      <div className="flight-card">
        <h1 className="flight-title">
          Flight Price Predictor
        </h1>

        <p className="flight-subtitle">
          Enter your flight details to predict the ticket price
        </p>

        <form
          onSubmit={handleSubmit}
          className="flight-form"
        >
          <div className="form-group">
            <label className="form-label">
              Airline
            </label>

            <select
              name="airline"
              className="form-select"
              required
            >
              <option value="">Select Airline</option>
              <option value="SpiceJet">SpiceJet</option>
              <option value="AirAsia">AirAsia</option>
              <option value="Vistara">Vistara</option>
              <option value="GO_FIRST">GO_FIRST</option>
              <option value="Indigo">Indigo</option>
              <option value="Air_India">Air_India</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Class
            </label>

            <select
              name="class"
              className="form-select"
              required
            >
              <option value="">Select Class</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Source City
            </label>

            <select
              name="source_city"
              className="form-select"
              required
            >
              <option value="">Select Source City</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Destination City
            </label>

            <select
              name="destination_city"
              className="form-select"
              required
            >
              <option value="">Select Destination City</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Departure Time
            </label>

            <select
              name="departure_time"
              className="form-select"
              required
            >
              <option value="">Select Departure Time</option>
              <option value="Evening">Evening</option>
              <option value="Early_Morning">Early Morning</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Night">Night</option>
              <option value="Late_Night">Late Night</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Arrival Time
            </label>

            <select
              name="arrival_time"
              className="form-select"
              required
            >
              <option value="">Select Arrival Time</option>
              <option value="Evening">Evening</option>
              <option value="Early_Morning">Early Morning</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Night">Night</option>
              <option value="Late_Night">Late Night</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Number of Stops
            </label>

            <select
              name="stops"
              className="form-select"
              required
            >
              <option value="">Select Number of Stops</option>
              <option value="0">0 Stops</option>
              <option value="1">1 Stop</option>
              <option value="2">2 or More Stops</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Duration (Hours)
            </label>

            <input
              type="number"
              name="duration"
              min="0"
              max="50"
              step="0.1"
              placeholder="Maximum 50 hours"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Days Left
            </label>

            <input
              type="number"
              name="days_left"
              min="0"
              max="49"
              step="1"
              placeholder="Maximum 49 days"
              className="form-input"
              required
            />
          </div>

          <div className="predict-container">
            <button
              type="submit"
              disabled={loading}
              className="predict-button"
            >
              {loading
                ? "Predicting..."
                : "Predict Flight Price"}
            </button>
          </div>
        </form>

        {prediction !== null && (
          <div className="prediction-box">
            <p className="prediction-label">
              Predicted Flight Price
            </p>

            <p className="prediction-price">
              ₹{prediction.toFixed(2)}
            </p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <p className="error-text">
              {error}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}