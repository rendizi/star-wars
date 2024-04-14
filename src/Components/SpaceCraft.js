import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faRuler, 
    faTachometerAlt, 
    faIndustry, 
    faEye, 
    faFilm, 
    faStar, 
    faSpaceShuttle,
    faUser ,
    faShuttleSpace,
    faRocket
} from '@fortawesome/free-solid-svg-icons';

const SpaceCraft = ({ starship }) => {
    const [films, setFilms] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            const filmRequests = starship.films.map(async (filmUrl) => {
                const response = await fetch(filmUrl);
                const data = await response.json();
                return data.title;
            });
            const filmsData = await Promise.all(filmRequests);
            setFilms(filmsData);
        };
        const fetchPilots = async () => {
            const pilotRequests = starship.pilots.map(async (pilotUrl) => { 
                const response = await fetch(pilotUrl);
                const data = await response.json();
                return data.name; 
            });
            const pilotsData = await Promise.all(pilotRequests);
            setPilots(pilotsData);
        };

        setLoading(true);
        Promise.all([fetchFilms(), fetchPilots()]).then(() => setLoading(false));
    }, [starship]);

    return (
        <div className="collapse bg-slate-950 text-slate-50">
            {loading ? (
                <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-sm"></span>
                </div>            ) : (
                <>
                    <input type="checkbox" /> 
                    <div className="text-xl font-medium flex flex-col items-center pb-10">
                        <FontAwesomeIcon icon={faRocket} />
                        <h2 className="text-xl font-semibold mb-2">{starship.name}</h2>
                        <p className="text-sm text-center"><span className="font-semibold"><FontAwesomeIcon icon={faStar} className="mr-3" />Hyperdrive Rating:</span> {starship.hyperdrive_rating}</p>
                        <p className="text-sm text-center"><span className="font-semibold"><FontAwesomeIcon icon={faSpaceShuttle} className="mr-3" />Starship Class:</span> {starship.starship_class}</p>
                        <p className="text-sm text-center"><span className="font-semibold"><FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />Max Atmosphering Speed:</span> {starship.max_atmosphering_speed}</p>

                    </div>

                    <button className="btn" onClick={() => {document.getElementById(starship.url).showModal();}}>View more</button>

                    <dialog id={starship.url} className="modal">
                        <div className="modal-box p-4 rounded-lg shadow-md flex flex-col items-center">
                            <p><span className="font-semibold"><FontAwesomeIcon icon={faRuler} className="mr-2" />Length:</span> {starship.length}</p>
                            <p><span className="font-semibold"><FontAwesomeIcon icon={faIndustry} className="mr-2" />Manufacturer:</span> {starship.manufacturer}</p>
                            <p><span className="font-semibold"><FontAwesomeIcon icon={faEye} className="mr-2" />Cargo Capacity:</span> {starship.cargo_capacity}</p>

                            <div className="mt-4">
                                <span className="font-semibold"><FontAwesomeIcon icon={faFilm} className="mr-2" />Films:</span>
                                <ul className="list-disc pl-4">
                                    {films.map((film, index) => (
                                        <li key={index}>{film}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <span className="font-semibold"><FontAwesomeIcon icon={faUser} className="mr-2" />Pilots:</span> 
                                <ul className="list-disc pl-4">
                                    {pilots.map((pilot, index) => ( 
                                        <li key={index}>{pilot}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </>
            )}
        </div>
    );
};

export default SpaceCraft;
