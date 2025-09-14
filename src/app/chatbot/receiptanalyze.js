'use client';

import { useState } from "react";
import { MdReceiptLong } from "react-icons/md";
import Tesseract from "tesseract.js";
import { useUser } from "@clerk/nextjs";

export default function ReceiptAnalyze() {
  const { user } = useUser();
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [isSample, setIsSample] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);

  const isSignedIn = !!user?.id;

  const isImageLowQuality =
    parsed &&
    (!parsed.merchant || parsed.merchant === "Unknown") &&
    (!parsed.totalKg || parsed.totalKg === 0);

  // Map items to dashboard categories
  const mapItemsToDashboard = (items) => {
    const dashboardCategories = {
      "Transportation": 0,
      "Energy Use": 0,
      "Food Consumption": 0,
      "Waste Management": 0,
      "Water Usage": 0,
      "Social Activities": 0,
      "Shopping & Online Purchases": 0,
      "Building & Home Maintenance": 0,
    };

    items.forEach(item => {
      const cat = item.category.toLowerCase();

      if (cat.includes("transport")) {
        dashboardCategories["Transportation"] += item.emissionKg;
      } 
      else if (cat.includes("energy")) {
        dashboardCategories["Energy Use"] += item.emissionKg;
      } 
      // all food-related subcategories map here
      else if (
        cat.includes("food") || cat.includes("grocery") || cat.includes("drink") || cat.includes("snack") ||
        cat.includes("meat") || cat.includes("dairy") || cat.includes("egg") ||
        cat.includes("plant") || cat.includes("grain") || cat.includes("vegetable") ||
        cat.includes("fruit") || cat.includes("packaged")
      ) {
        dashboardCategories["Food Consumption"] += item.emissionKg;
      } 
      else if (cat.includes("waste")) {
        dashboardCategories["Waste Management"] += item.emissionKg;
      } 
      else if (cat.includes("water")) {
        dashboardCategories["Water Usage"] += item.emissionKg;
      } 
      else if (cat.includes("social")) {
        dashboardCategories["Social Activities"] += item.emissionKg;
      } 
      else if (cat.includes("shopping") || cat.includes("online")) {
        dashboardCategories["Shopping & Online Purchases"] += item.emissionKg;
      }
      else if (cat.includes("shopping") || cat.includes("online")) {
        dashboardCategories["Building & Home Maintenance"] += item.emissionKg;
      } 
      else {
        dashboardCategories["Food Consumption"] += item.emissionKg;
      }
    });

    Object.keys(dashboardCategories).forEach(key => {
      dashboardCategories[key] = parseFloat(dashboardCategories[key].toFixed(2));
    });

    Object.keys(dashboardCategories).forEach(c => dashboardCategories[c] = parseFloat(dashboardCategories[c].toFixed(2)));
    return dashboardCategories;
  };

  // ---------------------------
  // Sample receipt (per-item breakdown)
  // ---------------------------
  const handleUseSample = () => {
    const demoItems = [
      { name: "apple", quantity: 2, weightKg: 0.15, emissionKg: 0.03, category: "Food Consumption" },
      { name: "bread", quantity: 1, weightKg: 0.5, emissionKg: 0.05, category: "Food Consumption" },
      { name: "bus ticket", quantity: 1, weightKg: 0, emissionKg: 0.02, category: "Transportation" },
      { name: "chocolate bar", quantity: 3, weightKg: 0.1, emissionKg: 0.06, category: "Food Consumption" },
      { name: "water bottle", quantity: 1, weightKg: 0.5, emissionKg: 0.04, category: "Food Consumption" },
    ];

    const categories = mapItemsToDashboard(demoItems);
    const totalKg = Object.values(categories).reduce((sum, val) => sum + val, 0);

    setParsed({
      merchant: "Green Grocers",
      date: new Date().toISOString().slice(0, 10),
      items: demoItems,
      categories,
      totalKg,
    });
    setIsSample(true);
    setReceiptPreview("/sample-receipt.png");
  };

  const handleCloseSample = () => {
    setParsed(null);
    setIsSample(false);
    setReceiptPreview(null);
  };

  // ---------------------------
  // Upload receipt
  // ---------------------------
  const handleUpload = async (file) => {
    if (!file) return;

    setParsed(null);
    setIsSample(false);
    setReceiptPreview(URL.createObjectURL(file));
    setAnalyzing(true);

    try {
      const { data: { text: ocrText } } = await Tesseract.recognize(file, "eng");

      const res = await fetch("/api/parse_receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: ocrText }),
      });

      const data = await res.json();
      const categorizedItems = data.parsed.items || [];
      data.parsed.categories = mapItemsToDashboard(categorizedItems);
      setParsed(data.parsed);
    } catch (err) {
      console.error("Failed to analyze receipt:", err);
      alert("Failed to analyze receipt");
    } finally {
      setAnalyzing(false);
    }
  };

  // ---------------------------
  // Add parsed receipt to dashboard
  // ---------------------------
  const handleAddToDashboard = async () => {
    if (!isSignedIn || !parsed) return alert("Please sign in and upload a receipt first.");

    try {
      setSaving(true);

      // Call Gemini to categorize items (real-time)
      const geminiRes = await fetch("/api/gemini_categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: parsed.items })
      });
      const geminiData = await geminiRes.json();
      const categorizedItems = geminiData.categorizedItems || parsed.items;

      // Aggregate totals per dashboard category
      const dashboardCategories = mapItemsToDashboard(categorizedItems);

      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const currentMonth = months[new Date().getMonth()];

      const payload = {
        clerkId: user.id,
        updatedAt: new Date().toISOString(),
        categories: dashboardCategories,
        monthlyData: { [currentMonth]: parsed.totalKg },
        displayName: user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" "),
        imageUrl: user?.imageUrl || "",
        merchant: parsed.merchant,
        date: parsed.date,
        items: categorizedItems,
        totalKg: parsed.totalKg,
      };

      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add to dashboard");

      alert("Added to dashboard!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to dashboard");
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------
  // JSX
  // ---------------------------
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8">
      <h2 className="text-white font-bold text-lg mb-4">Receipts Analyzer</h2>
      <p className="text-sm text-gray-300 mb-4">
        Upload a receipt image (JPG/PNG) or use a sample.
      </p>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex items-center gap-2 text-gray-200 text-sm cursor-pointer bg-slate-700/50 px-4 py-2 rounded-lg hover:bg-slate-700/70 transition-colors">
            <MdReceiptLong className="text-emerald-400" /> Upload receipt image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files?.[0])}
            />
          </label>

          <button
            onClick={handleUseSample}
            disabled={analyzing}
            className="flex items-center gap-2 text-gray-200 text-sm bg-emerald-600/20 px-4 py-2 rounded-lg hover:bg-emerald-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdReceiptLong className="text-emerald-400" />
            {analyzing ? "Analyzing..." : "Use Sample"}
          </button>
        </div>

        {receiptPreview && (
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-md bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden">
              <img src={receiptPreview} alt="receipt preview" className="w-full h-full object-cover" />
            </div>
            <div className="text-sm text-gray-300">Receipt loaded successfully</div>
          </div>
        )}

        {analyzing && (
          <div className="mt-4 space-y-3 bg-slate-700/30 border border-slate-600 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-400"></div>
              <h3 className="text-white font-semibold text-sm">Analyzing Receipt...</h3>
            </div>
            <p className="text-gray-300 text-sm">Processing receipt data and calculating carbon footprint...</p>
          </div>
        )}

        {isImageLowQuality && (
          <div className="mt-4 bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-lg">
            ⚠️ Unable to extract details. The receipt image might be unclear or low quality.
          </div>
        )}

        {parsed && !isImageLowQuality && (
          <div className="mt-4 space-y-3 bg-slate-700/30 border border-slate-600 rounded-lg p-4">
            <h3 className="text-white font-semibold text-sm">Parsed Summary</h3>
            <p className="text-gray-300 text-sm"><span className="text-gray-400">Merchant:</span> {parsed.merchant}</p>
            <p className="text-gray-300 text-sm"><span className="text-gray-400">Date:</span> {parsed.date}</p>

            <div className="text-gray-300 text-sm">
              <span className="text-gray-400">Estimated kg CO₂ by category:</span>
              <ul className="list-disc list-inside">
                {parsed.categories && Object.entries(parsed.categories).map(([category, value]) => (
                  <li key={category}>{category}: <span className="text-emerald-300">{value}</span> kg CO₂e</li>
                ))}
              </ul>
            </div>

            <div className="text-gray-300 text-sm mt-2">
              <span className="text-gray-400">Breakdown:</span>
              <ul className="list-disc list-inside">
                {parsed.items && parsed.items.map((item, i) => (
                  <li key={item.name}>
                    {item.name} – {item.emissionKg} kg CO₂e
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 text-xs mt-2">Formula: emission = weight × factor × quantity</p>
            </div>

            <p className="text-gray-200 font-medium mt-3">Total: <span className="text-emerald-300">{parsed.totalKg} kg CO₂e</span></p>

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-2">
              {!isSample && (
                <>
                  <button
                    onClick={handleAddToDashboard}
                    disabled={saving || !isSignedIn}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!isSignedIn ? "Sign in to add to Dashboard" : saving ? "Adding..." : "Add to Dashboard"}
                  </button>

                  <button
                    onClick={() => { setParsed(null); setReceiptPreview(null); }}
                    className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                  >
                    Close
                  </button>
                </>
              )}

              {isSample && (
                <button
                  onClick={handleCloseSample}
                  className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                >
                  Close Sample
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
