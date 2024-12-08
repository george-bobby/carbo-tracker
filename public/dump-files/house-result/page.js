"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PieChart } from "@mui/x-charts";

function Result() {
  const router = useRouter();
  const {
    carbonFootprintCalculated = 0,
    requiredToucanTokensCalculated = 0,
    costCalculated = 0,
  } = router.query || {};

  return (
    <div>
      <main className="bg-white block">
        {/* First Section */}
        <section className="bg-[url('https://i.ibb.co/TtD8m17/forest-about-main.jpg')] bg-center bg-no-repeat bg-cover w-full bg-white text-white mb-16">
          <div className="flex flex-row mx-auto px-0 text-white">
            <div className="px-[4%] py-[40px] pb-[20px] text-center">
              <h2 className="text-4xl leading-[1] uppercase mb-11 max-w-[400px] mx-auto block my-[0.83em] text-center isolate shadow-lg font-bold">
                <div className="bg-[rgba(100,255,255,0.40)] max-w-[170px] h-[40px] text-center flex align-center justify-center ml-3 mb-4">
                  Result:
                </div>
                Your carbon impact for your household is{" "}
                {carbonFootprintCalculated.toFixed(2)} kg CO<sub>2</sub>e
              </h2>

              <div className="bg-[url('/results-tree.png')] bg-top bg-no-repeat bg-contain h-[182px] mx-auto mb-4 max-w-full relative w-[291px] text-center">
                <p className="absolute top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-[1.33] px-[22px] w-full block my-[1em] mx-0 text-center isolate">
                  Deforestation contributes nearly 10% of global carbon
                  emissions.
                </p>
              </div>

              <p className="text-s leading-6 m-0 block my-[1em] mx-0 text-center isolate bg-[rgba(0,0,0,0.35)]">
                On average, a hectare of tropical forest stores carbon equating
                to 550 metric tons of CO<sub>2</sub>. With annual tropical
                deforestation rates averaging 0.5%, this results in 2.75 metric
                tons of CO<sub>2</sub> emitted per hectare each year.
              </p>
            </div>

            <div className="bg-[rgba(0,0,0,0.5)] p-[20px] px-[4%] block isolate h-[400px] mx-20 my-24">
              <div className="mx-auto block isolate">
                <h3 className="mb-3 text-xl leading-[1.33] font-semibold">
                  Protect + Restore Our Planet
                </h3>
                <div className="mx-auto">
                  <p className="mb-6 text-white leading-6 m-0 block my-4 mx-0 isolate">
                    Nature is the most powerful technology to fight climate
                    change. Yet we are losing vital ecosystems at alarming
                    rates.
                  </p>
                  <p className="mb-6 text-white leading-6 m-0 block my-4 mx-0 isolate">
                    To prevent complete climate breakdown, we must halt the
                    degradation and deforestation of habitats and restore
                    nature. The planet is at a tipping point, and we need your
                    help.
                  </p>
                  <p className="text-white leading-6 m-0 block my-4 mx-0 isolate">
                    When you neutralize your footprint, you will protect forests
                    around the world — a critical step in our fight against
                    climate change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section className="mb-24 bg-white">
          <div className="text-3xl text-center text-green-700 font-bold uppercase mb-20">
            How Do You Compare?
          </div>
          <div>
            <PieChart
              className="text-center flex flex-row mb-22 mt-22"
              colors={["lightgreen", "green"]}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: carbonFootprintCalculated,
                      label: "Your carbon footprint",
                      color: "lightgreen",
                    },
                    {
                      id: 1,
                      value: 48000,
                      label: "Average world footprint",
                      color: "green",
                    },
                  ],
                  innerRadius: 120,
                  outerRadius: 150,
                  paddingAngle: 5,
                  cornerRadius: 5,
                },
              ]}
              width={1000}
              height={300}
            />
          </div>
        </section>

        {/* Third Section */}
        <section className="mb-24 bg-white">
          <div className="text-3xl text-center text-green-700 font-bold uppercase mb-20">
            Neutralize Your Carbon Footprint
          </div>
          <div className="text-center">
            <p className="text-xl">
              To offset your carbon footprint of{" "}
              {carbonFootprintCalculated?.toFixed(2)} kg CO<sub>2</sub>e, you
              would need approximately {requiredToucanTokensCalculated?.toFixed(
                2
              )}{" "}
              Toucan tokens.
            </p>
            <p className="text-xl">
              The estimated cost for the required Toucan tokens is ₹
              {costCalculated?.toFixed(2)}.
            </p>
          </div>
        </section>
        {/* More sections omitted for brevity */}
      </main>
    </div>
  );
}

export default Result;
