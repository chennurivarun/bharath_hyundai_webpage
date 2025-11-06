"use client"

import { useState } from "react"
import { Calculator, Percent, IndianRupee, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FinancingOptionsProps {
  modelName: string
  priceRange: string
}

export function FinancingOptions({ modelName, priceRange }: FinancingOptionsProps) {
  const [selectedOption, setSelectedOption] = useState("standard")

  const financingOptions = [
    {
      id: "standard",
      title: "Standard Finance",
      interestRate: "8.5%",
      tenure: "12-60 months",
      features: [
        "Competitive interest rates",
        "Flexible tenure options",
        "Quick approval process",
        "No hidden charges"
      ],
      emi: "₹18,500/month*",
      downPayment: "₹2,50,000"
    },
    {
      id: "special",
      title: "Festival Special",
      interestRate: "7.99%",
      tenure: "12-60 months",
      features: [
        "Lower interest rate",
        "Zero processing fee",
        "Instant approval",
        "Limited time offer"
      ],
      emi: "₹17,800/month*",
      downPayment: "₹2,50,000",
      badge: "Limited Time"
    },
    {
      id: "corporate",
      title: "Corporate Finance",
      interestRate: "7.5%",
      tenure: "12-72 months",
      features: [
        "Exclusive rates for employees",
        "Extended tenure up to 6 years",
        "Corporate tie-up benefits",
        "Priority processing"
      ],
      emi: "₹16,900/month*",
      downPayment: "₹2,50,000",
      badge: "Employee Only"
    }
  ]

  const selectedFinancing = financingOptions.find(option => option.id === selectedOption)

  return (
    <Card className="bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 border-white/10 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-600/20 rounded-lg border border-red-500/30">
            <Calculator className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Financing Options</h3>
            <p className="text-white/80">Flexible EMI plans for {modelName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {financingOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedOption === option.id
                  ? "border-red-500 bg-red-600/20 text-white"
                  : "border-white/20 bg-white/5 hover:border-red-400/50 text-white/90"
              }`}
            >
              {option.badge && (
                <Badge className="absolute -top-2 left-4 bg-red-600 text-white border-red-500/30">
                  {option.badge}
                </Badge>
              )}
              
              <div className="text-center">
                <h4 className="font-semibold text-white mb-2">{option.title}</h4>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Percent className="h-4 w-4 text-red-400" />
                  <span className="text-2xl font-bold text-red-400">{option.interestRate}</span>
                </div>
                <p className="text-sm text-white/70 mb-3">{option.tenure}</p>
                
                <div className="space-y-1">
                  <p className="text-lg font-bold text-white">{option.emi}</p>
                  <p className="text-sm text-white/70">Down Payment: {option.downPayment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Option Details */}
        {selectedFinancing && (
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-4">Plan Benefits</h4>
                <ul className="space-y-2">
                  {selectedFinancing.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">EMI Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Principal Amount:</span>
                    <span className="font-semibold text-white">₹8,50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Interest Rate:</span>
                    <span className="font-semibold text-white">{selectedFinancing.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Tenure:</span>
                    <span className="font-semibold text-white">48 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Processing Fee:</span>
                    <span className="font-semibold text-white">₹2,999</span>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">Monthly EMI:</span>
                      <span className="font-bold text-red-400 text-lg">{selectedFinancing.emi}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button className="flex-1 bg-red-600 hover:bg-red-500 text-white">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate EMI
          </Button>
          <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
            <TrendingUp className="h-4 w-4 mr-2" />
            Apply for Loan
          </Button>
        </div>

        <p className="text-xs text-white/50 mt-4 text-center">
          *EMI calculations are indicative. Final terms subject to bank approval and credit evaluation.
        </p>
      </CardContent>
    </Card>
  )
}
