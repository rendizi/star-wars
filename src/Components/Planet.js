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
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            const filmRequests = planet.films.map(async (filmUrl) => {
                const response = await fetch(filmUrl);
                const data = await response.json();
                return data.title;
            });
            const filmsData = await Promise.all(filmRequests);
            setFilms(filmsData);
        };
        const fetchResidents = async () => {
            const residentRequests = planet.residents.map(async (residentUrl) => { 
                const response = await fetch(residentUrl);
                const data = await response.json();
                return data.name; 
            });
            const residentsData = await Promise.all(residentRequests);
            setResidents(residentsData);
        };

        setLoading(true);
        Promise.all([fetchFilms(), fetchResidents()]).then(() => setLoading(false));
    }, [planet]);

    return (
        <div className="collapse bg-slate-950">
    {loading ? (
        <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-sm"></span>
        </div>
    ) : (
        <div className='collapse text-slate-50'>
        <input type="checkbox" /> 
            <div className="text-xl font-medium flex flex-col items-center justify-center pb-10 px-4">
                <h2 className="text-xl font-semibold mb-2">{planet.name}</h2>
                <p className="text-center"><span className="font-semibold"><FontAwesomeIcon icon={faTemperatureLow} className="mr-2" />Climate:</span> {planet.climate}</p>
                <p className="text-center"><span className="font-semibold"><FontAwesomeIcon icon={faMountain} className="mr-2" />Terrain:</span> {planet.terrain}</p>
                <p className="text-center"><span className="font-semibold"><FontAwesomeIcon icon={faUser} className="mr-2" />Population:</span> {planet.population}</p>
            </div>

            <dialog id={planet.url} className="modal">
                <div className="modal-box p-4 rounded-lg shadow-md flex flex-col items-center">
                    <p  className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faClockRotateLeft} className="mr-2" />Rotation Period:</span> {planet.rotation_period}</p>
                    <p  className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faClock} className="mr-2" />Orbital Period:</span> {planet.orbital_period}</p>
                    <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faRuler} className="mr-2" />Diameter:</span> {planet.diameter}</p>
                    <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faArrowsDownToLine} className="mr-2" />Gravity:</span> {planet.gravity}</p>
                    <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faDroplet} className="mr-2" />Surface Water:</span> {planet.surface_water}</p>

                    <div className="mt-4 text-gray-900 dark:text-slate-50">
                        <span className="font-semibold"><FontAwesomeIcon icon={faFilm} className="mr-2" />Films:</span>
                        <ul className="list-disc pl-4">
                            {films.map((film, index) => (
                                <li key={index}>{film}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 text-gray-900 dark:text-slate-50">
                        <span className="font-semibold"><FontAwesomeIcon icon={faUser} className="mr-2" />Residents:</span> 
                        <ul className="list-disc pl-4">
                            {residents.map((resident, index) => ( 
                                <li key={index}>{resident}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )}
    <button className="btn self-end mb-0" onClick={() => {document.getElementById(planet.url).showModal();}}>View more</button>
</div>

    );
};

export default Planet;
