import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faRuler, 
    faEye, 
    faFilm, 
    faUser 
} from '@fortawesome/free-solid-svg-icons';

const Planet = ({ planet }) => {
    const [films, setFilms] = useState([]);
    const [residents, setResidents] = useState([]);

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

        fetchFilms();
        fetchResidents();
    }, [planet]);

    return (
        <div className="collapse bg-slate-950">
            <input type="checkbox" /> 
            <div className="text-xl font-medium flex flex-col items-center pb-10">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-24 flex items-center justify-center">
                        <span className="text-3xl">{planet.name.charAt(0)}</span>
                    </div>
                </div> 
                <h2 className="text-xl font-semibold mb-2">{planet.name}</h2>
            </div>

            <button className="btn" onClick={() => {document.getElementById(planet.url).showModal();}}>View more</button>

            <dialog id={planet.url} className="modal">
                <div className="modal-box p-4 rounded-lg shadow-md flex flex-col items-center">
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faRuler} className="mr-2" />Rotation Period:</span> {planet.rotation_period}</p>
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faRuler} className="mr-2" />Orbital Period:</span> {planet.orbital_period}</p>
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faRuler} className="mr-2" />Diameter:</span> {planet.diameter}</p>
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faEye} className="mr-2" />Climate:</span> {planet.climate}</p>
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faEye} className="mr-2" />Gravity:</span> {planet.gravity}</p>
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faEye} className="mr-2" />Terrain:</span> {planet.terrain}</p>
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faEye} className="mr-2" />Surface Water:</span> {planet.surface_water}</p>
                    <p><span className="font-semibold"><FontAwesomeIcon icon={faUser} className="mr-2" />Population:</span> {planet.population}</p>

                    <div className="mt-4">
                        <span className="font-semibold"><FontAwesomeIcon icon={faFilm} className="mr-2" />Films:</span>
                        <ul className="list-disc pl-4">
                            {films.map((film, index) => (
                                <li key={index}>{film}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
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
    );
};

export default Planet;
