import React, { useState } from 'react';
import { QrCode, CreditCard, Landmark, Banknote, Shield, CheckCircle, Lock } from 'lucide-react';
import Button from '../components/Button';

export default function Pay() {
  const [amount, setAmount] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsProcessing(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const orderResponse = await fetch(`${apiUrl}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount) })
      });
      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert("Failed to create order. Please try again.");
        setIsProcessing(false);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: "rzp_test_dummy_key_id_123", // Matches backend test key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Blue Springs Dental",
        description: "Clinic Treatment Payment",
        order_id: orderData.orderId,
        handler: async function (response) {
          // 3. Verify Payment Signature
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const verifyResult = await fetch(`${apiUrl}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          const verifyData = await verifyResult.json();
          if (verifyData.success) {
            alert("Payment Successful! Reference ID: " + response.razorpay_payment_id);
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "patient@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#1A73E8",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong processing your payment.");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="page-pay pt-24 pb-16">

      {/* Page Header */}
      <section className="bg-primary text-white py-16 mb-16" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="container text-center">
          <h1 className="heading-xl mb-4">Easy & Secure Online Payments</h1>
          <p className="text-lead opacity-90" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Pay for your treatment quickly and conveniently
          </p>
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column: Payment Options */}
          <div>
            <div className="bg-blue-50 border-2 border-primary rounded-2xl p-6 mb-8 shadow-sm">
              <h2 className="heading-md mb-2 text-primary-dark">Quick Online Payment</h2>
              <p className="text-secondary mb-6 text-sm">Pay instantly via Razorpay Checkout (Cards, UPI, NetBanking)</p>

              <div className="input-group">
                <label className="input-label" htmlFor="amount">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">₹</span>
                  <input
                    type="number"
                    id="amount"
                    className="input-field pl-8 font-bold text-lg"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              <Button onClick={handlePayment} disabled={isProcessing} className="w-full justify-center py-4 text-lg">
                {isProcessing ? 'Processing...' : `Pay ₹${amount} Securely`}
              </Button>
            </div>

            <h2 className="heading-lg mb-8">Other Offline Options</h2>

            <div className="space-y-6">
              {/* UPI Payment Card */}
              <div className="card payment-method-card hover:-translate-y-1 transition-transform">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <QrCode size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">UPI Payment</h3>
                    <p className="text-secondary text-sm">Accepts GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center mt-4">
                  <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 mx-auto flex flex-col items-center justify-center p-4 rounded-lg mb-4">
                    <QrCode size={64} className="text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-medium">Scan to Pay</span>
                    <span className="text-xs font-bold text-gray-700">Blue Springs Dental Clinic</span>
                  </div>
                  <div className="inline-block bg-white px-4 py-2 border rounded-full text-sm font-medium">
                    UPI ID: bluespringsdental@upi
                  </div>
                </div>
              </div>

              {/* Debit/Credit Card */}
              <div className="card payment-method-card flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Debit / Credit Card</h3>
                  <p className="text-secondary text-sm mb-2">Visa, Mastercard, RuPay accepted</p>
                  <p className="text-sm">Pay securely via card at the clinic or request an online payment link.</p>
                </div>
              </div>

              {/* Net Banking */}
              <div className="card payment-method-card flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Landmark size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Net Banking</h3>
                  <p className="text-secondary text-sm">All major Indian banks supported securely.</p>
                </div>
              </div>

              {/* Cash Payment */}
              <div className="card payment-method-card flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Banknote size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Cash</h3>
                  <p className="text-secondary text-sm">Cash payments are readily accepted at the clinic reception.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Instructions & Security */}
          <div>
            <div className="card mb-8">
              <h3 className="text-2xl font-bold mb-6">Payment Instructions</h3>

              <ol className="list-decimal pl-6 space-y-6 text-secondary ml-4">
                <li>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Select your payment method</h4>
                  <p className="leading-relaxed">Choose the most convenient way for you to pay.</p>
                </li>
                <li>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Enter your details</h4>
                  <p className="leading-relaxed">Use your appointment ID or registered phone number as a reference.</p>
                </li>
                <li>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Enter the exact amount</h4>
                  <p className="leading-relaxed">Fill in the amount exactly as advised by the clinic staff.</p>
                </li>
                <li>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Complete & Save Receipt</h4>
                  <p className="leading-relaxed">Finish the payment and keep a screenshot of the transaction ID for your records.</p>
                </li>
              </ol>
            </div>

            <div className="card bg-gray-50 border-gray-200">
              <h3 className="font-bold mb-4 text-center">Secure Payment Guarantee</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-secondary">
                  <Lock size={20} className="text-green-600" />
                  <span className="font-medium text-sm">SSL Secured Connection</span>
                </div>
                <div className="flex items-center gap-3 text-secondary">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="font-medium text-sm">100% Safe & Encrypted</span>
                </div>
                <div className="flex items-center gap-3 text-secondary">
                  <Shield size={20} className="text-green-600" />
                  <span className="font-medium text-sm">RBI Compliant Processing</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-secondary mb-2">For payment-related queries, please contact our support.</p>
              <Button href="tel:07012770366" variant="outline" className="w-full">
                Call: 070127 70366
              </Button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
