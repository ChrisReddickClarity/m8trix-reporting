import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanStatusProps {
  appointmentType?: string;
  date?: string;
  time?: string;
}

const PlanStatus: React.FC<PlanStatusProps> = ({
  appointmentType = "Laboratory",
  date = "7/22/2024",
  time = "9:30 AM",
}) => {
  return (
    <Card className="bg-black text-white rounded-3xl overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Plan status</h2>
        <h3 className="text-lg font-medium mb-4">Blood draw appointment</h3>

        <div className="bg-green-700 rounded-xl p-4 mb-6">
          <p className="text-white">
            Check your email for your blood draw requisition form and scheduling
            link. Please allow 1-2 business days for delivery.{" "}
            <a href="#" className="underline">
              View blood draw instructions.
            </a>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Appointment type</span>
            <span>{appointmentType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Date</span>
            <span>{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Time</span>
            <span>{time}</span>
          </div>
        </div>

        <Button className="w-full mt-6 bg-black text-white border border-gray-600 hover:bg-gray-800 rounded-full">
          Edit scheduling details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanStatus;
