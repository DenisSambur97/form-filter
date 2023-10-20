import React, { useState } from 'react';
import './FilterForm.css';

function FilterForm() {
    const filterData = {
        ЖК: ['Академический', 'Басманный', 'Замоскворечье', 'Измайлово', 'Люблино', 'Парус', 'Континенталь'],
        Округ: ['Округ1', 'Округ2', 'Округ3', 'Округ4', 'Округ5', 'Округ6', 'Округ7', 'Округ8', 'Округ9'],
        Район: ['Район1', 'Район2', 'Район3', 'Район4', 'Район5', 'Район6', 'Район7', 'Район8', 'Район9', 'Район10', 'Район11'],
        Метро: ['Метро1', 'Метро2', 'Метро3', 'Метро4', 'Метро5', 'Метро6', 'Метро7']
    };

    const [activeTab, setActiveTab] = useState('ЖК');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleFilterChange = (category, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[category]) {
                if (updatedFilters[category].includes(value)) {
                    updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
                } else {
                    updatedFilters[category] = [...updatedFilters[category], value];
                }
            } else {
                updatedFilters[category] = [value];
            }
            return updatedFilters;
        });
    };

    const handleRemoveFilter = (category, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
            if (updatedFilters[category].length === 0) {
                delete updatedFilters[category];
            }
            return updatedFilters;
        });
    };

    const totalSelected = Object.values(selectedFilters)
        .reduce((acc, curr) => acc + curr.length, 0);

    return (
        <div className="filter-form">
            <button
                className="filter-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13Z"
                        stroke="#080908" strokeWidth="2" strokeLinecap="square"/>
                    <path d="M12 12L14 14" stroke="#080908" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
                ЖК, Округ, район, метро {totalSelected > 0 && (
                <span>{totalSelected}</span>
            )}
            </button>

            {isDropdownOpen && (
                <div className="filter-dropdown">
                    <div className="tabs">
                        {Object.keys(filterData).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabClick(tab)}
                                className={activeTab === tab ? 'active' : ''}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {isDropdownOpen && (
                        <div className="selected-filters">
                            <ul>
                                {Object.entries(selectedFilters).map(([category, values]) =>
                                    values.map((value) => (
                                        <li key={`${category}-${value}`}>
                                            {value}
                                            <button onClick={() => handleRemoveFilter(category, value)}>
                                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.91235 1L9.91276 9.0004M10.0843 1L2.08392 9.0004"
                                                          stroke="#07000F" strokeOpacity="0.4" strokeWidth="2"
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                    <div className="tab-content">
                        {activeTab && (
                            <ul>
                                {filterData[activeTab].map((option) => (
                                    <li key={option}>
                                        {option}
                                        <span
                                            className={`checkbox ${selectedFilters[activeTab] && selectedFilters[activeTab].includes(option) ? 'checked' : 'unchecked'}`}
                                            onClick={() => handleFilterChange(activeTab, option)}
                                        >
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterForm;
