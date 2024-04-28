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
    faSpaceShuttle, 
    faGenderless
} from '@fortawesome/free-solid-svg-icons';

export const Character = (props) => {
    const { person } = props;
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null);

    const handleModalOpen = () => {
        const modal = document.getElementById(person.url);
        modal.showModal()
        if (modal) {
            modal.showModal(); 
            setLoading(true); 
            fetchPersonData(); 
        }
    };
    

    const fetchPersonData = async () => {
        try {
            setLoading(true);
            const response = await fetch(person.url);
            const data = await response.json();
    
            const homeworldResponse = await fetch(data.result.properties.homeworld);
            const homeworldData = await homeworldResponse.json();

            setInfo({
                ...data.result.properties,
                homeworld: homeworldData.result.properties.name
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
                <div className="text-xl font-medium flex flex-col items-center justify-center pb-10 px-4 hover:border-orange-500">
                    <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
                </div>
                    
                <dialog id={person.url} className="modal">
                    <div className="modal-box p-4 rounded-lg shadow-md flex flex-col items-center">
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <span className="loading loading-dots loading-sm"></span>
                            </div>
                        ) : (
                            <>
                                {info && (
                                    <>
                                        <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faRuler} className="mr-2" />Height:</span> {info.height}</p>
                                        <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faBalanceScale} className="mr-2" />Mass:</span> {info.mass}</p>
                                        <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faGenderless} className="mr-2" />Gender:</span> {info.gender}</p>



                                        <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faPalette} className="mr-2" />Hair Color:</span> {info.hair_color}</p>
                                        <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faPalette} className="mr-2" />Skin Color:</span> {info.skin_color}</p>
                                        <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faEye} className="mr-2" />Eye Color:</span> {info.eye_color}</p>
                                        <p className="text-gray-900 dark:text-slate-50"><span className="font-semibold text-gray-900 dark:text-slate-50"><FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />Birth Year:</span> {info.birth_year}</p>
                                        <div className="mt-4 text-gray-900 dark:text-slate-50">
                                            <span className="font-semibold"><FontAwesomeIcon icon={faFilm} className="mr-2" />Home:</span>
                                            <ul className="list-disc pl-4">
                                                <li>{info.homeworld}</li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <button className="btn self-end mb-0" onClick={handleModalOpen}>View more</button>
        </div>
    );
    
}

export default Character;
