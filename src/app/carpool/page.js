"use client";
import React, { useState } from "react";
import { Card } from "../../utilities/card";
import { Input } from "../../utilities/input";
import { Button } from "../../utilities/button";
import { Star, Check, MapPin } from "lucide-react";
import allRides from "./ridesData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../utilities/dialog";
// import { useTheme } from '../context/ThemeContext';
// import Lottie from 'react-lottie';
// import imgR from "../../../public/imgR.jpg";
// import image2 from "../../../public/img5.webp";
// import image3 from "../../../public/imgr1.jpg";
// import car from '../../../public/car.png';
// import animation from "../../../public/Animation.json";

const RideBooking = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [filteredRides, setFilteredRides] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [confirmedRideId, setConfirmedRideId] = useState(null);
  const [searchOn, setSearchOn] = useState(false);

  const handleSearch = () => {
    if (!startLocation && !destination) {
      setFilteredRides(allRides);
      setIsSearchActive(false);
      setSearchOn(false);
      return;
    }

    const filtered = allRides.filter((ride) => {
      const startMatch =
        ride.start.toLowerCase() === startLocation.toLowerCase().trim();
      const endMatch =
        ride.end.toLowerCase() === destination.toLowerCase().trim();
      return startMatch && endMatch;
    });

    setFilteredRides(filtered);
    setIsSearchActive(true);
    setSearchOn(true);
  };

  const handleCancelSearch = () => {
    setStartLocation("");
    setDestination("");
    setFilteredRides([]);
    setIsSearchActive(false);
    setSearchOn(false);
  };

  const handleBookRide = (ride) => {
    setSelectedRide(ride);
    setShowConfirmDialog(true);
  };

  const handleConfirmBooking = () => {
    setConfirmedRideId(selectedRide.id);
    setShowConfirmDialog(false);
    setSelectedRide(null);
  };

  const displayRides = isSearchActive ? filteredRides : allRides;

  const RideCard = ({ ride }) => {
    const isConfirmed = ride.id === confirmedRideId;

    return (
      <Card
        className={`p-4 transition-all duration-300 ${
          isConfirmed ? "bg-green-50 border-green-500" : "hover:shadow-lg"
        }`}
      >
        <div className="flex items-start gap-4 bg-slate-100 border-r-2 p-4 rounded-xl bg-opacity-90">
          <img
            src={ride.image}
            alt={ride.driver}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium flex items-center">
                  {ride.driver}
                  <span className="text-gray-500 text-sm ml-2">
                    {ride.distance}
                  </span>
                  {isConfirmed && (
                    <span className="ml-2 flex items-center text-green-600 text-sm font-medium">
                      <Check className="w-4 h-4 mr-1" />
                      Booking Confirmed
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600">
                  Route: {ride.start} to {ride.end}
                </p>
                <p className="text-sm text-gray-600">
                  Car: {ride.car}
                  <span className="ml-4">
                    Seats available: {isConfirmed ? ride.seats - 1 : ride.seats}
                  </span>
                </p>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Pickup: {ride.pickupPoint}
                </div>
              </div>
              <div className="flex items-center">
                {ride.rating}
                <Star className="w-4 h-4 text-yellow-400 ml-1" />
              </div>
            </div>
            {!isConfirmed && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 hover:bg-blue-50"
                onClick={() => handleBookRide(ride)}
              >
                Book this ride
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="h-screen relative">
      <div className="relative z-10 max-w-3xl mx-auto p-6 bg-white bg-opacity-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">PICK A RIDE</h1>
        <div className="grid grid-cols-12 gap-4 mb-4 border-2 p-6 rounded-xl shadow-md bg-white bg-opacity-70">
          <div className="col-span-5">
            <label className="block text-sm font-medium mb-2">START FROM</label>
            <Input
              placeholder="e.g. Kengeri"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="w-full"
              list="startLocations"
            />
            <datalist id="startLocations">
              {Array.from(new Set(allRides.map((ride) => ride.start))).map(
                (location) => (
                  <option key={location} value={location} />
                )
              )}
            </datalist>
          </div>
          <div className="col-span-5">
            <label className="block text-sm font-medium mb-2">
              DESTINATION
            </label>
            <Input
              placeholder="e.g. Rajajinagar"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full"
              list="destinations"
            />
            <datalist id="destinations">
              {Array.from(new Set(allRides.map((ride) => ride.end))).map(
                (location) => (
                  <option key={location} value={location} />
                )
              )}
            </datalist>
          </div>
          <div className="col-span-2 flex items-end">
            <Button
              variant="primary"
              className="w-full bg-green-700 text-white rounded-xl hover:bg-green-600"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {isSearchActive && (
          <div className="text-right mb-4">
            <Button
              variant="ghost"
              onClick={handleCancelSearch}
              className="text-gray-600"
            >
              Cancel search ✕
            </Button>
          </div>
        )}

        {searchOn && (
          <div className="space-y-4">
            {displayRides.length === 0 && isSearchActive ? (
              <div className="text-center py-8 text-gray-500 bg-slate-100">
                No rides available from {startLocation} to {destination}. Please
                try different locations or cancel search to see all rides.
              </div>
            ) : (
              displayRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
            )}
          </div>
        )}

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="bg-white bg-opacity-70 rounded-xl">
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                {selectedRide && (
                  <div className="py-4 space-y-2">
                    <p className="font-medium">Driver: {selectedRide.driver}</p>
                    <p>From: {selectedRide.start}</p>
                    <p>To: {selectedRide.end}</p>
                    <p>Car: {selectedRide.car}</p>
                    <p>Available Seats: {selectedRide.seats}</p>
                    <p>Distance: {selectedRide.distance}</p>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-700 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Pickup Location
                      </p>
                      <p className="text-gray-600 ml-6">
                        {selectedRide.pickupPoint}
                      </p>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      Please confirm if you want to book this ride
                    </p>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="primary"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="outline" onClick={handleConfirmBooking}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RideBooking;
