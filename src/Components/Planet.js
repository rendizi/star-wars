import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faRuler, 
    faEye, 
    faFilm, 
    faUser ,
    faMountain,
    faTemperatureLow,
    faClockRotateLeft,
    faClock,
    faArrowsDownToLine,
    faDroplet
} from '@fortawesome/free-solid-svg-icons';

const Planet = ({ planet }) => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null)

    const handleModalOpen = () => {
        const modal = document.getElementById(planet.url);
        modal.showModal()
        if (modal) {
            modal.showModal(); 
            setLoading(true); 
            fetchPlanetData(); 
        }
    };

    const fetchPlanetData = async () => {
        try {
            setLoading(true);
            const response = await fetch(planet.url);
            const data = await response.json();
            console.log(data.result.properties)

            setInfo({
                ...data.result.properties,
            });
        } catch (error) {
            console.error('Error fetching person data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
<div className="collapse bg-slate-950 border border-solid border-transparent hover:border-orange-500">
            <div className='collapse text-slate-50 hover:border-orange-500'>
                <input type="checkbox" /> 
                <div className="text-xl font-medium flex flex-col items-center justify-center pb-10 px-4">
                    <h2 className="text-xl font-semibold mb-2">{planet.name}</h2>
                </div>
                <dialog id={planet.url} className="modal">
                    {info === null ? (
                        <div className="modal-box p-4 rounded-lg shadow-md flex justify-center items-center">
                            <span className="loading loading-dots loading-sm"></span>
                        </div>
                    ) : (
                        <div className="modal-box p-4 rounded-lg shadow-md flex flex-col items-center">
                            <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faTemperatureLow} className="mr-2" />Climate:</span> {info.climate}</p>
                            <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faMountain} className="mr-2" />Terrain:</span> {info.terrain}</p>
                            <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faUser} className="mr-2" />Population:</span> {info.population}</p>
                            <p  className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faClockRotateLeft} className="mr-2" />Rotation Period:</span> {info.rotation_period}</p>
                            <p  className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faClock} className="mr-2" />Orbital Period:</span> {info.orbital_period}</p>
                            <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faRuler} className="mr-2" />Diameter:</span> {info.diameter}</p>
                            <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faArrowsDownToLine} className="mr-2" />Gravity:</span> {info.gravity}</p>
                            <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faDroplet} className="mr-2" />Surface Water:</span> {info.surface_water}</p>
                        </div>
                    )}
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <button className="btn self-end mb-0" onClick={handleModalOpen}>View more</button>
        </div>
    );
    
};

export default Planet;
