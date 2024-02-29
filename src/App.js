// export default ComparisonView;
import React, { useState, useEffect } from "react";
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import raw1 from "./data/Call 1.json";
import raw2 from "./data/Call 1 watson.json";
import errorRates from "./data/errorRates.json";
import "./App.css";

let callNum = 1;

// return ups and watson error rates in key and value format
function getErrorRate(callNum) {
	return errorRates[callNum - 1].errorRate;
}
function ComparisonView() {
	const [ups_txt, setfile1] = useState("");
	const [watson_txt, setfile2] = useState("");
	// let watson = "";
	useEffect(() => {
		const upsText = raw1.plainTextTime.verbatims.reduce(
			(accumulator, currentValue) => {
				const add = `<p className="paragraph-text">${
					currentValue.sp
				}: ${currentValue.w.toLowerCase()}</p>`;
				return accumulator + add;
			},
			""
		);
		setfile1(upsText);
		// console.log(Object.entries(raw2));
		const watsonText = Object.entries(raw2).reduce(
			(accumulator, currentValue) => {
				const speaker = currentValue[1].Speaker === 1 ? "Agent" : "Customer";
				const add = `<p className="paragraph-text">${speaker}: ${currentValue[1].Transcript} </p>`;
				// console.log(add);
				return accumulator + add;
			},
			""
		);
		setfile2(watsonText);
	}, []);

	return (
		<div className="text-container">
			{/* <h1 style={{ marginTop: '50px', marginLeft: '50px', fontSize:'45px' }}>Call{callNum} </h1> */}
			<div className="textbox">
				<h1> UPS Transcript {callNum} </h1>
				<h3 style={{ color: `#EC5F41` }}>
					{" "}
					Error Rate = {getErrorRate(callNum).ups}%
				</h3>
				<div dangerouslySetInnerHTML={{ __html: ups_txt }} />
			</div>
			<div className="textbox">
				<div>
					<h1>
						Watson Transcript {callNum}
						<span style={{ color: `#418CEC`, fontSize: "20px" }}>
							{" "}
							enUS_Telephony_LSM
						</span>
					</h1>
				</div>
				<h3 style={{ color: `#EC5F41` }}>
					{" "}
					Error Rate = {getErrorRate(callNum).watson}%
				</h3>
				<div dangerouslySetInnerHTML={{ __html: watson_txt }} />
			</div>
		</div>
	);
}

export default ComparisonView;
