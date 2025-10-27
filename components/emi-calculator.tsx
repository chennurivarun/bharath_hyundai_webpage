"use client"

import { useState, useEffect } from "react"
import { Calculator, IndianRupee, TrendingDown, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000) // 10 lakhs
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(5) // years
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, tenure])

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const numberOfMonths = tenure * 12

    if (ratePerMonth === 0) {
      const monthlyEMI = principal / numberOfMonths
      setEmi(monthlyEMI)
      setTotalInterest(0)
      setTotalAmount(principal)
      return
    }

    const emiValue =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1)

    const totalPayment = emiValue * numberOfMonths
    const interestPayment = totalPayment - principal

    setEmi(emiValue)
    setTotalInterest(interestPayment)
    setTotalAmount(totalPayment)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section
      aria-labelledby="emi-calculator-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 border border-white/10 backdrop-blur-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Calculator className="h-6 w-6 text-blue-500" />
              <span className="text-blue-500 font-semibold uppercase tracking-wider text-sm">
                Finance Tool
              </span>
            </div>
            <h2 id="emi-calculator-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              EMI Calculator
            </h2>
            <p className="text-white/70 text-lg">
              Calculate your monthly car loan payments instantly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Inputs */}
            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white font-semibold">Loan Amount</Label>
                  <span className="text-blue-400 font-bold text-lg">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  min={100000}
                  max={5000000}
                  step={50000}
                  className="[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-500"
                />
                <div className="flex justify-between mt-2 text-xs text-white/50">
                  <span>₹1L</span>
                  <span>₹50L</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white font-semibold">Interest Rate (per annum)</Label>
                  <span className="text-green-400 font-bold text-lg">{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  min={5}
                  max={15}
                  step={0.1}
                  className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500"
                />
                <div className="flex justify-between mt-2 text-xs text-white/50">
                  <span>5%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white font-semibold">Loan Tenure</Label>
                  <span className="text-purple-400 font-bold text-lg">
                    {tenure} {tenure === 1 ? "year" : "years"}
                  </span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={1}
                  max={7}
                  step={1}
                  className="[&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-500"
                />
                <div className="flex justify-between mt-2 text-xs text-white/50">
                  <span>1 year</span>
                  <span>7 years</span>
                </div>
              </div>

              {/* Preset Buttons */}
              <div>
                <Label className="text-white font-semibold mb-3 block">Quick Selection</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "₹5L", value: 500000 },
                    { label: "₹10L", value: 1000000 },
                    { label: "₹15L", value: 1500000 },
                  ].map((preset) => (
                    <Button
                      key={preset.value}
                      onClick={() => setLoanAmount(preset.value)}
                      variant={loanAmount === preset.value ? "default" : "outline"}
                      className={
                        loanAmount === preset.value
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "border-white/20 text-white hover:bg-white/10"
                      }
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="space-y-6">
              {/* EMI Result Card */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-white/20">
                      <IndianRupee className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-white/90 text-sm font-medium">Monthly EMI</p>
                  </div>
                  <p className="text-white text-4xl font-bold mb-1">{formatCurrency(emi)}</p>
                  <p className="text-white/70 text-sm">per month for {tenure * 12} months</p>
                </CardContent>
              </Card>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-green-500" />
                      <p className="text-white/70 text-xs">Principal Amount</p>
                    </div>
                    <p className="text-white text-xl font-bold">{formatCurrency(loanAmount)}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-yellow-500" />
                      <p className="text-white/70 text-xs">Total Interest</p>
                    </div>
                    <p className="text-white text-xl font-bold">{formatCurrency(totalInterest)}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-purple-500" />
                    <p className="text-white/70 text-xs">Total Amount Payable</p>
                  </div>
                  <p className="text-white text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                </CardContent>
              </Card>

              {/* Visual Breakdown */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/70 text-sm mb-3">Payment Breakdown</p>
                <div className="flex h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500"
                    style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                    title="Principal"
                  />
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                    title="Interest"
                  />
                </div>
                <div className="flex justify-between mt-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-white/70">Principal: {((loanAmount / totalAmount) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-yellow-500" />
                    <span className="text-white/70">Interest: {((totalInterest / totalAmount) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-500 text-white">
                  <a href="/contact">Apply for Loan</a>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  <a href="/test-drive">Book Test Drive</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

