import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faRuler, 
    faBalanceScale, 
    faPalette, 
    faEye, 
    faBirthdayCake, 
    faVenusMars, 
    faFilm, 
    faCar, 
    faSpaceShuttle 
} from '@fortawesome/free-solid-svg-icons';

export const Character = (props) => {
    const { person } = props;
    const [films, setFilms] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const fetchFilms = async () => {
                    const filmRequests = person.films.map(async (filmUrl) => {
                        const response = await fetch(filmUrl);
                        const data = await response.json();
                        return data.title;
                    });
                    const filmsData = await Promise.all(filmRequests);
                    setFilms(filmsData);
                };

                const fetchVehiclesAndStarships = async () => {
                    const vehicleRequests = person.vehicles.map(async (vehicleUrl) => {
                        const response = await fetch(vehicleUrl);
                        const data = await response.json();
                        return data.name;
                    });
                    const starshipRequests = person.starships.map(async (starshipUrl) => {
                        const response = await fetch(starshipUrl);
                        const data = await response.json();
                        return data.name;
                    });

                    const vehiclesData = await Promise.all(vehicleRequests);
                    const starshipsData = await Promise.all(starshipRequests);

                    setVehicles(vehiclesData);
                    setStarships(starshipsData);
                };

                await Promise.all([fetchFilms(), fetchVehiclesAndStarships()]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [person]);

    const handleModalOpen = () => {
        setModalLoading(true);
        document.getElementById(person.url).showModal();
        setTimeout(() => {
            setModalLoading(false);
        }, 1000); 
    };

    return (
        <div className="collapse bg-slate-950">
            {loading ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-dots loading-sm"></span>
                </div>
            ) : (
                <>
                    <input type="checkbox" /> 
                    <div className="text-xl font-medium flex flex-col items-center justify-center pb-10 px-4">
                        <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
                        <p className="text-center text-sm"><span className="font-semibold"><FontAwesomeIcon icon={faRuler} className="mr-2" />Height:</span> {person.height}</p>
                        <p className="text-center text-sm"><span className="font-semibold"><FontAwesomeIcon icon={faBalanceScale} className="mr-2" />Mass:</span> {person.mass}</p>
                        <p className="text-center text-sm"><span className="font-semibold"><FontAwesomeIcon icon={faVenusMars} className="mr-2" />Gender:</span> {person.gender}</p>
                    </div>

                    <dialog id={person.url} className="modal">
                        {modalLoading ? (
                            <div className="flex justify-center items-center">
                                <span className="loading loading-dots loading-sm"></span>
                            </div>
                        ) : (
                            <div key={person.url} className="p-4 rounded-lg shadow-md flex flex-col items-center">
                                <p><span className="font-semibold"><FontAwesomeIcon icon={faPalette} className="mr-2" />Hair Color:</span> {person.hair_color}</p>
                                <p><span className="font-semibold"><FontAwesomeIcon icon={faPalette} className="mr-2" />Skin Color:</span> {person.skin_color}</p>
                                <p><span className="font-semibold"><FontAwesomeIcon icon={faEye} className="mr-2" />Eye Color:</span> {person.eye_color}</p>
                                <p><span className="font-semibold"><FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />Birth Year:</span> {person.birth_year}</p>

                                <div>
                                    <div className="mt-4">
                                        <span className="font-semibold"><FontAwesomeIcon icon={faFilm} className="mr-2" />Films:</span>
                                        <ul className="list-disc pl-4">
                                            {films.map((film, index) => (
                                                <li key={index}>{film}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-4">
                                        <span className="font-semibold"><FontAwesomeIcon icon={faCar} className="mr-2" />Vehicles:</span>
                                        <ul className="list-disc pl-4">
                                            {vehicles.map((vehicle, index) => (
                                                <li key={index}>{vehicle}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-4">
                                        <span className="font-semibold"><FontAwesomeIcon icon={faSpaceShuttle} className="mr-2" />Starships:</span>
                                        <ul className="list-disc pl-4">
                                            {starships.map((starship, index) => (
                                                <li key={index}>{starship}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                    <button className="btn" onClick={handleModalOpen}>View more</button>
                </>
            )}
        </div>
    );
};

export default Character;
