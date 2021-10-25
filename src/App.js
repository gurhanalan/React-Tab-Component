import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
    const [data, setData] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [{ title, dates, duties, company }, setShownJob] = useState({});

    const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch(url);
        const dataList = await response.json();
        setData(dataList);
        const companyList = dataList.map((item) => item.company);
        setCompanies(companyList);
        setIsLoading(false);
        setShownJob(dataList[0]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filterItems = (filter) => {
        const newItem = data.filter((item) => item.company === filter);
        setShownJob(...newItem);
    };

    if (isLoading) {
        return <h1 className="loading section">Loading...</h1>;
    }

    return (
        <section className="section">
            <div className="title">
                <h2>Experience</h2>
                <div className="underline" />
            </div>
            <div className="jobs-center">
                <div className="btn-container">
                    {companies.map((item, index) => (
                        <button
                            className={`job-btn ${
                                item === company && "active-btn"
                            }`}
                            key={index}
                            onClick={() => {
                                filterItems(item);
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className="job-info">
                    <h3>{title}</h3>
                    <h4>{company}</h4>
                    <p className="job-date">{dates}</p>

                    {duties &&
                        duties.map((item, key) => (
                            <div key={key} className="job-desc">
                                <FaAngleDoubleRight className="job-icon" />
                                <p>{item}</p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}

export default App;
